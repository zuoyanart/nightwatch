var tools = {};

tools.randomChar = function(len, chartype) { //获取l位随机数
    var en = "0123456789qwertyioplkjhgfsazxcvbnm";
    var special = '~!@#$%^&*()_+{}[]:<>,.?';
    var cn = "中国广电获得基础电信业务经营许可证其可经营互联联网国内数据传送业务国内通信设施服务业务工信部表示给中国广电颁发上述许可证是为了推进三网融合工作三网融合是指电信网广播电视网和互联网相互融合渗透其概念早在年就提出年三网融合试点城市和方案公布正式进入推进阶段通州区商务型公寓暂停向以下家庭出售已拥有1套及以上住房的本市户籍单身人士及非本市户籍居民家庭已拥有2套及以上住房的本市户籍居民家庭无法提供在本市连续年以上缴纳社会保险和个人所得税缴纳证明的非本市户籍居民家庭";
    var x = en + cn;
    switch(chartype) {
      case "encn":
       x =  en + cn;
       break;
      case "en":
        x = en;
        break;
      case "cn":
        x = cn;
        break;
      case "sp":
        x = special;
        break;
      case "ensp":
        x = en + special;
        break;
    }
    var tmp = "";
    for (var i = 0; i < len; i++) {
      tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
  }
  /**
   * 获取字符串长度，区分中英文
   * @param str
   * @returns {Number}
   */
tools.getCharLen = function(str) {
    return str.replace(/[^\x00-\xff]/g, "rr").length;
  }
  /**
   * 截取字符串
   * @param s
   * @param l   长度
   * @param st   补充的结尾字符
   * @returns {*}
   */
tools.subStr = function(s, l, st) {
  var T = false;
  if (tools.getCharLen(s) > l) {
    st = st ? st : '';
    l -= tools.getCharLen(st);
    var S = escape(s);
    var M = S.length;
    var r = '';
    var C = 0;
    for (var i = 0; i < M; i++) {
      if (C < l) {
        var t = S.charAt(i);
        if (t == '%') {
          t = S.charAt(i + 1);
          if (t == 'u') {
            r += S.substring(i, i + 6);
            C += 2;
            i += 5;
          } else {
            r += S.substring(i, i + 3);
            C++;
            i += 2;
          }
        } else {
          r += t;
          C++;
        }
      } else {
        T = true;
        break;
      }
    }
  }
  return T ? unescape(r) + st : s;
}

tools.time = {};
/**
 * 计算时间差，返回秒数
 * @param time1
 * @param time2
 * @returns {number}
 */
tools.time.subTime = function(time1, time2) {
    var t1 = new Date(time1),
      t2;
    if (time2 == undefined) {
      t2 = new Date(); //当前时间
    } else {
      t2 = new Date(time2);
    }
    return (t2.getTime() - t1.getTime()) / 1000; //时间差的秒数
  }
  /**
   * 从ObjectId中获取时间
   * 生成格式:2013-12-14 10:58:35
   * @param ObjectId
   * @returns {string}
   */
tools.time.getObjectIdTime = function(ObjectId) {
    var time = parseInt(ObjectId.substring(0, 8), 16);
    var now = new Date(time * 1000);
    return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  }
  /**
   * 格式化时间
   * @param format
   * @returns {string}
   */
tools.time.formatTime = function(format) {
  var format = typeof format === 'undefined' ? false : format.toLowerCase(),
    now = new Date(),
    time = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  if (format === 'y-m-d h:m:s') {
    time += ' ' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  }
  return time;
};

module.exports = tools;
