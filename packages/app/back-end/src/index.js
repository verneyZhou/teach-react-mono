// import {getRadom} from './module';


// console.log(getRadom(), '=====1234ddd567===我是后端的代码');



import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import Routers from './controllers/index';
import {controllers} from './utils/decorator';
import {jwtVerify} from './utils/jwt';

const app = new Koa();
const router = new Router();

app.use(bodyParser()); // 解析请求的参数


// cors
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Content-Type', 'application/json;charset=utf-8');
    if(ctx.request.method.toUpperCase() == 'options') {
        ctx.state = 200; // 让options请求快速返回
    } else {
        await next();
    }
});

// jwt鉴权
app.use(jwtVerify([
    '/user/login',
    '/user/register'
]))



controllers.forEach(item => {
    let {path, handler, method, constructor} = item;
    const {prefix} = constructor;

    // console.log('===item: ', path, handler, method, constructor);

    if (prefix) path = `${prefix}${path}`

    router[method](path, handler);
})


app.use(router.routes());






app.listen(3078, () => {
    console.log('=====server is running 3078');
})
