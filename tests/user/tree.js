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
            .url(config.host + 'user/renmai?id=544e007daeec3f2911000001&nid=1')
            .waitForElementVisible('body', 1000)
            .pause(3000);
    },
    '浏览人脉树': function(client) {
        client.expect.element('#tag').to.be.present;
        client.expect.element('.subitem').to.be.present;
        client.expect.element('.addperson').to.be.present;
        client.expect.element('.layer1').to.be.present; //元素数量是否足够

        var testTree = function(i) {//验证个数以及翻页
          client.click(".layer"+i+":nth-last-child(1) > div");
            var nextLayer = i + 1;
            client.getAttribute(".layer" + i + ":nth-last-child(1) img", "src", function(imgResult) {//验证头像和需求的头像是否联动
              setTimeout(function() {
                client.assert.attributeContains(".slider-top img", 'src', imgResult.value);
              },3000);
            });
            client.getText(".layer" + i + ":nth-last-child(1) > div", function(result) {
                client.pause(3000);
                client.expect.element('.layer' + nextLayer).to.be.present; //第二等级
                var count = parseInt(result.value);
                var limit = count > 18 ? 18 : count;
                client.expect.element('.layer' + nextLayer + ':nth-last-child(' + limit + ')').to.be.present; //元素数量是否足够
                if (count > 18) { //如果存在翻页，则验证翻页
                    client.expect.element(".tline" + nextLayer).to.be.present;
                    client.click(".tline" + nextLayer + "> a:nth-child(4)"); //点击末页
                    client.pause(3000);
                    client.expect.element('.layer' + nextLayer + ':nth-last-child(' + (count % 18) + ')').to.be.present; //元素数量是否足够
                }
            });
        };
        testTree(1);//验证第二等级
        testTree(2);//验证第3等级
        testTree(3);//验证第4等级
        testTree(4);//验证第5等级
        testTree(5);//验证第6等级

        client.click(".layer6:nth-last-child(1) > div");
        client.pause(500);
        client.expect.element('.layui-layer').to.be.present; //第6等级点击无效
    },
    '检索人脉树': function(client) {
        client.clearValue("#tag");
        client.click(".btn-renmai-search");
        client.pause(500);
        client.expect.element('.layui-layer').to.be.present; // 标签不填写，禁止检索
        //只检索标签
        client.setValue("#tag","设计师##");
        client.click(".btn-renmai-search");
        client.pause(2000);
        client.expect.element('.hold-space').to.be.present; // 没有匹配项，应该出现占位符

        //只检索标签
        client.clearValue("#tag");
        client.setValue("#tag","设计");
        client.click(".btn-renmai-search");
        client.pause(2000);
        client.expect.element('.layer1').to.be.present;

        client.click(".layer1:nth-last-child(1) > div");
        client.pause(2000);
        client.expect.element('.layer2').to.be.present;

        //添加附加条件
        client.clearValue("#tag");
        client.setValue("#tag","设计");
        client.click(".subchoose");

        client.click("#area");
        client.pause(500);
        client.expect.element(".area-list").to.be.visible;
        // client.click(".area-list li:nth-child(1)");
        // client.pause(2000);
        // client.click(".area-list li:nth-child(1)");//北京-东城

        client.click('#age1p', function() {
          client.expect.element("#age1p .select-list").to.be.visible;
          client.click("#age1p li:nth-child(2)");//21岁
        });
        client.click('#age2p', function() {
          client.expect.element("#age2p .select-list").to.be.visible;
          client.click("#age2p li:nth-last-child(2)");//59岁
        });
        client.click('#sexp', function() {
          client.expect.element("#sexp .select-list").to.be.visible;
          client.click("#sexp li:nth-child(2)");//男
        });
        client.click(".suredata");
        //todo 添加附加条件
        client.click(".btn-renmai-search");
        client.pause(2000);
        client.expect.element('.layer1').to.be.present;
        client.click(".icon-reply");
        client.pause(3000);
    },
    after: function(client) {
        client.end();
    }
};
