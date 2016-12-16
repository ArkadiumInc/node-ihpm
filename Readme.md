#ihpm

## Description

InHabit CLI - scaffold new projects and prepare them for publishing

## Installation

To install ihpm from npm, run:

```
$ npm install -g ihpm
```

## Usage
To get a cli help, try running `node ihpm --help`

### `ihpm init <name> [skel]`

Scaffold a new InHabit module with given name and optionally skeleton. Example:
```
# This command creates new Node.js project 'my-interactive' using 'js' skeleton
ihpm init my-interactive

# This creates same, but with Phaser onboard
ihpm init my-interactive phaser
```
Currently available skeletons are: [js](https://github.com/ArkadiumInc/brunch-inhabit-module-js) (Default), [phaser](https://github.com/ArkadiumInc/brunch-inhabit-module-phaser)

### `ihpm pack`
Creates a `package.zip` using your `inhabitcfg.json` file.

## License

Copyright (c) 2016 rand0me

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander).
