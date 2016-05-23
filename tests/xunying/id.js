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

module.exports = {
  disabled: false,
  before: function(client) {
    client
      .url(config.host + 'rmsearch/idcard')
      .waitForElementVisible('body', 1000);
  },
  '帐号搜索case直接点击搜索': function(client) {
    client.click("#btn-search");
    client.waitForElementPresent('.layui-layer', 1000);
  },
  '帐号搜索case搜索帐号': function(client) {
    client.clearValue('#username');
    client.setValue('#username', "2191921092");
    client.click("#btn-search");
    client.pause(3000);
    client.assert.containsText(".list-wrap ul li:nth-child(1)", '设计');
  },
  '帐号搜索case搜索不存在帐号': function(client) {
    client.clearValue('#username');
    client.setValue('#username', "2191d");
    client.click("#btn-search");
    client.pause(3000);
    client.expect.element('.hold-space').to.be.present;
  },
  after: function(client) {
    client.end();
  }
};
