/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_123456';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 屏蔽验证
  config.security = {
    csrf: {
      enable: false,
    }
  }
  // 允许跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  // 设置启动端口
  const port = 3011
  config.cluster = {
    listen: {
      path: '',
      port,
      hostname: '0.0.0.0'
    }
  }
  console.log('服务器启动在' + port + '端口')
  // 设置请求体大小  
  config.bodyParser = {
    formLimit: '30mb',
    jsonLimit: '30mb',
    textLimit: '30mb'
  }

  // 启用文件上传
  config.multipart = {
    mode: 'file',
    fileSize: '500mb',
    fileExtensions: ['.mp4'], // 增加对 txt 扩展名的文件支持
  };

  return {
    ...config,
    ...userConfig,
  };
};
