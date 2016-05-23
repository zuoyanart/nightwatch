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
      .url(config.host + 'rmsearch/nickname')
      .waitForElementVisible('body', 1000);
  },
  '昵称搜索case直接点击搜索': function(client) {
    client.click("#btn-search");
    client.waitForElementPresent('.layui-layer', 1000);
  },
  '昵称搜索case搜索昵称': function(client) {
    client.clearValue('#hync');
    client.setValue('#hync', "土著");
    client.click("#btn-search");
    client.pause(3000);
    client.assert.containsText(".list-wrap ul li:nth-child(1)", '土著');
  },
  '昵称搜索综合搜索': function(client) {
    client.clearValue('#hync');
    client.setValue("#hync", "土著");
    //点击所属行业
    client.click('.suo-shu-hang-ye > span');
    client.click("#industry-item-20+label");//金融业
    client.click("#industry-item-15-2+label");//通信/电信/网络设备
    client.click("#industry-item-25-5+label");//景观/园林/园艺
    client.click("#industry-item-35-2+label");//国内贸易
    client.click("#industry-sure");
    client.pause(1000);
    client.assert.visible(".industry-js-append");//应该是block
    client.click("#industry-item-35-2+label");//取消选中国内贸易
    client.click("#industry-sure");//确定按钮
    client.pause(1000);
    client.expect.element('.industry-js-append').to.have.css('display').which.equals('none');
    // client.expect.element(".industry-js-append").to.not.visible();//应该是隐藏
    //点击诚信等级
    client.click(".cxdj-switch");
    client.assert.visible(".cxdj");//应该是block
    client.click("#grzlp");
    client.click("#grzlp ul>li:nth-child(2)");
    client.click("#rmzlp");
    client.click("#rmzlp ul>li:nth-child(2)");
    client.click("#zhnlp");
    client.click("#zhnlp ul>li:nth-child(2)");
    client.click(".cxdj .btn-qd");
    client.click("#btn-search");
    client.pause(3000);
    client.expect.element('.hold-space').to.be.present;

  },
  after: function(client) {
    client.end();
  }
};
