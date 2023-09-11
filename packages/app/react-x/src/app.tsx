
import React, {FC} from 'react';
import {HashRouter, useRoutes} from 'react-router-dom'
import { router } from './router';

import {useRecoilState, useRecoilValue} from 'recoil';
import {fontSizeState, fontSizeLabelState} from './store';

// import './app.css';
// import styles from './app.module.less'; // css module 



type Props = {
    style?: string;
}

const Routers = () => useRoutes(router);


const App: FC<Props> = () => {
    const [fontSize, setFontSize] = useRecoilState<number>(fontSizeState);
    const fontSizeLabel = useRecoilValue<string>(fontSizeLabelState);


    console.log('=====init app=====')


    console.log('===project.config', project.config)

    return (
        // <div className='app'>App</div>
        // <div className={styles.app}></div>
        
        // <div className=' text-blue-50 bg-red-300 flex flex-col'>
        //     <div className=' text-center hover:text-green-400'>App</div>
        //     <div style={{fontSize}}>font size: {fontSizeLabel}</div>
        //     <button onClick={() => setFontSize((size) => size + 1)}>+</button>
        //     <button onClick={() => setFontSize((size) => size - 1)}>-</button>
        //     <Child />
        //     <div>process.env.BASE_ENV: {process.env.BASE_ENV}</div>
        // </div>
        <HashRouter>
            <Routers />
        </HashRouter>
    )
}


const Child: FC = () => {
    const [fontSize, setFontSize] = useRecoilState<number>(fontSizeState);
    const fontSizeLabel = useRecoilValue<string>(fontSizeLabelState);

    return (
        <div style={{fontSize}}>hello Child {fontSizeLabel}</div>
    )
}




export default App;