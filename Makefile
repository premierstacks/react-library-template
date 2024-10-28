# Default shell
SHELL := /bin/bash

# Default goal
.DEFAULT_GOAL := never

# Goals
.PHONY: audit
audit: audit_npm

.PHONY: audit_npm
audit_npm: ./node_modules ./package-lock.json
	npm audit --audit-level info --include prod --include dev --include peer --include optional

.PHONY: check
check: lint stan audit

.PHONY: commit
commit: fix check compress

.PHONY: compress
compress: ./node_modules/.bin/svgo $(shell rg --files --hidden --iglob '!.git' --iglob '*.svg')
	rg --files --hidden --iglob '!.git' --iglob '*.svg' | xargs -n 1 -P 0 ./node_modules/.bin/svgo --multipass --eol=lf --indent=2 --final-newline

.PHONY: clean
clean:
	rm -rf ./node_modules
	rm -rf ./package-lock.json
	rm -rf ./dist

.PHONY: development
development: local

.PHONY: fix
fix: fix_eslint fix_prettier

.PHONY: fix_eslint
fix_eslint: ./node_modules/.bin/eslint ./eslint.config.js
	./node_modules/.bin/eslint --fix .

.PHONY: fix_prettier
fix_prettier: ./node_modules/.bin/prettier ./prettier.config.js
	./node_modules/.bin/prettier -w .

.PHONY: lint
lint: lint_eslint lint_prettier

.PHONY: lint_eslint
lint_eslint: ./node_modules/.bin/eslint ./eslint.config.js
	./node_modules/.bin/eslint .

.PHONY: lint_prettier
lint_prettier: ./node_modules/.bin/prettier ./prettier.config.js
	./node_modules/.bin/prettier -c .

.PHONY: local
local: ./node_modules/.bin/webpack-cli ./webpack.config.js
	rm -rf ./dist
	./node_modules/.bin/webpack-cli build --mode=development --node-env=development

.PHONY: production
production: staging

.PHONY: staging
staging: ./node_modules/.bin/webpack-cli ./webpack.config.js
	rm -rf ./dist
	./node_modules/.bin/webpack-cli build --mode=production --node-env=production

.PHONY: stan
stan: stan_tsc

.PHONY: stan_tsc
stan_tsc: ./node_modules/.bin/tsc ./tsconfig.json
	./node_modules/.bin/tsc --noEmit

.PHONY: serve
serve: start

.PHONY: server
server: start

.PHONY: start
start: ./node_modules/.bin/webpack-cli ./webpack.config.js
	./node_modules/.bin/webpack-cli serve --mode=development --node-env=development

.PHONY: testing
testing: local

# Dependencies
./node_modules ./node_modules/.bin/eslint ./node_modules/.bin/prettier ./node_modules/.bin/webpack-cli ./node_modules/.bin/svgo ./node_modules/.bin/tsc: ./package-lock.json
	npm install --install-links --include prod --include dev --include peer --include optional
	touch ./package-lock.json
	touch ./node_modules
	touch ./node_modules/.bin/*

./package-lock.json: ./package.json
	rm -rf ./node_modules
	rm -rf ./package-lock.json
	npm update --install-links --include prod --include dev --include peer --include optional
	touch ./package-lock.json
