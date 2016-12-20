#ihpm
[![npm][npm-badge]][npm-badge-url]
[![Join the chat at https://gitter.im/inhabit-arkadium/ihpm](https://badges.gitter.im/inhabit-arkadium/ihpm.svg)](https://gitter.im/inhabit-arkadium/ihpm?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
## Note
Event though this project still in progress, there many things that you able to do with it.

## Description

InHabit CLI - scaffold new projects and prepare them for publishing. This CLI based on Yeoman generators, this means that you can use yeoman directly for scaffolding as well 

## Installation

To install ihpm from npm, run:

````bash
$ npm install -g ihpm
````

## Usage
To get a cli help, try running `node ihpm --help`

### `ihpm init [type]`

Scaffold a new InHabit module with given name and optionally skeleton. Example:
```
# This command creates new Node.js defaults project based on webpack
ihpm init 
# or
ihpm init classic

# This creates same, but with Phaser and brunch as packaging tool onboard
ihpm init brunch-phaser 

# This creates vanilla javascript template, but with brunch as packaging tool onboard
ihpm init brunch-js 
```

### `ihpm pack`
Creates a `package.zip` using your `inhabitcfg.json` file.

## License

Copyright (c) 2016 rand0me

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander).
