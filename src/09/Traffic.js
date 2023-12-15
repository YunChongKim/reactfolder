import React from 'react'
import TailH1 from '../UI/TailH1'
import TailButton from '../UI/TailButton'
import { useState, useEffect } from 'react'
import TrafficNav from '../UI/TrafficNav'


export default function Traffic() {
    //상태변수
    const[tdata, setTdata] = useState([]); //전체데이터 => []넣어서 초기화 시켜야함. 안넣음 찾을 수 없는 데이터가 됨. 
    const[c1,setC1] = useState([]); //대분류
    const[c2,setC2] = useState([]); //중분류
    const[selC1,setselC1] = useState([]); //선택된 대분류
    const[selC2,setselC2] = useState(); //선택된 중분류

    const[detail, setDetail] = useState(); // 상세 정보
    //상세정보 보기key키순
    //리스트,배열은 순서 있음. objec는 순서 x
    //애초에 여기엔 대분류,소분류 목록에 안들어가있으니 if문으로 따로 안빼도 됨. > 순서 정할 
    const detailKey = ['사고건수','사망자수','중상자수','경상자수','부상신고자수'];


    // 데이터 불러오기 ansync = 비동기 함수
    const getData =async () => {
        let apikey = process.env.REACT_APP_APIKEY;
        let url = `https://api.odcloud.kr/api/15070282/v1/uddi:00e5cb5a-ecdf-4190-a499-ba3a6b2a8db9?`
        url = url + `page=1&perPage=20&returnType=json`
        url = url + `&serviceKey=${apikey}`;
            

        //await => .then대신 사용할 수 있음
        const resp = await fetch(url);
        const data = await resp.json();

        //console.log(data)
        setTdata(data.data);
    }

        //상태변수가 변경되었을 때 실행
        useEffect(()=> {
            console.log(tdata)
            //대분류 생성

            //1.tdata를 순회하면서 대분류 자료만 추출
            //tdata.map(item =>item.사고유형_대분류);
            let tm = tdata.map(item =>item['사고유형_대분류']);
            
            //2. 중복제거
            tm = new Set(tm)
            //3.set을 array로 변경
            //... => 풀어서 배열로 바꿔라
            tm = [...tm];
            
            // 4. state변수에 저장
            setC1(tm);
            
        },[tdata]);

        useEffect(()=>{
          if (tdata  === undefined) return ;
        console.log("selC1 = ", selC1)

        //중분류 만들기
        let tm = tdata.filter(item =>item.사고유형_대분류 === selC1)
                        .map((item) =>item.사고유형_중분류 );
        console.log(tm)
        setC2(tm);
        setselC2(''); 
        setDetail(''); 

        
    },[selC1]);
    
    //디테일 만들기
    useEffect(()=>{
    let tm = tdata.filter((item) => item.사고유형_대분류 ===selC1 &&
                                    item.사고유형_중분류 ===selC2   )
    tm = tm[0];
    console.log("detail",tm)                            

    //있는순서 그대로 출력
    if (tm  === undefined) return ;
    tm = detailKey.map((k, idx)=>  <div className='flex flex-col border 1px' key={`d1${idx}`}> 
                                    <div className='inline-flex justify-center items-center m-2 bg-neutral-300 font-bold text-lg'>{k}</div> 
                                    <div className='inline-flex justify-center items-center m-2 p-2 '>{tm[k]}</div> 
                                    </div>
                                        )
    setDetail(tm);
    },[selC2]);

    
  //컴포넌트 시작시 한 번 실행 = 안불러도 처음에 알아서 실행 = 컴포넌트 시작 시 getData실행
  useEffect(()=>{
    getData();
  },[]);

    return (
    <div className='container mx-auto h-screen overflow-y-scroll cursor-pointer mt-10'>
     <div className='flex flex-col justify-top items-center h-full my-8'>
      <TailH1 title={"도로교통공단_사고유형별 교통사고 통계"}/>
    
      <div className='my-10 w-4/5'>
        {c1 && <TrafficNav title={'대분류'} carr={c1} sel={selC1}setSel={setselC1}/>}
        {c2 && <TrafficNav title={'중분류'} carr={c2} sel={selC2}setSel={setselC2}/>}
      </div>
      <div className='grid grid-cols-5 gap-5 my-10 w-4/5'>
        {detail}
      </div>
      </div>
    </div>
  )
}
