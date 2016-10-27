## 1.0.2 (October 27, 2016)
### Minor changes
- Added yarn lock file ([c92892f](https://github.com/olegman/redux-actions-helpers/commit/c92892fb1f4d33f983d56bea8b3fa08eb32eed99))
### Bugfixes
- Computed property of object must be stirng, number or any ([b308916](https://github.com/olegman/redux-actions-helpers/commit/b3089165696bc2e80c22ae5decfedfe4ea451c55))

## 1.0.1 (October 3, 2016)
### Bugfixes
- Remove typings from postinstall ([657ee3c](https://github.com/olegman/redux-actions-helpers/commit/657ee3cbbb53f8ad807c90752a71c3f354450eac))

## 1.0.0 (September 29, 2016)
### Breaking changes
- Second argument of handleActions is now accepts options object instead of initialState (defaultState), so you need to pass initialState in that object, like this { initialState } this was affected by [adding warning for unknown action](https://github.com/olegman/redux-actions-helpers/issues/12)

### Major changes
- Added support for multiple actions in one handler, now you can combine actions by + operator, like so: [action + secondAction]: handlerFunction see details in [corresponding issue](https://github.com/olegman/redux-actions-helpers/issues/6) ([#8](https://github.com/olegman/redux-actions-helpers/pull/8))
- Complete rewrite to TypeScript. Now it's easier to integrate in TypeScript projects and can be helpful with IDE suggestions, because we have d.ts files ([f620fcf](https://github.com/olegman/redux-actions-helpers/commit/f620fcfaf266d77a785e652a3718863ad7b7c7b4))
- Added warning for unknown action ([69f82ba](https://github.com/olegman/redux-actions-helpers/commit/69f82ba64354cef4feaa83bc93e7fe3fd16b7345)) 
- Added warning when creating params with type property ([104565d](https://github.com/olegman/redux-actions-helpers/commit/104565dce0380ee6d399103bff8979692640ffab))

## 0.0.3 (September 27, 2016)
- Added error to avoid duplicate actions ([3d416cb](https://github.com/olegman/redux-actions-helpers/commit/3d416cbbca3d2a4231aa29edca332b3b92c425fa))

## 0.0.1 (September 26, 2016)
- Happy birthday redux-actions-helpers, first release yay! 🎂 🍻 ([61ea49c](https://github.com/olegman/redux-actions-helpers/commit/61ea49cfb08636aee6cad2c56d0b62d7dc3f799e))
