/**
 * [require description]
 * @method require
 * @param  {[type]} '../config/config.js' [description]
 * @return {[type]}                       [description]
 */
var config = require('../config/config.js');
var common = {};
common.login = function(client, option) {
  var op = {
    username: '2191921092',
    password: '888999'
  }
  if(option) {
    op = option;
  }
  client
    .url(config.host + 'login')
    .waitForElementVisible('body', 1000);
  client.expect.element('#username').to.be.present;
  client.expect.element('#password').to.be.present;
  client.clearValue('#username');
  client.clearValue('#password');
  client.setValue('#username', op.username);
  client.setValue('#password', op.password);
  client.click('.btn-block');
  client.pause(3000);
  client.assert.urlEquals(config.host + "space/");
}

module.exports = common;
