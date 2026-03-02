require('dotenv').config();

module.exports = {
  appid: process.env.WX_APPID,
  appsecret: process.env.WX_APPSECRET,
  loginUrl: 'https://api.weixin.qq.com/sns/jscode2session'
};