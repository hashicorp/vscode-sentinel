# Development

We are an open source project on GitHub and would enjoy your contributions! Please [open a new issue](https://github.com/hashicorp/vscode-sentinel/issues) before working on a PR that requires significant effort. This will allow us to make sure the work is in line with the project's goals.

### Requirements

- VSCode >= 1.61
- Node >= 16.13.2
- npm >= 8.x

### Getting the code

```
git clone https://github.com/hashicorp/vscode-sentinel
```

### Dependencies

After cloning the repo, run `npm install` to install dependencies.

```
> npm install
```

## Running the Extension

The extension can be run in a development mode via the launch task called `Extension`. This will open a new VS Code window with the extension loaded, and from there you can open any files or folders you want to check against. This extension development window can also be used to run commands or any other feature the extension provides.

> New to VS Code development? You can get started [here](https://code.visualstudio.com/api/get-started/your-first-extension)

## Syntax Grammar Tests

Automated TextMate grammar tests can be written using [vscode-tmgrammar-test](https://github.com/PanAeon/vscode-tmgrammar-test) and live inside `./tests`.

To start the test suite from the command-line run:

```bash
npm test:syntax
```

## Writing TextMate Grammar

The following workflow is recommended to work on Sentinel TextMate grammar:

1. Add or modify grammar in the `sentinel.tmLanguage.json` file inside the `syntaxes` directory.
1. Add a new unit test file or modify existing unit test files inside the test/unit/sentinel directory.
1. Run `npm run test:grammar` until the tests pass
1. Add a new example Sentinel file or modify existing unit test files inside the test/snapshot/sentinel directory.
1. Run `npm run test:snap` until the tests pass. 

> Tip: Running `npm run test:snap -- -u` after modifying the tmGrammar file will give you a quick visual representation of how the tokens are being resolved. This can aid in crafting unit tests.

## Writing Grammar Unit Tests

Unit tests are Sentinel files with `vscode-tmgrammar-test` token lines specifying which TextMate grammar should be resolved.

For example:

> Note: This is shortened to demonstrate, actual syntax will vary

```
hour = 4
; ^^^^^ source.sentinel
;    ^ source.sentinel keyword.operator.symbol.sentinel
;     ^ source.sentinel
;      ^ source.sentinel constant.numeric.number.sentinel
```

## Writing Grammar Snapshot Tests

Snapshot tests comprise of two files: example files and their companion `snap` file.

Snapshot test example files are Sentinel files without any `vscode-tmgrammar-test` token lines. Each example file is exactly how you would see it used in production. This ensures scope, inheritance, and resolution of tokens happen exactly as they would on a user's machine.

The companion `snap` file is named the same as the example file with the `.snap` extension, and is the tmGrammar representation of all resolved tokens. This file is committed alongside the example file. If anything changes with regards to how the tokens are resolved, the snapshot test will fail.

> Note: If modifying an existing snapshot test, run `npm run test:snap -- -u` to update the snapshot file. This will update the snapshot file with the new modified grammar. Be sure to do this after you've tested using `npm run test:grammar` and are sure that the modified grammar is correct, otherwise you may get false positives.
