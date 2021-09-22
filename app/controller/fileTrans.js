'use strict';

// const fs = require('fs');
const fnv = require('fnv-plus');
const Controller = require('egg').Controller;


class FileController extends Controller {
  async prepare() {
    const { ctx } = this;
    ctx.respond = false;
    ctx.res.writeHead(200);
    // console.log(ctx)
    // var wts = fs.createWriteStream('/home/bryandu/桌面/test.tgz')
    ctx.req.on('data', chunk => {
      console.log(chunk.type);
      const hash = chunk.slice(0, 16).toString(),
        data = chunk.slice(16);
      const nhash = fnv.hash(data, 64).hex();
      if (hash === nhash) {
        ctx.res.write('recv');
      } else {
        ctx.res.write('resend');
      }

    });

  }
}

module.exports = FileController;
