import React from 'react'

export default function TailButton({caption,handleClick}) {
    //사용하려면 caption줘야함. 클릭했을 때 받을 함수 handleCik
  return (
    <button className="iinline-flex justify-center items-center p-2 rounded-md
                        bg-sky-700 text-white m-2 hover:text-sky-700
                        hover :bg-sky-200"
                        onClick={handleClick}
                        >
    {caption}
    </button>
      
    
  )
}
