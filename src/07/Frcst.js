import { useEffect, useState } from "react"
import TailH1 from "../UI/TailH1";
import TailButton from "../UI/TailButton";

export default function Frcst() {
    //fetch 해오는 사용자 정의 함수 호출
    //상태변수 dataF에 저장하려면 setDataF에 저장해야함. 
    const [dataF, setDataF] = useState();
    const [dtTags, setDtTags] = useState();
    const [cnTags, setcnTags] = useState();

    //키배열
    const dtKey = ["frcstOneDt", "frcstTwoDt", "frcstThreeDt", "frcstFourDt"];
    const cnKey = ["frcstOneCn", "frcstTwoCn", "frcstThreeCn", "frcstFourCn"];


    const getData = () => {


        //fetch 주소
        let url = 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustWeekFrcstDspth?';
        url = url + `serviceKey=${process.env.REACT_APP_APIKEY}`;
        url = url + `&returnType=json&numOfRows=100&pageNo=1`;
        url = url + `&searchDate=2023-11-30`;

        console.log(url);
        fetch(url)
            .then(resp => resp.json())
            .then(data => setDataF(data.response.body.items[0]))
            .catch(err => console.log(err))


    }
    //컴포넌트가 생성될 때 처음 한 번 하고싶은게 있을 때 사용 = 처음 시작 할 때 데이터 한 번 가져옴
    useEffect(() => {

        //fetch 해오는 사용자 정의 함수 호출
        getData();
    }, []);


    //state변수인 dataF가 변경되었을 때 실행 = 내가 콜을 안해도 실행됨. 
    //함수는 콜 불러야 실행되지만 useEffect는 안불러도 []안에 있는게 바뀌면 실행됨. 
    const handleDtClick = (idx) => {
        console.log(dataF[cnKey[idx]])
        
        let tm = dataF[cnKey[idx]].split(',');
        tm = tm.map((item) => item.split(':'));
        console.log(tm)
        setcnTags(tm);
    }

    useEffect(() => {
        if (dataF === undefined) return;

        console.log(dataF)
        let tm = dtKey.map((k, idx) =>
            // <div key={`dt${idx}`} onClick={() => handleDtClick(idx)}>{dataF[k]}</div>
            <TailButton key ={`dt${idx}`} caption={dataF[k]} handleClick={() => handleDtClick(idx)}/>
        );

        setDtTags(tm);
    }, [dataF]);

    return (
        dataF &&
        <div className="flex flex-col w-full max-w-screen-xl mx-auto h-screen overflow-y-auto">
            <div className= "flex justify-center items-center bg-slate-100 h-20">
              <TailH1 title={"초미세먼지예보"}/>
            </div>
            <div>
                <div className="flex justify-center items-center p-10">
                    {dtTags}
                </div>
                
                <div>
                   
                    {cnTags}
                          
                    
                </div>
            </div>
        </div>

    )
}
