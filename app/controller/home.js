'use strict';

const { Controller } = require('egg');
const {
  insertOne,
  findOne,
  findMany,
  deleteOne,
  updateOne,
  uploadFile,
  executeSql
} = require('../models/common.js')
// 文件系统
const path = require('path');
const fs = require('fs');

class HomeController extends Controller {
  async index () {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  // 插入一条数据
  async insertOne (request) {
    const { ctx } = this;
    const data = ctx.request.body
    // console.log('请求数据：', data)
    try {
      let rest = await insertOne(data.gether, data.data)
      console.log('插入成功')
      ctx.body = {
        status: 200,
        data: rest,
        message: '插入成功！'
      }
    } catch (error) {
      ctx.body = {
        status: 500,
        data: error,
        message: '插入失败！'
      }
    }
  }

  // 查询一条数据
  async findOne (request) {
    const { ctx } = this;
    const data = ctx.request.body
    console.log('请求数据：', data)
    try {
      let rest = await findOne(data.gether, data.data)
      // console.log('查询信息成功：', rest)
      console.log('查询信息成功')
      ctx.body = {
        status: 200,
        data: rest,
        message: "获取信息成功！"
      }
    } catch (error) {
      ctx.body = {
        status: 500,
        data: error,
        message: '获取信息失败！'
      }
    }
  }

  // 查询多条数据
  async findMany (request) {
    const { ctx } = this;
    const data = ctx.request.body
    console.log('请求数据：', data)

    try {
      let rest = await findMany(data.gether, data.data)
      console.log('查询列表成功')
      ctx.body = {
        status: 200,
        data: rest,
        message: '获取列表成功！'
      }
    } catch (error) {
      console.log('获取列表失败: ', error)
      ctx.body = {
        status: 500,
        data: error,
        message: '获取列表失败！'
      }
    }
  }

  // 删除一条数据
  async deleteOne (request) {
    const { ctx } = this;
    const data = ctx.request.body

    console.log('请求数据：', data)

    try {
      let rest = await deleteOne(data.gether, data.data)
      ctx.body = {
        status: 200,
        message: '删除成功!'
      }
    } catch (error) {
      ctx.body = {
        status: 500,
        data: error,
        message: '删除失败！'
      }
    }
  }

  // 更新一条数据
  async updateOne (request) {
    const { ctx } = this;
    const data = ctx.request.body

    console.log('请求数据：', data)

    try {
      let rest = await updateOne(data.gether, data.data)
      ctx.body = {
        status: 200,
        message: '更新成功！'
      }
    } catch (error) {
      ctx.body = {
        status: 500,
        data: error,
        message: '更新表失败！'
      }
    }
  }

  // 更新一条数据
  async uploadFile (request) {
    const { ctx } = this;
    // console.log('ctx.request');
    // console.log(ctx.request.files);

    const file = ctx.request.files[0];
    const fileinfo = fs.readFileSync(file.filepath);
    const name = `files_${new Date().getTime()}_${file.filename}`;
    const target = path.join(this.config.baseDir, `app/public/upload/${name}`);
    try {
      await fs.writeFileSync(target, fileinfo);
    } catch (error) {
      throw error;
    } finally {
      await fs.unlink(file.filepath, err => {
        if (err) {
          throw err;
        }
        console.log('删除缓存文件:' + file.filepath + '成功！');
      });
    }
    let pathId = target.slice(target.indexOf('public\\upload'));
    let http = 'http://127.0.0.1:3011/';  // 文件访问地址
    ctx.body = { status: 200, message: '上传成功!', data: http + pathId, file, newFileName: name };
  }

  // 执行sql
  async executeSql (request) {
    const { ctx } = this;
    const data = ctx.request.body

    console.log('请求数据：', data)

    try {
      let rest = await executeSql(data.gether, data.data)
      ctx.body = {
        status: 200,
        data: rest,
        message: '执行成功！'
      }
    } catch (error) {
      ctx.body = {
        status: 500,
        data: error,
        message: '执行失败！'
      }
    }
  }
}

module.exports = HomeController;
