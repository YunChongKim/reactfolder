import LogoP from '../01/LogoP'
import React from 'react'
import style from './Lotto.module.css'
import { useState,useEffect } from 'react'


export default function Lotto() {
    
    const [tags,setTags] = useState("Lotto번호 생성기");

    const handleClick = () => {
        //setTags(Math.floor(Math.random()*45)+1)
        //빈 배열 생성
        let lottoNum =[] ;

        while(lottoNum.length < 7){
            //while 끝나면  n 사라짐
            let n = Math.floor(Math.random()*45)+1;
            if(!lottoNum.includes(n)) lottoNum.push(n);
        }

        //+추가
        //6번쨰 앞에 0개 지우고(1개도 지우지말고) +를 붙여라
        lottoNum.splice(6,0,'+');
        
    
        //map은 인수 2개를 가짐. key = p태그를 서로 구분하게 만들어줌
        let tmTags = lottoNum.map((item,idx)=>
        (item === '+')
        ?<span key={`sp${idx}`} className={style.spp}>{item}</span>
        : <span key={`sp${idx}`} className={style[`sp${Math.floor(item/10)}`]}> 
            {item}
            </span>
        );
        console.log(tmTags);

        setTags(tmTags)
    }



    useEffect(() =>{
        console.log(tags)
        },[tags]);
  return (
    <div className={style.divLotto}>
        <div className={style.d1}>
        <p className={style.d1}>{tags}</p>
        </div>
        <div className={style.d1}>
            <button  className={style.bt} onClick={handleClick}>Lotto번호생성</button>
            </div>
            <LogoP msg= 'TEST'/>       
    </div>
  )
}
