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
      .url(config.host + 'reg')
      .waitForElementVisible('body', 1000);
  },
  '帐号重复验证': function(client) {
    client.expect.element('#account').to.be.present;
    client.clearValue('#account');
    client.setValue('#account', "2191921092");
    client.click('#nickname'); //触发鼠标离开事件
    client.pause(1000);
    client.assert.attributeContains("#account", 'class', 'validate-err');
  },
  '注册': function(client) {
    var option = {
      nickname: tools.randomChar(5),
      account: tools.randomChar(6, 'en'),
      password: tools.randomChar(10, 'ensp'),
      question: "我母亲的名字？",
      answer: tools.randomChar(8, 'encn'),
      sex: "男",
      birthday: '2016-05-09',
      area: '北京 - 东城',
      company: tools.randomChar(10),
      job: tools.randomChar(6),
      college: tools.randomChar(10),
      education: "高中"
    };
    // client.clearValue('#nickname'); //昵称
    client.clearValue('#account'); //帐号
    // client.clearValue('#password'); //密码
    // client.clearValue('#question'); //找回密码
    // client.clearValue('#answer'); //密码答案
    // client.clearValue('#sex'); //性别
    // client.clearValue('#birthday'); //出生日期
    // client.click("#company");//失去出生日期的焦点
    // client.clearValue('#area'); //地区
    // client.pause(100);
    // client.click("#company");//失去出生日期的焦点
    // client.clearValue('#company'); //公司单位
    // client.clearValue('#job'); //职务
    // client.clearValue('#college'); //院校
    // client.clearValue('#education'); //学历
    // client.click("#company");//失去出生日期的焦点

    client.setValue('#account', option.account); //帐号
    client.setValue('#nickname', option.nickname); //昵称
    client.setValue('#password', option.password); //密码
    client.pause(2000);//等待帐号验证通过
    client.click('#questionp', function() { //找回密码
      client.expect.element("#questionp .select-list").to.be.visible;
      client.click("#questionp li:nth-child(2)");// 我母亲的名字？
    });
    client.setValue('#answer', option.answer); //密码答案
    client.click('#sexp', function() { //找回密码
      client.expect.element("#sexp .select-list").to.be.visible;
      client.click("#sexp li:nth-child(2)");//男
    });
    client.setValue('#birthday', option.birthday); //出生日期
    client.click("#company");//失去出生日期的焦点
    client.click("#area", function() {
      client.expect.element(".area-list").to.be.visible;
      client.click(".area-list li:nth-child(1)");
      client.pause(5000);
      client.click(".area-list li:nth-child(1)");
    });
    client.click("#company");//失去出生日期的焦点
    client.setValue('#company', option.company); //公司单位
    client.setValue('#job', option.job); //职务
    client.setValue('#college', option.college); //院校
    client.click('#educationp', function() { //找回密码
      client.expect.element("#educationp .select-list").to.be.visible;
      client.click("#educationp li:nth-child(2)");//高中
    });
    client.elements('css selector', ".mcren-tag .icon-remove", function(results) { //添加标签
      console.log("标签数量:" + results.value.length);
      for (var i = 0; i < 8; i++) {
        client.clearValue('.mcren-tag input[type=text]');
        var s = tools.randomChar(5, "encn");
        client.setValue('.mcren-tag input', [s, client.Keys.ENTER]); //输入数据并回车
        client.pause(100);
      }
    });
    client.click('.btn-block');
    client.pause(5000);
    client.click('.btn-lg');
    client.pause(1500);
    client.assert.urlContains(config.host + "space");
    common.login(client, {// 验证能否登录成功
      username: option.account,
      password: option.password
    });
    //验证注册的属性
    client.assert.value("#area", option.area);
    client.assert.value("#company", option.company);
    client.assert.value("#duty", option.job);
    client.assert.value("#school", option.college);
    client.expect.element('.mcren-tag input[type=text]').to.not.be.present;//验证tag,不存在输入框
  },
  after: function(client) {
    client.end();
  }
};
