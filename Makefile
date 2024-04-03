# Default shell
SHELL := /bin/bash

# Default goal
.DEFAULT_GOAL := panic

# Goals
.PHONY: check
check: lint stan audit

.PHONY: audit
audit: ./node_modules ./package-lock.json
	npm audit --audit-level info --include prod --include dev --include peer --include optional

.PHONY: stan
stan: ./node_modules/.bin/tsc
	./node_modules/.bin/tsc --noEmit

.PHONY: lint
lint: ./node_modules/.bin/prettier ./node_modules/.bin/eslint ./node_modules/.bin/stylelint
	./node_modules/.bin/prettier -c .
	./node_modules/.bin/eslint .
	./node_modules/.bin/stylelint ./**/*.{scss,css}

.PHONY: fix
fix: ./node_modules/.bin/prettier ./node_modules/.bin/eslint ./node_modules/.bin/stylelint
	./node_modules/.bin/prettier -w .
	./node_modules/.bin/eslint --fix .
	./node_modules/.bin/stylelint --fix ./**/*.{scss,css}

.PHONY: clean
clean:
	rm -rf ./node_modules
	rm -rf ./package-lock.json
	rm -rf ./dist

.PHONY: update
update:
	npm update --install-links --include prod --include dev --include peer --include optional

.PHONY: assets
assets: ./node_modules/.bin/svgo
	./node_modules/.bin/svgo -f ./assets -r --multipass --eol=lf --indent=2 --final-newline
	./node_modules/.bin/svgo -f ./public -r --multipass --eol=lf --indent=2 --final-newline

.PHONY: serve
serve: ./node_modules/.bin/webpack-cli
	./node_modules/.bin/webpack-cli serve --mode=development --node-env=development

.PHONY: transpile
transpile: ./node_modules/.bin/tsc ./node_modules/.bin/sass
	./node_modules/.bin/tsc
	./node_modules/.bin/sass ./src:./dist

# Deploy / Release
.PHONY: local
local:
	npm install --install-links --include prod --include dev --include peer --include optional
	./node_modules/.bin/webpack-cli build --mode=development --node-env=development

.PHONY: testing
testing: local

.PHONY: development
development: testing

.PHONY: staging
staging:
	npm install --install-links --include prod --include dev --include peer --include optional
	./node_modules/.bin/webpack-cli build --mode=production --node-env=production

.PHONY: production
production: staging

# Dependencies
./node_modules ./package-lock.json ./node_modules/.bin/prettier ./node_modules/.bin/eslint ./node_modules/.bin/tsc ./node_modules/.bin/stylelint ./node_modules/.bin/svgo ./node_modules/.bin/webpack-cli:
	npm install --install-links --include prod --include dev --include peer --include optional
