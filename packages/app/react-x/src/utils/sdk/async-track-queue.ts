
import {debounce} from "lodash";

interface RequireData {
    timestamp: number | string;
}



/**
 * 如果还没上报，queue还有数据，用户将浏览器关了，
 * 所以需要用localStoreage存储一下，下次进来的时候再上报
 * 
 * 这里构建一个存储的单例
 */

class TaskQueueStoreHelper<T extends RequireData = any> {
    // 单例模式
    public static getInstance<T extends RequireData = any>() {
        if (!this.instance) {
            this.instance = new TaskQueueStoreHelper<T>();
        }
        return this.instance;
    }

    private static instance: TaskQueueStoreHelper | null = null;

    private STORAGE_KEY = 'my_local_track_key';
    protected store: any = null;

    constructor() {
        // 再次打开浏览器时，就是这个 constructor 里面的代码执行
        // 如果浏览器中有存储的数据，就取出来
        const localStore = localStorage.getItem(this.STORAGE_KEY);
        if (localStore) {
            try {
                this.store = JSON.parse(localStore);
            }catch(err: any) {
                throw new Error('localStore parse error', err);
            }
        }
    }

    // 获取队列
    get queue() {
        return this.store?.trackQueue || [];
    }

    // 设置队列
    set queue(data: Array<T>) {
        this.store = {
            ...this.store,
            trackQueue: data.sort((a, b) => Number(a.timestamp) - Number(b.timestamp)) // 按照时间排序
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store)); // 存储到本地
    }
}


// 定义一个抽象异步队列
export abstract class AsyncTrackQueue<T> {
    // _queue: Array<T> = [];


    // 本地的存储服务
    private get storeService() {
        return TaskQueueStoreHelper.getInstance<T>();
    }

    // 添加任务
    public addTask(data: T | Array<T>) {
        this.queue = this.queue.concat(data); // 添加任务
    }


    // 定义一个抽象的任务队列的方法，具体的实现由子类去实现
    protected abstract consumeTaskQueue(data: Array<T>): Promise<any>;

    // 获取队列
    private get queue() {
        return this.storeService.queue;
    }

    // 设置队列
    private set queue(data: Array<T>) {
        // 增加埋点数据
        this.storeService.queue = data || []; // 本地存储
        if (this.storeService.queue.length > 0) { // 如果队列不为空，就执行上报
            this.debounceRun();
        } else {
            console.log('队列为空');
        }
    }

    protected debounceRun = debounce(this.run.bind(this), 500); // 延迟500毫秒执行

    // 有一个上报的函数, 处理下异步批量逻辑
    public run() {
        const data = this.queue;
        if (data.length) {
            this.consumeTaskQueue(data); // 执行上报
            this.queue = []; // 上报完毕，则把 queue 清空
        }
        
    }


}