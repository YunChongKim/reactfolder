import React from 'react'

export default function TailBlueButton({caption, onClick}) {
  return (
    <button 
        onClick={onClick}
        className='inline-flex justify-center items-center p-5 h-10 rounded-md m-1 bg-blue-300 text-white hover:bg-blue-800'>
      {caption}
    </button>
  )
}
//캡션이 들어오면 버튼을 만들어줌
//onClick 버튼에 값을 받아서 넣어줌.