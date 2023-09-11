
import {sign} from '../utils/jwt';


class UserServices {
  // 验证用户
  async validate({username, password}) {
    if (username && password) {
        if (username === 'test') {
            if (password === '123456') {
                // 生成token
                const token = await sign({username});
                console.log('===token: ', token);
                return {
                    code: 200,
                    msg: '登录成功',
                    data: {
                        username,
                        token
                    }
                }
            } else {
                return {
                    code: 200,
                    msg: '密码错误',
                    data: void 0
                }
            }
        } else {
            return {
                code: 200,
                msg: '账号错误',
                data: void 0
            }
        }
    }
    return {
        code: 200,
        msg: '用户名或密码不能为空',
        data: void 0
    }
  }
}


export default UserServices;