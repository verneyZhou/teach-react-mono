
import { v4 as uuid } from 'uuid';
import { AsyncTrackQueue } from './async-track-queue';


export interface UserTrackData {
    msg?:string;
}


export interface TrackData {
    id: string;
    seqId: number;
    timestamp: number | string;
    location?: string;

}



export class BaseTrack extends AsyncTrackQueue {

    private seq = 0;

    // track方法，提供给开发者调用，收集埋点数据
    public track(data: UserTrackData) {
        this.addTask({
            id: uuid(),
            seqId: this.seq++,
            timestamp: Date.now(),
            ...data
        });
    }

    // 有一个上报的函数, 处理下异步批量逻辑
    consumeTaskQueue(data: Array<TrackData>) {
        // let img;
        // img = new Image(0,0);
        // img.src = 'http://localhost:xx/1.gif?data=' + encodeURIComponent(JSON.stringify(data));
        // img.onload = img.onerror = function() {
        //     img = null;
        // }

        // or: post接口上报
        // return aixos.post('http://localhost:xx/1.gif', {data})

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data);
            }, 0);
        }).then((data) => {
            console.log('上报成功', data);
        })
    }
}