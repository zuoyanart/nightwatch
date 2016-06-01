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
        common.login(client);
        client.maximizeWindow();
        client
            .url(config.host + 'space/person/index')
            .waitForElementVisible('body', 1000)
            .pause(3000);

    },
    '浏览人脉树': function(client) {
        client.expect.element('#tag').to.be.present;
        client.expect.element('.subitem').to.be.present;
        client.expect.element('.addperson').to.be.present;
        client.assert.attributeContains(".group>li:nth-child(1)", 'class', 'choose'); //默认第一个分组选中
        client.expect.element('.group>li:nth-child(7)').to.be.present; //存在7个分组
        client.expect.element('.layer1').to.be.present; //元素数量是否足够
        client.getText(".group>.choose>b", function(result) { //获取第一个分组的总人脉数
            var count = parseInt(result.value);
            var limit = count > 18 ? 18 : count;
            client.expect.element('.layer1:nth-child(' + limit + ')').to.be.present; //元素数量是否足够
            if (count > 18) { //如果存在翻页，则验证翻页
                client.expect.element(".tline1").to.be.present;
                client.click(".tline1 > a:nth-child(4)"); //点击末页
                client.pause(3000);
                client.expect.element('.layer1:nth-last-child(' + (count % 18) + ')').to.be.present; //元素数量是否足够
            }
        });

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
    '点击其他分组': function(client) {
      client.click("#group li:nth-child(2)");
      client.pause(2000);
      client.assert.attributeContains("#group li:nth-child(2)", "class", "choose");
      client.getText(".group>.choose>b", function(result) { //获取第一个分组的总人脉数
          var count = parseInt(result.value);
          var limit = count > 18 ? 18 : count;
          client.expect.element('.layer1:nth-last-child(' + limit + ')').to.be.present; //元素数量是否足够
          if (count > 18) { //如果存在翻页，则验证翻页
              client.expect.element(".tline1").to.be.present;
              client.click(".tline1 > a:nth-child(4)"); //点击末页
              client.pause(3000);
              client.expect.element('.layer1:nth-last-child(' + (count % 18) + ')').to.be.present; //元素数量是否足够
          }
      });
    },
    '修改分组名称': function(client) {
        client.click('#group li:nth-child(1) i');
        client.expect.element(".m-person-grouptip").to.be.visible;
        client.click(".m-person-grouptip li:nth-last-child(1)");
        client.pause(1000);
        client.frame(0).setValue("#groupname", "修改分组")
        client.frame(0).click(".btn-lg");
        client.pause(3000);
        client.window_handles(function(result) {
            var handle = result.value[0];
            client.switchWindow(handle);
        });
        client.assert.containsText("#group li:nth-child(1)", "修改分组");
        //再次修改
        client.click('#group li:nth-child(1) i');
        client.expect.element(".m-person-grouptip").to.be.visible;
        client.click(".m-person-grouptip li:nth-last-child(1)");
        client.pause(1000);
        client.frame(0).setValue("#groupname", "商务合作")
        client.frame(0).click(".btn-lg");
        client.pause(3000);
        client.window_handles(function(result) {
            var handle = result.value[0];
            client.switchWindow(handle);
        });
        client.assert.containsText("#group li:nth-child(1)", "商务合作");
    },
    '添加好友后台部分': function(client) {
        var count = 0;
        var getCount = function(i, cb) {
            client.getText('#group li:nth-child(' + i + ') b', function(results) {
                console.log(results.value);
                count += parseInt(results.value);
                console.log(count);
                if(cb) {
                  cb(count);
                }
            });
        };
        getCount(1);
        getCount(2);
        getCount(3);
        getCount(4);
        getCount(5);
        getCount(6);
        getCount(7, function(count) {
          client.click(".addperson");
          client.pause(3000);
          client.frame(0).assert.containsText("#count", (150 - count));//验证可添加人数是否正确
          client.frame(0).clearValue("#input1");
          client.frame(0).setValue("#input1",  ["8889996", client.Keys.ENTER]);
          client.pause(1000);
          client.frame(0).assert.attributeContains("#person a", "href", "nid=19");//找到人
        });
    },
    '添加好友前台部分': function(client) {
        client
            .url(config.host + 'user?id=547809a3207430d77f000006&nid=19')
            .waitForElementVisible('body', 1000)
            .pause(3000); //打开8889996的个人空间
        client.click("#to-be-primary").pause(2000);
        client.frame(0).setValue("#reason-textarea", "申请成为一级人脉");
        client.frame(0).click("#group-optionsp"); //好友
        client.frame(0).click("#group-optionsp li:nth-child(2)"); //好友
        client.frame(0).click("#sure"); //好友
        client.pause(1000);
        common.login(client, {
            username: '8889996',
            password: '888999'
        });
        client.pause(3000);
        client
            .url(config.host + 'space/notice/index')
            .waitForElementVisible('body', 1000)
            .pause(3000); //打开8889996的后台
        client.assert.attributeContains(".spacenavdt", 'style', 'red'); //通知为红色
        client.click(".head-navmenu div:nth-child(3)");
        client.pause(2000);
        client.assert.containsText(".main ul:nth-child(1)", "申请成为一级人脉");
        client.click(".main ul:nth-child(1) .btn-lg");
        client.pause(3000);
        client.frame(0).click('#choosegroupp', function() { //找回密码
            client.expect.element("#choosegroupp .select-list").to.be.visible;
            client.click("#choosegroupp li:nth-child(3)"); //好友
            client.pause(2000);
            client.click("#form1 .btn-lg");
            client.pause(2000);
        });
        client
            .url(config.host + 'space/person/index')
            .waitForElementVisible('body', 1000)
            .pause(3000); //打开8889996的后台
        client.click("#group");
        client.click("#group li:nth-child(2)");
        client.pause(2000);
        client.expect.element(".neoid1").to.be.present; //好友已经存在
        //删除好友
        client.moveToElement(".neoid1", 10, 10, function() { //鼠标悬停
            client.click("#perop li:nth-child(2)", function() {
                client.click(".layui-layer-btn0", function() {
                      client.pause(2000);
                    client.expect.element(".neoid1 a").to.not.present; //好友已经存在
                });
            });
        });
    },
    after: function(client) {
        client.end();
    }
};
