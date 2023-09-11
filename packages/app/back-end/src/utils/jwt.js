
import jwt from 'jsonwebtoken';

const SALT = 'thisismysecretkey';


// token验证
export const verify = async (token) => {
    return new Promise((resolve, reject) => {
        if (token) {
            jwt.verify(token, SALT, (err, decode) => {
                console.log('===err: ', err, decode);
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        resolve({
                            status: false,
                            msg: 'token已过期'
                        })
                    } else {
                        resolve({
                            status: false,
                            msg: 'token验证失败'
                        })
                    }
                    
                } else {
                    resolve({
                        status: true,
                        msg: 'token验证成功'
                    })
                }
            })
        } else {
            resolve({
                status: false,
                msg: 'token不能为空'
            })
        }
    });
}



// 生成token
export const sign = async (user) => {
    return jwt.sign(user, SALT, {expiresIn: 100000}); // 100s
}



// jwt验证
export const jwtVerify = (whiteList) => async (ctx, next) => {
    // 登录的时候，拦截；其他的时候，不拦截
    // arr: /user/login, 说明不需要拦截
    console.log('===ctx: ', ctx.path);
    if (whiteList.includes(ctx.path)) {
        next(ctx)
    }  else { // 其他接口需要token验证
        let token;
        try {
            token = ctx.header.authorization.split(' ')[1];
            console.log('===ctx.header.authorization: ', token);
        } catch(err) {

        }
        // 登录的
        const verifyRes = await verify(token);
        if (verifyRes.status){
            next(ctx);
        } else {
            ctx.body = {
                ...verifyRes,
                code: 401
            }
        }
    }
}