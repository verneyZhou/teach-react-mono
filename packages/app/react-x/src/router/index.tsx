import React from 'react'
import { RouteObject, Outlet } from 'react-router-dom'
import Home from '../pages/home'
import CommandList from '@/pages/home/tabPages/commandList'

export interface extraBizObject {
    title?: string,
}

export const router: Array<RouteObject & extraBizObject> = [
    {
        path: '/', element: <Home />, title: '首页',
        children: [
            { path: '', element: <CommandList /> },
            { path: '/follow', element: <div>关注列表，开发中。。。</div>},
            { path: '/hot', element: <div>热榜榜单，开发中。。。</div>},
            { path: '/zvideo', element: <div>视频区域，开发中。。。</div>},
        ],
    },
    {
        path: '/education', element: <div>教育页面，开发中。。。</div>
        , title: '知学堂'
    },
    {
        path: '/xen', element: <div>会员页面，开发中。。。</div>
        , title: '会员'
    },
    {
        path: '/explore', element: <div>探索页面，开发中。。。</div>
        , title: '探索'
    },
    {
        path: '/question', element: <div>问答页面，开发中。。。</div>
        , title: '问答'
    },
]