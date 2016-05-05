/**
 * 登录验证
 * @method require
 * @param  {[type]} 'nightwatch/bin/runner.js' [description]
 * @return {[type]}                            [description]
 */
require('nightwatch/bin/runner.js');
var config = require('../../config/config.js');
var common = require('../../lib/common.js');

module.exports = {
  disabled: false,
  before: function(client) {
    client
      .url(config.host + 'login')
      .waitForElementVisible('body', 1000);
  },
  'part1:表单验证': function(client) {
    client.expect.element('#username').to.be.present;
    client.expect.element('#password').to.be.present;
    client.setValue('#username', '219192109256457467498747679646464646');
    client.setValue('#password', '888999asd4798a7sd98a7s98d7a98sd79879a8sd');
    client.click('.btn-block');
    client.assert.attributeContains("#username", 'class', 'validate-err');
    client.assert.attributeContains("#password", 'class', 'validate-err');
  },
  'part2:测试登录': function(client) {
    common.login(client);
  },
  after: function(client) {
    client.end();
  }
};
