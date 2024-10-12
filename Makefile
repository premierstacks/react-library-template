# Default shell
SHELL := /bin/bash

# Default goal
.DEFAULT_GOAL := never

# Variables
SOURCES = $(shell rg --files --hidden --iglob '!.git')
NODE_ENV ?= production

# Goals
.PHONY: audit
audit: audit_npm

.PHONY: audit_npm
audit_npm: ./node_modules/audit_stamp

./node_modules/audit_stamp: ./node_modules ./package-lock.json
	npm audit --audit-level info --include prod --include dev --include peer --include optional
	touch ./node_modules/audit_stamp

.PHONY: check
check: lint stan audit

.PHONY: commit
commit: tree fix fix fix check compress

.PHONY: compress
compress: ./node_modules/svgo_stamp

./node_modules/svgo_stamp: ./node_modules/.bin/svgo $(shell rg --files --hidden --iglob '!.git' --iglob '*.svg')
	rg --files --hidden --iglob '!.git' --iglob '*.svg' | xargs -n 1 -P 0 ./node_modules/.bin/svgo --multipass --eol=lf --indent=2 --final-newline
	touch ./node_modules/svgo_stamp

.PHONY: clean
clean:
	rm -rf ./node_modules
	rm -rf ./dist
	git clean -Xfd

.PHONY: development
development: NODE_ENV = development
development: ./dist

.PHONY: distclean
distclean: clean
	git clean -xfd

.PHONY: fix
fix: fix_eslint fix_prettier

.PHONY: fix_eslint
fix_eslint: ./node_modules/eslint_fix_stamp

./node_modules/eslint_fix_stamp: ./node_modules/.bin/eslint ./eslint.config.js ${SOURCES}
	./node_modules/.bin/eslint --fix .
	touch ./node_modules/eslint_fix_stamp
	touch ./node_modules/eslint_lint_stamp

.PHONY: fix_prettier
fix_prettier: ./node_modules/prettier_fix_stamp

./node_modules/prettier_fix_stamp: ./node_modules/.bin/prettier ./prettier.config.js ${SOURCES}
	./node_modules/.bin/prettier -w .
	touch ./node_modules/prettier_fix_stamp
	touch ./node_modules/prettier_lint_stamp

.PHONY: lint
lint: lint_eslint lint_prettier

.PHONY: lint_eslint
lint_eslint: ./node_modules/eslint_lint_stamp

./node_modules/eslint_lint_stamp: ./node_modules/.bin/eslint ./eslint.config.js ${SOURCES}
	./node_modules/.bin/eslint .
	touch ./node_modules/eslint_lint_stamp
	touch ./node_modules/eslint_fix_stamp

.PHONY: lint_prettier
lint_prettier: ./node_modules/prettier_lint_stamp

./node_modules/prettier_lint_stamp: ./node_modules/.bin/prettier ./prettier.config.js ${SOURCES}
	./node_modules/.bin/prettier -c .
	touch ./node_modules/prettier_lint_stamp
	touch ./node_modules/prettier_fix_stamp

.PHONY: local
local: NODE_ENV = development
local: ./dist

.PHONY: production
production: NODE_ENV = production
production: ./dist

.PHONY: staging
staging: NODE_ENV = production
staging: ./dist

.PHONY: stan
stan: stan_tsc

.PHONY: stan_tsc
stan_tsc: ./node_modules/stan_tsc_stamp

./node_modules/stan_tsc_stamp: ./node_modules/.bin/tsc ./tsconfig.json ${SOURCES}
	./node_modules/.bin/tsc --noEmit
	touch ./node_modules/stan_tsc_stamp

.PHONY: serve
serve: start

.PHONY: server
server: start

.PHONY: start
start: NODE_ENV = development
start: ./node_modules/.bin/webpack-cli ./webpack.config.js
	./node_modules/.bin/webpack-cli serve --mode=${NODE_ENV} --node-env=${NODE_ENV}

.PHONY: testing
testing: NODE_ENV = development
testing: ./dist

.PHONY: tree
tree: ./README.md
	sed -i '/## Tree/,$$d' README.md
	echo '## Tree' >> README.md
	echo '' >> README.md
	echo 'The following is a breakdown of the folder and file structure within this repository. It provides an overview of how the code is organized and where to find key components.' >> README.md
	echo '' >> README.md
	echo '```bash' >> README.md
	rg --files --hidden --iglob '!.git' | tree --fromfile >> README.md
	echo '```' >> README.md

.PHONY: update
update: update_npm

.PHONY: update_npm
update_npm: ./package.json
	rm -rf ./node_modules
	npm update --install-links --include prod --include dev --include peer --include optional

./dist: ./node_modules/.bin/webpack-cli ./webpack.config.js ${SOURCES}
	rm -rf ./dist
	./node_modules/.bin/webpack-cli build --mode=${NODE_ENV} --node-env=${NODE_ENV}

# Dependencies
./package-lock.json ./node_modules ./node_modules/.bin/eslint ./node_modules/.bin/prettier ./node_modules/.bin/webpack-cli ./node_modules/.bin/svgo ./node_modules/.bin/tsc: ./package.json
	rm -rf ./node_modules
	npm install --install-links --include prod --include dev --include peer --include optional
