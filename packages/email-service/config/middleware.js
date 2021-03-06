const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const { Logger } = require('highoutput-utilities');
const Server = require('./server');

const logger = new Logger([]);

module.exports = [
  koaLogger(),
  koaBody({ multipart: true }),
  async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (e) {
      logger.error(e);
    }
  },

  async function validRequest(ctx, next) {
    const { key } = ctx.request.headers;
    if (!key || key !== Server.secret) {
      ctx.status = 400;
    }

    await next();
  },
];
