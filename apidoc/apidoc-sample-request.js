'use strict';

const fs = require('fs');
const path = require('path');
const constants = require('../config/constants.json');
const sampleRequest = require('./apidoc-sample-request.json');

const basePath = path.dirname(path.dirname(__filename));
const docFilePath = path.join(basePath, './public/doc/index.html');

function getKeyAndValues(obj, p) {
    let result = {};
    for (let key in obj) {
        let keys = [key];
        if (p) {
            keys = p.slice();
            keys.push(key);
        }

        if (obj[key] instanceof Object) {
            result = Object.assign(result, getKeyAndValues(obj[key], keys));
        } else {
            result[keys.join('.')] = obj[key]
        }
    }
    return result;
}

const tmpConstant = getKeyAndValues(constants);
const constantCommands = [];
const resultCodeCommands = [];
for (let key in tmpConstant) {
    let k = null;
    let v = null;
    if (key.startsWith('resultCode.')) {
        k = key.substring(11);
        v = tmpConstant[key];
        resultCodeCommands.push(`$('#api-result-code>.keys').append('<li>${k}</li>');`);
        resultCodeCommands.push(`$('#api-result-code>.values').append('<li>${v}</li>');`);
    } else if (key.endsWith('.val')) {
        k = key.substring(0, key.length - 4);
        v = tmpConstant[key];
        constantCommands.push(`$('#api-constants>.keys').append('<li>${k}</li>');`);
        constantCommands.push(`$('#api-constants>.values').append('<li>${v}</li>');`);
    }
}

const sampleRequestCommands = [];
for (let group in sampleRequest) {
    for (let api in sampleRequest[group]) {
        for (let key in sampleRequest[group][api]) {
            const val = sampleRequest[group][api][key];
            sampleRequestCommands.push(`$('#api-${group}-${api} input[placeholder="${key}"]').val('${val}');`);
        }
    }
}

const addition = `
<script>
function prependConstantDoc() {
    const c = $('#scrollingNav>.sidenav');
    const e1 = c.find('li.nav-header:first').clone();
    const e2 = c.find('li.nav-header:first').clone();
    e1.find('a').html('Result Code');
    e1.find('a').attr('href', '#api-result-code');
    e2.find('a').html('Constants');
    e2.find('a').attr('href', '#api-constants');
    c.prepend(e1);
    c.prepend(e2);
    $('div#sections').prepend(\`
        <section id="api-result-code">
            <h1>Result Code</h1>
            <ul class="pull-left list-unstyled keys" style="padding-right:20px"></ul>
            <ul class="pull-left list-unstyled values"></ul>
            <div class="clearfix"></div>
        </section>
    \`);
    $('div#sections').prepend(\`
        <section id="api-constants">
            <h1>Constants</h1>
            <ul class="pull-left list-unstyled keys" style="padding-right:20px"></ul>
            <ul class="pull-left list-unstyled values"></ul>
            <div class="clearfix"></div>
        </section>
    \`);
    ` + constantCommands.join('') + `
    ` + resultCodeCommands.join('') + `
}
function initSampleRequest(){
    ` + sampleRequestCommands.join('') + `
}
function verifyEnv(){
    if(typeof($) == 'function' && $('div#sections>section').length>0){
        prependConstantDoc();
        initSampleRequest();
    } else {
        setTimeout(verifyEnv, 100);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    verifyEnv();
});
</script>
`;

fs.appendFileSync(docFilePath, addition);