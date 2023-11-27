import style from './Like.module.css';
import { useState,useEffect} from 'react';
import React from 'react'

export default function Like() {
    const [cnt, setCnt] = useState(0);
    // let cnt = 0;
    const handleUp = () => {
        // cnt = cnt + 1;
        setCnt(cnt+1);
        console.log("up",cnt)
       
    }
    const handleDown= () => {
        // cnt = cnt - 1;
       if(cnt != 0) setCnt(cnt-1);
        console.log("down",cnt)
    }
    //맨 처음 컴포넌트 생성시 한 번만 실행(호출안하고 쓰는 함수)
    useEffect(()=>{
        console.log("Like 생성")
    }, []);
    //state변수에 의해 컴포넌트가 업데이트 될 때 실행
    useEffect(()=>{
        console.log("Like 업데이트", cnt)
    }, [cnt]);

  return (
    <div className={style.likediv}>
      <span onClick={handleUp}>🧡</span>
      <span>{cnt}</span>
      <span onClick={() => handleDown()}>😡</span>
    </div>
  )
}
