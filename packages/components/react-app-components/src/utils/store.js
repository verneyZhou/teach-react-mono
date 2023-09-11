
/**
 * 一个存储库
 * 
 * 1. 可以在初始化或其他时候，确定我是要进行本地存储 (localStorage / sessionStorage)，
 *      或者不要进行本地存储。
 * 2. 如果浏览器端的存储，出现了异步问题、高频的线程问题，我都可以解决。
 * 3. 如果本地缓存有问题，我在处理数据时，可以进行降级。
 * 4. 不用自己处理序列化，支持各种数组方法。
 * 
 * -> 我们做一些过度设计，来看看，一个小工具，是怎么样做到尽量极致，并且来丰富简历的。
 * 
 * 由于项目中存在大量本地数据缓存的 case，设计一个三层架构的高性能存储中间件，提供 不同缓存类型的初始化能力
 * 以及常用的数据结构处理方法，抹平了宿主环境的差异化，目前应用了XX个case。提升人效XXX。
 * 
 * 
 */

function inherit(Father) {
    if(Object.create) return Object.create(Father.prototype);
    const Fn = function(){};
    Fn.prototype = Father.prototype;
    return new Fn();
}

// 默认是允许本地存储，并且，默认长度是 30
const CreateStore = function(unLocal = false, maxLength = 30, expireTime = NaN) {
    this.unLocal = unLocal;
    this.maxLength = maxLength;
    this.expireTime = expireTime;
    this.observe();
}

CreateStore.prototype.set = function(type, data) {
    this.__mock__storage[`${this.storeKey}__${type}`] = data;
};

CreateStore.prototype.get = function(type, data) {
    return this.__mock__storage[`${this.storeKey}__${type}`];
};

CreateStore.prototype.observe = function() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    this.__mock__storage = new Proxy(
        {},
        {
            get(target, propKey, receiver) {
                let result;
                if(!context.unLocal) {
                    // 如果你选用了本地存储的方式，我直接给你 getItem
                    result = (context.getItem && context.getItem(propKey)) || void 0;
                    // if(result !== Reflect.get(target, propKey, receiver)) {
                    //     throw Error
                    // }
                }
                // 给缓存加上超时时间的能力
                // if(Date.now() - this.currentTime > this.expireTime) {
                //     return void 0;
                // }

                return Reflect.get(target, propKey, receiver);
            },
            set(target, propKey, value, receiver) {
                let _value = value;
                // 数据要劫持一下
                if(value instanceof Array && value.length > context.maxLength) {
                    _value = value.slice(0, maxLength);
                }
                // 如果说，unLocal === false, 意味着，我们要在一个合适的时间，进行本地的存储
                if(!context.unLocal) {
                    new Promise((resolve) => {
                        resolve(0)
                    }).then(() => {
                        context.setItem && context.setItem(propKey, _value)
                    })
                }

                // this.currentTime = Date.now();
                
                return Reflect.set(target, propKey, value, receiver)
            }
        }
    )
}

CreateStore.prototype.getItem = function(type) {
    if(!window) throw new Error("browser runtime need!");
    // 依赖反转，我这里的抽象，不依赖于具体的实现（local / session）
    const data = window[this.storageMethod].getItem(type);
    let dataJson;
    try {
        dataJson = JSON.parse(data);
    } catch(err) {
        throw new Error(err);
    }
    // indexedDB
    return dataJson;
};

CreateStore.prototype.setItem = function(type, data) {
    if(!window) throw new Error("browser runtime need!");
    const dataJson = JSON.stringify(data);
    window[this.storageMethod].setItem(type, dataJson);
    // indexedDB

};







['pop', 'push', 'unshift', 'shift', 'reverse', 'splice'].forEach((method) => {
    CreateStore.prototype[method] = function(type, ...rest) {
        // 如果你没有数组，你要用数组方法，我给你整个空数组
        if(!this.get(type)) {
            this.set(type, []);
        }
        console.log(this.get(type), type, this.__mock__storage)


        if(!(this.get(type) instanceof Array)) {
            throw new Error('this data using array methods must be an array');
        }

        // 拿数组数据了
        const dataList = this.get(type);
        Array.prototype[method].apply(dataList, rest);
        this.set(type, dataList);
    }
});



const CreateLocalStore = function(key, ...rest) {
    CreateStore.apply(this, rest);
    this.storageMethod = 'localStorage';
    this.storeKey = `LOCAL_KEY_${key}`;
};
CreateLocalStore.prototype = inherit(CreateStore);
CreateLocalStore.prototype.constructor = CreateLocalStore;


const CreateSessionStore = function(key, ...rest) {
    CreateStore.apply(this, rest);
    this.storageMethod = 'sessionStorage';
    this.storeKey = `SESSION_KEY_${key}`;
};
CreateSessionStore.prototype = inherit(CreateStore);
CreateSessionStore.prototype.constructor = CreateSessionStore;


export const localStore = new CreateLocalStore('demo');

// window.localStorage.getItem();
// JSON.parse
// push
// JSON.stringify
// window.localStorage.setItem();

// localStore.push();
