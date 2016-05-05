/**
 * [require description]
 * @method require
 * @param  {[type]} '../config/config.js' [description]
 * @return {[type]}                       [description]
 */
var config = require('../config/config.js');
var common = {};
common.login = function(client) {
  client
    .url(config.host + 'login')
    .waitForElementVisible('body', 1000);
  client.expect.element('#username').to.be.present;
  client.expect.element('#password').to.be.present;
  client.clearValue('#username');
  client.clearValue('#password');
  client.setValue('#username', '2191921092');
  client.setValue('#password', '888999');
  client.click('.btn-block');
  client.pause(3000);
  client.assert.urlEquals(config.host + "space/");
}

module.exports = common;
