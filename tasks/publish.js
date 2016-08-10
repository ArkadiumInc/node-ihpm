'use strict';

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
        .append(fs.createReadStream(path.resolve(getModule())), { name: getModule() })
        .append(fs.createReadStream(path.resolve(locator.getCfg())), { name: 'inhabitcfg.json' })
        .finalize();
};

function onZipClose() {
    log.writeln("\n" + log.green(log.bold(this.pointer()) + ' total bytes in ' + log.bold(getZipPath())));

    var uploadUrl = getUploadUrl();
    log.writeln("\nSelected upload Url:" + log.bold(uploadUrl));

    var form = request.post(uploadUrl, onRequestDone).form();
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

function getUploadUrl(){
    var urlLive = 'http://inhabit-apps-service.azurewebsites.net/apps/upload';
    var urlDev = 'http://inhabit-apps-service-dev.azurewebsites.net/apps/upload';

    var appUploadTarget = process.env.AppUploadTarget;

    if (appUploadTarget){
        if (appUploadTarget.toUpperCase() == "DEV"){
            return urlDev;
        }
        if (appUploadTarget.toUpperCase() == "LIVE"){
            return urlLive;
        }
        throw 'Invalid environment variable AppUploadTarget. Possible values are: "dev" or "live".';
    }
    return urlLive;
}
