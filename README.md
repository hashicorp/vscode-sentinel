# Sentinel Extension for Visual Studio Code

The HashiCorp Sentinel Extension for Visual Studio Code adds syntax highlighting and other editing features for <a href="https://www.hashicorp.com/sentinel/">Sentinel</a> files.

## Features

- Includes syntax highlighting for `.sentinel` files

## Getting Started

1. Install the extension [from the Marketplace](https://marketplace.visualstudio.com/items?itemName=HashiCorp.sentinel)
1. Start editing Sentinel files!

## Credits

- [Glenn Gillen](https://github.com/glenngillen) - for creating a starting point and inspiration for this extension.

## Changes did by Nagateja2402

1. Implemented the Sentinel: Init Command so that it create a directory structure for sentinel policies with empty files.
2. Implemented snippet completion for
   - func, rule, main, for, any, print, filter
3. Implemented variable hinting when the variables are declared.
4. Implemented error displaying to the user when they save the current sentinel file.
