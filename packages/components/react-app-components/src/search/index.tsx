import React, { ChangeEventHandler, FC, FocusEventHandler, useRef, Fragment, useState, KeyboardEventHandler } from 'react';
import { localStore } from '../utils/store.js';
import Button from '@/button/index.js';

type IProps = {
    name?: string;
}


const Search:FC<IProps> = () => {

    // input 的内容
    const [inputValue, setInputValue] = useState<string>('');
    // 下拉框的数据
    const [ relatedList, setRelatedList ] = useState<Array<string>>([]);
    // 当前箭头的位置
    const [ selectedIdx, setSelectedIdx ] = useState<number>(-1);
    // input DOM 
    const inputRef = useRef<HTMLInputElement>(null);


    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        setRelatedList([]);
        setSelectedIdx(-1);
    };

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
        // 鼠标放进去的时候，我要去取一下历史数据
        setRelatedList((localStore.get('historyList') || [])
        .reduce((total: Array<string>, item: string) => total.find((i: string) => i === item) ? total : [...total, item], [])
        .filter((item: string) => Boolean(item))
        .filter((item: string) => (!e.target.value) || (e.target.value && item.includes(e.target.value)))
        .slice(0, 5)
        )
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
        //@ts-ignore
        handleFocus(e);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        switch(e.key) {
            case 'Enter': 
                {
                    // 敲回车，当前光标可能在下拉框上
                    const currentValue = (selectedIdx !== -1) ? relatedList[selectedIdx]: inputValue;
                    // 存一下数据
                    localStore.unshift('historyList', currentValue);
                    // 敲了回车，把值放到界面上
                    setInputValue(relatedList[selectedIdx]);
                    setRelatedList([]);
                    break;
                }
            case "ArrowUp":
                {
                    if(relatedList.length) {
                        // 说明历史记录有东西了
                        if(selectedIdx === 0) {
                            setSelectedIdx(relatedList.length - 1)
                        } else {
                            setSelectedIdx((n) => n-1)
                        }
                    }
                    break;
                }
            case "ArrowDown":
                {
                    if(relatedList.length) {
                        // 说明历史记录有东西了
                        if(selectedIdx < relatedList.length - 1) {
                            setSelectedIdx((n) => n+1)
                        } else {
                            setSelectedIdx(0)
                        }
                    }
                    break;
                }
            default:
                break;
        }
    };

    return (
    <Fragment>
        <div className='flex items-center'>
            <input 
                className='w-96 h-8 border boder-gray-100 px-4 rounded-full bg-gray-50 ' 
                placeholder="不负相思意全文"
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                value={inputValue}
                />
            {/* Button */}
            <Button>提问</Button>
        </div>
        {
            Boolean(relatedList.length) 
                && <div 
                    style={{ left: inputRef.current?.getBoundingClientRect()?.x}}
                className='fixed top-16 w-96 z-10 bg-white border border-gray-200 rounded-md p-2 shadow-sm'>
                {
                    relatedList.map((item, idx) => (
                        <div key={item}
                        className={`${idx === selectedIdx ? 'text-blue-600 bg-gray-100':'text-black'} h-8 rounded-md px-2 flex items-center`}
                        >
                            {item}
                        </div>
                    ))
                }
            </div>
        }
    </Fragment>)
};

export default Search;
