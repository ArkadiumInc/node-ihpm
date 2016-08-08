const test = require('./test');
const log = require('verbalize');
const fs = require('fs');
const path = require('path');
const request = require('request');
const archiver = require('archiver');
const locator = require('../lib/locator');

module.exports = function publish() {
    test();

    log.writeln();
    log.writeln(log.gray('  - publish'));

    const output = fs.createWriteStream(getZipPath());
    const archive = archiver('zip');
    const module  = getModule();

    archive.on('error', function(err) { throw err; });
    archive.pipe(output);
    output.on('close', onZipClose.bind(archive));

    archive
        .append(fs.createReadStream(path.resolve(module)), { name: path.basename(module) })
        .finalize();
};

function onZipClose() {
    log.writeln("\n" + log.green(log.bold(this.pointer()) + ' total bytes in ' + log.bold(getZipPath())));

    var form = request.post('http://inhabit-apps-service.azurewebsites.net/apps/upload', onRequestDone).form();
    form.append('UploadedImage', fs.createReadStream(getZipPath()), {filename: path.basename(getZipPath())});
    form.append('appname', getModuleName());
}

function onRequestDone(err, res, body) {
    log.writeln();
    if (err) {
        throw err;
    }
    if (res.statusCode === 200) {
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