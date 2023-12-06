import React, { useEffect, useRef, useState } from 'react'
import { PiAirplaneTakeoffDuotone } from "react-icons/pi";
import { PiAirplaneLandingFill } from "react-icons/pi";
import TailH1 from '../UI/TailH1';
import TailInputNum from '../UI/TailInputNum';

export default function BoxOffice() {
    const [trs, setTrs] = useState();
    const [boxlist, setBoxlist] = useState();
    const [Yesterday, setYesterday] = useState();
    const rfDt = useRef();
// 1.랩퍼
// 2.인풋에 랩퍼 끼우기 > ref = 래퍼변수를 의미함.    
// 3.인풋이 온체인지 > 래퍼 가져오기
//현재 선택된 날짜를 어떻게 찾느냐? useRef를 사용해서 찝어옴. useRef의 ref의미

    
    const getFetchData = (dt) => {
        let apikey = process.env.REACT_APP_BOXOFFICE;

        let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
        url = url + `key=${apikey}`
        url = url + `&targetDt=${dt}`;
    //key값을 env.REACT_APP_BOXOFFICE에 담아두고 외부에서 숨김    
        console.log(url)
        fetch(url)
            .then(resp => resp.json())
            .then(data => setBoxlist(data.boxOfficeResult.dailyBoxOfficeList))
            .catch(err => console.log(err))
        
            
        }
        const handleChange = () =>{
            getFetchData(rfDt.current.value.replaceAll('-',''));

        }
    //state로 매번 갱신해도 맨 처음 딱 한번만 실행됨. ^useState([]) => 초깃값 주기

    useEffect(() => {
        let tmyesterday = new Date();
        // toISOString.getDate로도 날짜 사용 가능은 날짜를 **-**-**로 끊어서 표시해줌.
       tmyesterday.setDate(tmyesterday.getDate()-1);
       tmyesterday = tmyesterday.toISOString().slice(0,10);
       
       setYesterday(tmyesterday)
       console.log(tmyesterday)
       getFetchData(tmyesterday.replaceAll("-",""))
        
    }, [])

    //boxlist 변경됐을 때 useEffect 실행
    useEffect(() => {
        (boxlist === undefined)
            ? setTrs(<tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>)
            : setTrs(
                boxlist.map((item) =>
                <tr key={item.movieCd} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                        <span> {item.movieCd}</span>
                        <span>
                            {item.rank}
                        </span>
                        {item.movieNm}
                    </td>
                    <td className="px-6 py-4 text-right">
                        {parseInt(item.salesAmt).toLocaleString('ko-KR')}원
                    </td>
                    <td className="px-6 py-4 text-right">
                        {parseInt(item.audiAcc).toLocaleString('ko-KR')}명
                    </td>
                    <td className="px-6 py-4">
                        {/* 증가 red / 하락 blue 표시 */}
                        {
                        (parseInt(item.rankInten) > 0)
                        ? <span className="text-red-600">▲${item.rankInten}</span>
                        : (parseInt(item.rankInten) < 0)
                        ? <span className="text-blue-600">▼${Math.abs(item.rankInten)}</span>
                        : "-"
                    }
                    {/* abs 절대값 */}
                    </td>
                </tr>
                )
            )
    }, [boxlist]);




    return (
        <div className='container mx-auto h-screen overflow-y-scroll cursor-pointer mt-10'>
            <div className='flex flex-col justify-center items-center h-full bg-slate-100'>
            <div>

        </div>
                <div className='flex m-8'>
                    <PiAirplaneTakeoffDuotone className="text-3xl text-pink-300" />
                    <TailH1 title="박스오피스" />
                    <PiAirplaneLandingFill className="text-3xl text-pink-300" />
                    <label htmlFor='small-input' className='inline-flex justify-center items-center text-md mx-5 px-1 text-neutral-700'>날짜선택</label>
                    <input type="date" ref={rfDt} onChange={handleChange} max={Yesterday} id="small-input" className="block w-3/1 p-2 m-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="relative overflow-x-auto w-3/4 shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-    gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    영화명
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    매출액
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    관객수
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    증감율
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {trs}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
