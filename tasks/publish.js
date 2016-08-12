'use strict';

const test = require('./test');
const log = require('verbalize');
const fs = require('fs');
const path = require('path');
const request = require('request');
const archiver = require('archiver');
const locator = require('../lib/locator');
const config = require('../configuration');
const Readable = require('stream').Readable;

module.exports = function () {
    test().then(publish);
};

function publish() {
    log.writeln();
    log.writeln(log.gray(`  - publish (${config.env})`));

    const output = fs.createWriteStream(getZipPath());
    const archive = archiver('zip');

    archive.on('error', function (err) {
        throw err;
    });
    archive.pipe(output);
    output.on('close', onZipClose.bind(archive));

    archive
        .append(getModuleStream(), {name: getModule()})
        .append(fs.createReadStream(path.resolve(locator.getCfg())), {name: 'inhabitcfg.json'})
        .finalize();
}

function onZipClose() {
    log.writeln("\n" + log.green(log.bold(this.pointer()) + ' total bytes in ' + log.bold(getZipPath())));

    log.writeln(log.yellow("\nPublishing App To: " + log.bold(config.endpoint)));

    const form = request.post(config.endpoint, onRequestDone).form();
    form.append('UploadedImage', fs.createReadStream(getZipPath()), {filename: path.basename(getZipPath())});
    form.append('appname', getModuleName());
}

function onRequestDone(err, res, body) {
    log.writeln();
    if (err) {
        throw err;
    }
    if (res.statusCode === 200 || res.statusCode === 201) {
        log.writeln(log.green('Published application: ' + log.bold(getModuleName())));
    } else {
        log.writeln(log.red('Error: ' + log.bold(res.statusCode)));
        log.writeln(log.gray(body));
    }
}

function getZipPath() {
    return path.resolve(process.cwd(), 'package.zip');
}

function getModule() {
    return require(path.resolve(locator.getCfg())).main;
}

function getModuleName() {
    return path.basename(getModule(), '.js');
}

function getModuleStream() {
    if (config.debug) {
        return fs.createReadStream(path.resolve(getModule()));
    } else {
        const outputStream = new Readable();

        setImmediate(function () {
            const UglifyJS = require('uglify-js');
            const code = UglifyJS.minify(getModule()).code;
            outputStream.push(code);
            outputStream.push(null);
        });

        return outputStream;
    }
}