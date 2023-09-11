import React, { FC, MouseEventHandler, RefObject, useEffect, useRef, useState } from 'react';
// import commandMockList from './mock';
type Props = {
    className?: string
};

interface IProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
}

const CommandData: FC<IProps> = ({ item }) => {
    const [ selected, setSelected ] = useState<boolean>(false);

    const handleClick: MouseEventHandler<Element> = (event) => {
        event.preventDefault();
        setSelected(!selected);
    }

    return <div className='flex flex-col items-start p-4 border-b'>
        <div className='h-auto flex justify-start'>
            <a className='font-bold text-lg ledning-10' href='/'>
                {
                    item?.target?.question?.title || item?.target?.title
                }
            </a>
        </div>
        <div className=' leading-6'>
            {
                selected? <div dangerouslySetInnerHTML={{ __html: item?.target?.content}}></div>:
                <a href='/' onClick={handleClick}
                    className="cursor-pointer hover:text-gray-600 text-gray-800 "
                >
                    {item?.target?.excerpt.substring(0, 80) + '...'}
                    <span className='text-base leading-7 text-blue-500'>阅读全文 &gt;</span>
                </a>
            }
        </div>
        
        <div className={'flex bg-white w-full ' + 
        (selected ? 'bottom-0 shadow-sm border-t sticky ': '')
    }>
            <div className='h-10 rounded-md bg-blue-100 text-blue-500 p-2 m-2 inline-flex'>
            <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                赞同
            </span>
            </div>
            <div className='h-10 rounded-md bg-blue-100 text-blue-500 p-2 m-2 inline-flex'>
                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </span>
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                &nbsp; {item?.target?.comment_count} 条评论
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                收藏
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                喜欢
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                分享
            </div>
            {
                selected && <div onClick={handleClick}
                    className='font-base text-gray-800 p-2 m-2 inline-flex cursor-pointer'
                >
                    <span className=' inline-flex'>收起</span>
                </div>
            }
        </div>
    </div>
}

function useObserver(scrollRef: RefObject<HTMLDivElement> ) {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3078/book/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTM3MTY2OTcsImV4cCI6MTY5MzgxNjY5N30.J-VG7Jwr8QaEVGH3SRJxiLRLe-NikDZ5CurU4JZW0Ck'
                
            },
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            setList(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        // 浏览器中，有五个 observer, mutationObs, intersectionObs, 
        let intersectionObs: IntersectionObserver | undefined = new IntersectionObserver(function(entries) {
            entries[0].isIntersecting && setList((list) => [...list]);
        })
    
        scrollRef.current && intersectionObs.observe(scrollRef.current);
    
        return () => {
            scrollRef.current && intersectionObs?.unobserve(scrollRef.current);
            intersectionObs = void 0;
        }
      }, []);

      return list;
}

const CommandList: FC<Props> = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const list = useObserver(scrollRef)

  return (
    <div className='flex flex-col'>
        {
            list.map((item, idx) => <CommandData key={item.id + idx} item={item} />)
        }
        {/* 我只要 loading 出来显示了，我就继续加载。 */}
        <div ref={scrollRef}>loading...</div>
    </div>
  )
}

export default CommandList;