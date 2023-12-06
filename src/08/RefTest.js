import React, { useState, useRef } from 'react'
import TailButton from '../UI/TailButton';
import TailH1 from '../UI/TailH1';
import TailInputNum from '../UI/TailInputNum';

export default function RefTest() {
    let cnt = 0;
    const [stCnt, setStCnt] = useState(0);
    const rfCnt = useRef(0);
    const rfNum1 = useRef();
    const rfNum2 = useRef();
    const rfNum3 = useRef();

    const handleCntUp = () => {
        //값이 
        cnt = cnt + 1;
        console.log("cnt=", cnt);
    }
    const handlestCntUp = () => {
        //바뀔 때 마다 바뀌는게 화면에 나타남 
        setStCnt(stCnt + 1);
        console.log("stCnt=", stCnt);
    }
    const handleRfCntUp = () => {
        //useRef는 값이 내부적으로 바뀌고 있다가 화면이 재랜더링이 되는 시점에서야 그 값이 반영됨. 
        //폼의 값을 찝어낼 때 사용.
        rfCnt.current = rfCnt.current + 1;
        console.log("rfCnt.current.value=", rfCnt.current);
    }

//input타입은 무조건 문자타입이라서 정수로 바꿔줘야함
    const handleSum = () => {
        let n1 = parseInt(rfNum1.current.value)
        let n2 = parseInt(rfNum1.current.value)
        rfNum3.current.value = n1 +n2;
    
    }
    return (
        <div className="flex flex-col w-full max-w-screen-xl mx-auto h-screen overflow-y-auto">
            <div className="flex justify-center items-center bg-slate-100 h-20">
                <TailH1 title={"useRef Hook"} />
            </div>
            <div className="flex justify-center items-center bg-slate-100 h-20">
                <div>  cnt ={cnt}</div>
                {/* caption = 버튼에 들어가는 text이름 handleClick= 버튼눌러졌을 때 할 일 {handleCntUp} 처리되는 함수 */}
                <div><TailButton caption={'증가'} handleClick={handleCntUp} /> </div>
            </div>
            <div className="flex justify-center items-center bg-slate-100 h-20">
                <div>  stcnt ={stCnt}</div>
                <div><TailButton caption={'증가'} handleClick={handlestCntUp} /></div>
            </div>
            <div className="flex justify-center items-center bg-slate-100 h-20">
                <div>  rfCnt ={rfCnt.current}</div>
                <div><TailButton caption={'rf증가'} handleClick={handleRfCntUp} /></div>
            </div>
            <div className="flex justify-center items-center bg-slate-100 h-20">
                <div>
                <TailInputNum id ={'num1'} name ={'num1'} rf ={rfNum1} isOnly = {true}/>
                </div>
               
                    <div>
                        +
                    </div>
                    <div>
                   <TailInputNum id ={'num2'} name ={'num2'} rf ={rfNum1} isOnly = {true}/> 
                </div>
                <div>
                    <TailButton caption={'='} handleClick={handleSum} isOnly = {false}/>
                </div>
                <div>
                    <TailInputNum id ={'num3'} name ={'num3'} rf ={rfNum3} isOnly = {false}/>
                </div>
            </div>

        </div>


    )
}
