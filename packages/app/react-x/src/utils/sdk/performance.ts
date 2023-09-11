import {BaseTrack} from './track';

export class Performance {
    // 以毫秒上报
    public static readonly timing = window.performance && window.performance.timing;

    public static init () {
        if (!this.timing) {
            console.warn('你的浏览器不支持 performance api');
            return;
        }

        window.addEventListener('load', () => {
            new BaseTrack().track(
                this.getTimings()
            );
        });
    }

    // 获取性能数据
    public static getTimings() {
        if (!this.timing) {
            console.warn('你的浏览器不支持 performance api');
            return;
        }
        return {
            dns: this.getDnsTime(),
            tcp: this.getTCPTime(),
        }
    }

    // dns解析时间
    private static getDnsTime() {
        return this.timing.domainLookupEnd - this.timing.domainLookupStart;
    }

    // tcp建立时间
    private static getTCPTime() {
        return this.timing.connectEnd - this.timing.connectStart;
    }
}