/**
 * 登录验证
 * @method require
 * @param  {[type]} 'nightwatch/bin/runner.js' [description]
 * @return {[type]}                            [description]
 */
require('nightwatch/bin/runner.js');
var config = require('../../config/config.js');
var common = require('../../lib/common.js');
var tools = require('../../lib/tools.js');
var faker = require("faker/locale/zh_CN");

module.exports = {
    disabled: false,
    before: function(client) {
        client
            .url(config.host + 'news')
            .waitForElementVisible('body', 1000)
            .pause(1000);
        client.maximizeWindow().pause(1000);

    },
    '首页是否正常打开': function(client) {
        client.expect.element('#news-head').to.be.present;
        client.assert.attributeContains("#news-head-div-1 div a:nth-child(1)", "style", "background-color");
    },
    '人在职场是否正常打开': function(client) {
        client
            .url(config.host + 'news/xinwen')
            .waitForElementVisible('body', 1000)
            .pause(1000);
        client.expect.element('#news-head').to.be.present;
        client.assert.attributeContains("#news-head-div-1 div a:nth-child(2)", "style", "background-color");
    },
    '人在商务是否正常打开': function(client) {
        client
            .url(config.host + 'news/zixun')
            .waitForElementVisible('body', 1000)
            .pause(1000);
        client.expect.element('#news-head').to.be.present;
        client.assert.attributeContains("#news-head-div-1 div a:nth-child(3)", "style", "background-color");
    },
    '人在英田是否正常打开': function(client) {
        client
            .url(config.host + 'news/hezuo')
            .waitForElementVisible('body', 1000)
            .pause(1000);
        client.expect.element('#news-head').to.be.present;
        client.assert.attributeContains("#news-head-div-1 div a:nth-child(4)", "style", "background-color");
    },
    '立方观点是否正常打开': function(client) {
        client
            .url(config.host + 'news/guandian')
            .waitForElementVisible('body', 1000)
            .pause(1000);
        client.expect.element('#news-head').to.be.present;
        client.assert.attributeContains("#news-head-div-1 div a:nth-child(5)", "style", "background-color");
        //打开正文页
        client.expect.element('.news-body-left div:nth-child(2) a').to.be.present;
        client.click(".news-body-left div:nth-child(2) a").pause(2000);
        client.window_handles(function(result) {
            var handle = result.value[1];
            client.switchWindow(handle);
        });
        client.expect.element('#news-head').to.be.present;
    },
    after: function(client) {
        client.end();
    }
};
