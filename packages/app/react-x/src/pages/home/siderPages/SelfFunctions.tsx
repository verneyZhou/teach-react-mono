
import React from 'react'

export default function SelfFunctions() {
  return (
    <div className='flex flex-col'>
        {
            new Array(10).fill(-1).map((item, idx) => 
                <div key={idx} className='flex flex-1 flex-row justify-between p-4 pb-2'>我的收藏</div>
            )
        }
    </div>
  )
}
