import React from 'react';
import ReactDOM from 'react-dom/client';
import {RecoilRoot} from 'recoil';

import App from './app';
import './index.less'

// 性能监控埋点
import { Performance } from './utils/sdk/performance';
Performance.init();


ReactDOM.createRoot(document.getElementById('app') as Element).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
)