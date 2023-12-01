import React, { useEffect, useState } from 'react'
import { PiAirplaneTakeoffDuotone } from "react-icons/pi";
import { PiAirplaneLandingFill } from "react-icons/pi";
import TailH1 from '../UI/TailH1';

export default function BoxOffice() {
    const [trs, setTrs] = useState();
    const [boxlist, setBoxlist] = useState();

    //state로 매번 갱신해도 맨 처음 딱 한번만 실행됨. ^useState([]) => 초깃값 주기
    useEffect(() => {
        let apikey = process.env.REACT_APP_BOXOFFICE;
        let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
        url = url + `key=${apikey}`
        url = url + `&targetDt=20231129`;

        console.log(url)
        fetch(url)
            .then(resp => resp.json())
            .then(data => setBoxlist(data.boxOfficeResult.dailyBoxOfficeList))
            .catch(err => console.log(err))

    }, []);

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
                <div className='flex m-8'>
                    <PiAirplaneTakeoffDuotone className="text-3xl text-pink-300" />
                    <TailH1 title="박스오피스" />
                    <PiAirplaneLandingFill className="text-3xl text-pink-300" />
                </div>
                <div className="relative overflow-x-auto w-3/4 shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
