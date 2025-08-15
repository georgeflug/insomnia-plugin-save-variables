

## [4.0.10](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v4.0.9...v4.0.10) (2025-08-15)

## [4.0.9](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v4.0.8...v4.0.9) (2025-08-15)

## [4.0.8](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v4.0.7...v4.0.8) (2025-08-15)


### Bug Fixes

* update ResponseContextHook.getBody ([5bc6686](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/5bc66866514b5094ced00fb2d0bebc8d79fb4139))

## [4.0.7](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v4.0.6...v4.0.7) (2023-12-20)

## [4.0.6](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v4.0.5...v4.0.6) (2023-12-20)

## [4.0.5](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v4.0.4...v4.0.5) (2023-09-28)


### Bug Fixes

* downgrade @release-it/conventional-changelog because latest version breaks release-it ([b037667](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/b03766723b83edf13251444e8c5f55b98899eeca))

## [4.0.4](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v4.0.3...v4.0.4) (2023-09-28)

## [4.0.3](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v4.0.2...v4.0.3) (2023-09-20)

## [4.0.2](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v4.0.1...v4.0.2) (2023-02-25)


### Bug Fixes

* rename xml to xpath ([2185493](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/218549361755d2da5c549534d5a45ed766ba439e))

## [4.0.1](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v3.4.0...v4.0.1) (2023-02-25)

# [4.0.0](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v3.3.0...v4.0.0) (2023-02-25)

### Breaking Changes

This introduces new fields that are more granular and flexible than before. When upgrading to 4.0.0, you will need
to click on each "Save Variable" header tag and review the information that the plugin supplies in the Live Preview.
This will explain what to enter in the new fields to migrate the tag to the new version.


### Bug Fixes

* accurate upgrade instructions ([67354c3](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/67354c3ac1fd841a84660c9770ab9815c6999b41))
* disable extractors for static/header sources ([5d46f98](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/5d46f988f1afb2158e3b3b1724ccf2609a30f495))
* extractor args were not visible ([e66faa7](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/e66faa7fe30d66f1090c1b60243919bf2063da8c))


### Features

* add INFO logs for troubleshooting ([442a766](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/442a7662c8e717d091b8fee849b862c11f886d7f))
* add support for JMESPath ([3191219](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/3191219c93ecd77967ca6351d16f8cd563da0267))
* save variables from request body values ([008c853](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/008c85385050b2caeba7faf1bda2bd1715aad7ba))
* save variables from request header values ([7d4e655](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/7d4e6552737ed6de6d95e1e35f7c47d3355b728a))
* save variables from response status codes ([70ff10c](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/70ff10ccefd8c9740911ee302e55ceecdafec1b0))
* use centralized logger ([3bee5f8](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/3bee5f893e0ee2d2e868194d587a83b486b0774e))

# [3.3.0](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v3.2.2...v3.3.0) (2023-01-02)


### Features

* ability to save static values per request ([66e691b](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/66e691bbcdd510e8863383862d9d93f5d74b85fe))
* extract values from xml ([89f34c9](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/89f34c9a73bf254d88be61466145f0689368b3fa))


### Reverts

* refactor: rename type ([6f425c0](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/6f425c0c4c665200d57be8b50968251111e2aefc))

## [3.2.2](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v3.2.1...v3.2.2) (2022-10-25)


### Bug Fixes

* remove comment copied from another file ([e1bbae6](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/e1bbae68570a1675171e1369755f38b1a95f13b6))

## [3.2.1](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v3.2.0...v3.2.1) (2022-10-25)


### Bug Fixes

* fix script not executable on *nix ([85e204f](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/85e204fff23aa27abe09d6b34fa58ff8bbfe722e))
* patch-package causes installation failure ([d457025](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/d4570257ac196b8831093a5e1ec54263f43a6ebd))

# [3.2.0](https://github.com/georgeflug/insomnia-plugin-save-variables/compare/v3.0.5...v3.2.0) (2022-10-22)


### Bug Fixes

* patch-package doesn't need to run every build ([e7fb2b1](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/e7fb2b1596867d5af1e75bd2c918d7e38e35f06c)), closes [#10](https://github.com/georgeflug/insomnia-plugin-save-variables/issues/10)


### Features

* add release tooling ([b2bdcf8](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/b2bdcf831d08e8e71b28c7cab4f85818af96afdc)), closes [#10](https://github.com/georgeflug/insomnia-plugin-save-variables/issues/10)
* automatic dependency upgrades ([2bbe279](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/2bbe27903ab23981e6bde6813eb2650fc5fee037)), closes [#10](https://github.com/georgeflug/insomnia-plugin-save-variables/issues/10)
* automatic pipeline through github actions ([350d39c](https://github.com/georgeflug/insomnia-plugin-save-variables/commit/350d39c6db147a4b358cb590207e6f678bd2fda7)), closes [#10](https://github.com/georgeflug/insomnia-plugin-save-variables/issues/10)