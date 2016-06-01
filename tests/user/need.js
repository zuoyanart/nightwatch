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
            .url(config.host + 'user?id=544e007daeec3f2911000001&nid=1')
            .waitForElementVisible('body', 1000)
            .pause(3000);
        client.maximizeWindow();
        client
            .url(config.host + 'user/need/index?id=544e007daeec3f2911000001&nid=1')
            .waitForElementVisible('body', 1000)
            .pause(3000);
    },
    '前台need是否正常打开': function(client) {
        client.expect.element('.xiangxi').to.be.present;
    },
    'need未登录发表评论': function(client) {
        client.pause(2000);
        client.expect.element('.need-list ul:nth-child(1) .li-style-2 a').to.be.present
        client.click(".need-list ul:nth-child(1) .li-style-2 a").pause(3000);
        client.window_handles(function(result) {
            var handle = result.value[1];
            client.switchWindow(handle);
        });
        client.clearValue("#postmsg-textarea");
        client.setValue("#postmsg-textarea", tools.randomChar(20));
        client.click("#postmsg").pause(500);
        client.expect.element('.layui-layer').to.be.present; //未登录状态不允许提交
    },
    'need登录发表评论': function(client) {
        common.login(client); //登录
        client
            .url(config.host + 'user?id=544e007daeec3f2911000001&nid=1')
            .waitForElementVisible('body', 1000)
            .pause(3000);
        client.maximizeWindow();
        client
            .url(config.host + 'user/need/index?id=544e007daeec3f2911000001&nid=1')
            .waitForElementVisible('body', 1000)
            .pause(3000);
        client.expect.element('.need-list ul:nth-child(1) .li-style-2 a').to.be.present
        client.click(".need-list ul:nth-child(1) .li-style-2 a").pause(3000);
        client.window_handles(function(result) {
            var handle = result.value[2];
            client.switchWindow(handle);
        });

        client.clearValue("#postmsg-textarea");
        var s = tools.randomChar(50);
        client.setValue("#postmsg-textarea", s);
        client.click("#postmsg").pause(2000);
        client.assert.containsText(".comment-ceil:nth-child(1) li:nth-child(3) ", s); //是否发表成功

        client.clearValue("#postmsg-textarea");
        client.setValue("#postmsg-textarea", tools.randomChar(260));
        client.click("#postmsg").pause(500);
        client.expect.element('.layui-layer').to.be.present; //表单验证
    },
    after: function(client) {
        client.end();
    }
};
