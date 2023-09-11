


/**
 * 控制器装饰器
 * path: 路径
 * method: 请求方式
 * handler: 处理函数
 */

// 在运行之前，把这些函数，收集起来。
export const controllers = [];



export const RequestMethod = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}

export function Controller(prefix = '') {
    return function(target) {
        target.prefix = prefix;
    }
}


export function RequestMapping(method = '', url = '') {
    // target是类本身，name是方法名，descriptor是方法描述符
    return function(target, name, descriptor) {
        let path = url || `/${name}`;
        const item =  {
            path,
            method,
            handler: target[name],
            constructor: target.constructor
        }
        controllers.push(item);
    }
}