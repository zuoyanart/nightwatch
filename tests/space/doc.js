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
    common.login(client);
    client
      .url(config.host + 'space')
      .waitForElementVisible('body', 1000);
  },
  '行业描述': function(client) {
    client.expect.element('#hangye').to.be.present;
    client.clearValue('#hangye');
    var s = '深圳市规土委针对市民关心的房地产到期后如何续期问题' + tools.randomChar(10);
    client.setValue('#hangye', s);
    client.click('.photo');
    client.pause(500);
    client.getValue('#hangye', function(result) {
      this.assert.equal(result.value, s);
    })
  },
  '提供与需求': function(client) {
    client.isVisible('#rn-textarea', function(result) {
      console.log("visible:" + result.value);
      if (result.value == true) { // 是可见的
        client.expect.element('#rn-textarea').to.be.present;
        client.clearValue('#rn-textarea');
        var s = '深圳市规土委针对市民关心的房地产到期后如何续期问题' + tools.randomChar(10);
        client.setValue('#rn-textarea', s);
        client.click('.photo');
        client.pause(1000);
        client.expect.element(".rn-list > p:nth-child(1)").text.to.equal(s);
      }
    });
  },
  '添加标签': function(client) {
    client.elements('css selector', ".mcren-tag .icon-remove", function(results) {
      // for (var i = 0; i < result.value.length; i++) {
      //   var element = result.value[i];
      //
      //   var selector = '#index-container ul.features li:nth-child(' + (element.ELEMENT ) +') em';
      //   client.verify.cssClassPresent(selector, 'glyphicon');
      // }
      console.log("标签数量:" + results.value.length);
      if (results.value.length < 8) {
        client.clearValue('.mcren-tag input[type=text]');
        var s = tools.randomChar(5);
        client.setValue('.mcren-tag input', [s, client.Keys.ENTER]); //输入数据并回车
        client.pause(1000);
        client.assert.containsText(".mcren-tag  ul", s);
      }
    });
  },
  '删除标签': function(client) {
    client.elements('css selector', ".mcren-tag .icon-remove", function(results) {
      var len = results.value.length;
      console.log("标签数量:" + len);
      if (len > 0) {
        client.getText(".mcren-tag li:nth-last-child(1)", function(doc) {
          console.log("获取到的值为：" + doc.value);
          var v = doc.value;
          client.click(".mcren-tag li:nth-last-child(1)>a>.icon-remove");
          client.pause(1000);
          client.expect.element(".mcren-tag  ul").text.to.not.contain(v);
        });
      }
    });
  },
  after: function(client) {
    client.end();
  }
};
