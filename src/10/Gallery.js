import { useState, useEffect, useRef } from "react"; 
import TailButton from "../UI/TailButton";
import TailH1 from "../UI/TailH1"
import { IoIosImage } from "react-icons/io";
import TailCard from "../UI/TailCard";





export default function Gallery() {

    let apikey = process.env.REACT_APP_APIKEY;

    // fetch 데이터 저장
    const [tdata, setTdata] = useState([]);

    //환경변수값 가져오기
    const kwInput = useRef();

    const handleGetData = async (e) => {
        console.log("handleGetData")
        e.preventDefault();

        let enkw = encodeURI(kwInput.current.value);
        if (enkw === '') {
            alert('키워드를 입력하세요.');
            return;
        }
   
        let url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?`;
        url = `${url}serviceKey=${apikey}`
        url = `${url}&numOfRows=10`;
        url = `${url}&pageNo=1`;
        url = `${url}&MobileOS=ETC`;
        url = `${url}&MobileApp=AppTest`;
        url = `${url}&arrange=A`;
        url = `${url}&&keyword=${enkw}&_type=json`;

        const resp = await fetch(url);
        const data = await resp.json();

        console.log(url)
        console.log(data)
        setTdata(data.response.body.items.item);
    }
    const handleResetData = (e) => {
        e.preventDefault();
        kwInput.current.value = '';
    }

    //tdata 변경
    useEffect(() => {
        console.log("tdata=", tdata);
    }, [tdata])


    return (

        <div className='container mx-auto h-screen overflow-y-scroll cursor-pointer mt-10'>
            <div className='flex flex-col justify-top items-center my-8'>
                <div className="flex">
                    <TailH1 title={"한국관광공사_관광사진 정보"} />
                    <IoIosImage className='text-5xl mx-5' />
                </div>

                <div className="w-full inline-flex justify-center items-center p-3 " >
                    <input ref={kwInput} type="text" id="txt1" className="block mb-2 text-sm font-medium text-gray-900 bg-slate-200 rounded-md w-1/4 h-8" placeholder="검색어를 입력하세요" required />
                    <TailButton className="border-cyan-900" caption={"확인"} bcolor='sky' handleClick={(e) => handleGetData(e)} />
                    <TailButton caption={"취소"} bcolor='sky' handleClick={(e) => handleResetData(e)} />
                </div>

            </div>
            <div>
                 <TailCard imgSrc={"https://tong.visitkorea.or.kr/cms2/website/59/2928159.jpg"} 
                        title={"광안리해수욕장"} 
                        subtitle={"수영구 광안동"} 
                        tags={"광안리해변,바닷가,바다,부산 광안리"}/> 
            </div>
        </div>
    )
}
