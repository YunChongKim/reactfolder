import style from './Lotto.module.css'
import { useState } from 'react'
import React from 'react'

export default function Lotto() {
    const [tags, setTags] = useState();

    const handleClick = (e) => {
        e.preventDefault();

        let arr = [];
        while (arr.length < 7) {
            let n = Math.floor(Math.random() * 45) + 1;
            if (!arr.includes(n)) arr.push(n);
            //^동일한 숫자가 없도록 숫자 랜덤으로 생성

          let tempTags;
          tempTags = arr.map((item, idx) =>
                idx == 5
                ? <>
                 <span key={`sp${idx}`}className={style.sp1}>
                {item}
                </span>
                <span key={`spp${idx}`}className={style.spp}> + </span>
               </>
             : <span key={`sp${idx}`}span className={style.sp1}>
                {item}
                   </span>
                  

        )   
        console.log(tempTags)
        setTags(tempTags);

    }
    
    return (
        <main className={style.m}>
            <section className={style.sec}>
                <form className={style.fm}>
                    <div className={style.fdiv}>
                        <div className={style.div1} id='d1'> 
                        </div>
                        {tags}
                    </div>
                    <div className={style.fdiv}>
                    <div className={style.div1} id='d2'>
                        <button className={style.bt} onClick={handleClick}>로또번호 생성</button>
                    </div>
                    </div>
                </form>
            </section >
        </main>

    )
}
