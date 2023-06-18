'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/insertOne', controller.home.insertOne);
  router.post('/findOne', controller.home.findOne);
  router.post('/findMany', controller.home.findMany);
  router.post('/deleteOne', controller.home.deleteOne);
  router.post('/updateOne', controller.home.updateOne);
  router.post('/uploadFile', controller.home.uploadFile);
  router.post('/executeSql', controller.home.executeSql);
};

