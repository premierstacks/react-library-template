import { metrics, trace, ValueType, type Histogram } from '@opentelemetry/api';
import { logs } from '@opentelemetry/api-logs';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { CompositePropagator, W3CBaggagePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { BatchLogRecordProcessor, LoggerProvider } from '@opentelemetry/sdk-logs';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ATTR_EXCEPTION_MESSAGE, ATTR_EXCEPTION_STACKTRACE, ATTR_EXCEPTION_TYPE, ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION, ATTR_USER_AGENT_ORIGINAL } from '@opentelemetry/semantic-conventions';
import { ATTR_BROWSER_LANGUAGE, ATTR_DEPLOYMENT_ENVIRONMENT_NAME } from '@opentelemetry/semantic-conventions/incubating';
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

const resource = Resource.default().merge(
  new Resource({
    [ATTR_SERVICE_NAME]: process.env.APP_NAME,
    [ATTR_SERVICE_VERSION]: process.env.APP_VERSION,
    [ATTR_BROWSER_LANGUAGE]: navigator.language,
    [ATTR_USER_AGENT_ORIGINAL]: navigator.userAgent,
    [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: process.env.WEBPACK_MODE,
    'http.origin': location.origin,
    'api.key': process.env.OTLP_API_KEY ?? undefined,
  }),
);

const tracerProvider = new WebTracerProvider({
  resource: resource,
  spanProcessors: [
    new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: location.origin + '/otlp/v1/traces',
      }),
    ),
  ],
});

tracerProvider.register({
  contextManager: new ZoneContextManager(),
  propagator: new CompositePropagator({
    propagators: [new W3CTraceContextPropagator(), new W3CBaggagePropagator()],
  }),
});

trace.setGlobalTracerProvider(tracerProvider);

const meterProvider = new MeterProvider({
  resource: resource,
  readers: [
    new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({
        url: location.origin + '/otlp/v1/metrics',
      }),
    }),
  ],
});

metrics.setGlobalMeterProvider(meterProvider);

const loggerProvider = new LoggerProvider({
  resource: resource,
});

loggerProvider.addLogRecordProcessor(
  new BatchLogRecordProcessor(
    new OTLPLogExporter({
      url: location.origin + '/otlp/v1/logs',
    }),
  ),
);

logs.setGlobalLoggerProvider(loggerProvider);

registerInstrumentations({
  tracerProvider: tracerProvider,
  meterProvider: meterProvider,
  loggerProvider: loggerProvider,
  instrumentations: [getWebAutoInstrumentations()],
});

const meter = metrics.getMeter('web-vitals');

const lcpRecorder = meter.createHistogram('web_vitals.lcp', {
  description: 'Largest Contentful Paint',
  unit: 'ms',
  valueType: ValueType.DOUBLE,
});

const clsRecorder = meter.createGauge('web_vitals.cls', {
  description: 'Cumulative Layout Shift',
  unit: 'score',
  valueType: ValueType.DOUBLE,
});

const ttfbRecorder = meter.createHistogram('web_vitals.ttfb', {
  description: 'Time to First Byte',
  unit: 'ms',
  valueType: ValueType.DOUBLE,
});

const fcpRecorder = meter.createHistogram('web_vitals.fcp', {
  description: 'First Contentful Paint',
  unit: 'ms',
  valueType: ValueType.DOUBLE,
});

const inpRecorder = meter.createHistogram('web_vitals.inp', {
  description: 'Input Performance',
  unit: 'ms',
  valueType: ValueType.DOUBLE,
});

function recordWebVital(recorder: Histogram, metric: Metric) {
  recorder.record(metric.value, {
    id: metric.id,
    delta: metric.delta,
    rating: metric.rating,
    navigation: metric.navigationType,
  });
}

onLCP((metric) => {
  recordWebVital(lcpRecorder, metric);
});

onCLS((metric) => {
  recordWebVital(clsRecorder, metric);
});

onTTFB((metric) => {
  recordWebVital(ttfbRecorder, metric);
});

onFCP((metric) => {
  recordWebVital(fcpRecorder, metric);
});

onINP((metric) => {
  recordWebVital(inpRecorder, metric);
});

window.addEventListener('error', (event: ErrorEvent) => {
  console.error(event);

  logs.getLogger('logs').emit({
    attributes: {
      [ATTR_EXCEPTION_TYPE]: event.error instanceof Error ? event.error.name : undefined,
      [ATTR_EXCEPTION_MESSAGE]: event.message,
      [ATTR_EXCEPTION_STACKTRACE]: event.error instanceof Error ? event.error.stack : undefined,
    },
    severityNumber: 17,
    severityText: 'ERROR',
    timestamp: Date.now() * 1e6,
  });
});
