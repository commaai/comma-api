Version 3.1.1
=============
* add 401 (unauthorized) handler
* revert package name to @commaai/api

Version 3.1.0
=============
* rename package to @comma/api
* create OpenAPI spec for the API
* generate types using openapi-typescript

Version 3.0.1
=============
* fix: disable transformation of ES module syntax
  * see https://babeljs.io/docs/en/babel-preset-env#modules
* ci: check that dist folder is correct

Version 3.0.0
=============
* breaking: rename package to @commaai/api and deprecate from npm
  * install the package using git url instead
* breaking: upgrade to babel 7
  * use browserslist to set target browsers
* breaking: remove annotation type validation code
* breaking: remove leaderboard
* add eslint
