[![NPM](https://nodei.co/npm/eslint-fix-later.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/eslint-fix-later)

![Github Actions](https://github.com/salimkayabasi/eslint-fix-later/actions/workflows/release.yml/badge.svg)

# eslint-fix-later

If your lint rules are giving error, but you don't want to fix them now. There might be an easy way to mark them
ignored.

That may occur once you introduce a new linting rule or adding `eslint` after a while. Aim is disabling errors on file
level instead of globally.

## Usage

Please make sure that you have all `eslint` configuration installed already on your project. In order to ignore the
existing lint errors to be fixed later, please run `eslint-fix-later` with same parameters.

```shell
# to see your eslint errors
node_modules/.bin/eslint . --ext .js,.json,.md
# fix them later
npx eslint-fix-later . --ext .js,.json,.md
# no errors anymore
node_modules/.bin/eslint . --ext .js,.json,.md
```

The main focus is making your CI check happy again. All the errors will be ignored on the file level so each of them can
be fixed one-by-one later.
