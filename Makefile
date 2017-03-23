run:
		./node_modules/.bin/gulp serve

deploy:
		node_modules/.bin/gulp deploy

build:
		node_modules/.bin/gulp build

install:
		yarn || npm install

test:
		npm run test:auto

prefetch:
		node_modules/.bin/gulp content
