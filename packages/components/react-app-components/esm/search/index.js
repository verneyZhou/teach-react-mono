import React, { useState, useRef, Fragment } from 'react';
import { localStore } from '../utils/store.js';
import Button from '../button/index.js';

const Search = () => {
    // input 的内容
    const [inputValue, setInputValue] = useState('');
    // 下拉框的数据
    const [relatedList, setRelatedList] = useState([]);
    // 当前箭头的位置
    const [selectedIdx, setSelectedIdx] = useState(-1);
    // input DOM 
    const inputRef = useRef(null);
    const handleBlur = (e) => {
        setRelatedList([]);
        setSelectedIdx(-1);
    };
    const handleFocus = (e) => {
        // 鼠标放进去的时候，我要去取一下历史数据
        setRelatedList((localStore.get('historyList') || [])
            .reduce((total, item) => total.find((i) => i === item) ? total : [...total, item], [])
            .filter((item) => Boolean(item))
            .filter((item) => (!e.target.value) || (e.target.value && item.includes(e.target.value)))
            .slice(0, 5));
    };
    const handleChange = (e) => {
        setInputValue(e.target.value);
        //@ts-ignore
        handleFocus(e);
    };
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                {
                    // 敲回车，当前光标可能在下拉框上
                    const currentValue = (selectedIdx !== -1) ? relatedList[selectedIdx] : inputValue;
                    // 存一下数据
                    localStore.unshift('historyList', currentValue);
                    // 敲了回车，把值放到界面上
                    setInputValue(relatedList[selectedIdx]);
                    setRelatedList([]);
                    break;
                }
            case "ArrowUp":
                {
                    if (relatedList.length) {
                        // 说明历史记录有东西了
                        if (selectedIdx === 0) {
                            setSelectedIdx(relatedList.length - 1);
                        }
                        else {
                            setSelectedIdx((n) => n - 1);
                        }
                    }
                    break;
                }
            case "ArrowDown":
                {
                    if (relatedList.length) {
                        // 说明历史记录有东西了
                        if (selectedIdx < relatedList.length - 1) {
                            setSelectedIdx((n) => n + 1);
                        }
                        else {
                            setSelectedIdx(0);
                        }
                    }
                    break;
                }
        }
    };
    return (React.createElement(Fragment, null,
        React.createElement("div", { className: 'flex items-center' },
            React.createElement("input", { className: 'w-96 h-8 border boder-gray-100 px-4 rounded-full bg-gray-50 ', placeholder: "\u4E0D\u8D1F\u76F8\u601D\u610F\u5168\u6587", onBlur: handleBlur, onFocus: handleFocus, onChange: handleChange, onKeyDown: handleKeyDown, ref: inputRef, value: inputValue }),
            React.createElement(Button, null, "\u63D0\u95EE")),
        Boolean(relatedList.length)
            && React.createElement("div", { style: { left: inputRef.current?.getBoundingClientRect()?.x }, className: 'fixed top-16 w-96 z-10 bg-white border border-gray-200 rounded-md p-2 shadow-sm' }, relatedList.map((item, idx) => (React.createElement("div", { key: item, className: `${idx === selectedIdx ? 'text-blue-600 bg-gray-100' : 'text-black'} h-8 rounded-md px-2 flex items-center` }, item))))));
};

export { Search as default };
