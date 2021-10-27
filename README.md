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
# fix them later
npx eslint-fix-later
```

### Advanced Usage

If you have some other parameters while executing `eslint` command, you can also pass them to `eslint-fix-later` as
well. You can also add `eslint-fix-later` to your `package.json`.

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.json,.md",
    "lint:fix": "eslint . --ext .js,.json,.md --fix",
    "lint:fix:later": "npx eslint-fix-later . --ext .js,.json,.md"
  }
}
```
