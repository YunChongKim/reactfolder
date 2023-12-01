import { useEffect,useState } from 'react'
//useEffect,useState import해줘야함.
import TailH1 from '../UI/TailH1'
import TailBlueButton from '../UI/TailBlueButton';
import data from './dataFrcst.json'

export default function Frcst() {
    const [dtTags, setDtTags] = useState();
    const [dtcnTags, setDtCnTags] = useState();
    
    const dtKey = ["frcstOneDt", "frcstTwoDt", "frcstThreeDt", "frcstFourDt"];
    const cnKey = ["frcstOneCn", "frcstTwoCn", "frcstThreeCn", "frcstFourCn"];

    let dtcn = {}
    for(let i=0; i<dtKey.length; i++) {
        dtcn[data[dtKey[i]]] = data[cnKey[i]]
        // 딕션어리형태로 만들어줌. dtKey값(날짜)을 key로 만들어서 값을 불러옴
    
    }
    console.log(dtcn)
    
    const handleClick = (dt) => {
        console.log(dt, dtcn[dt])
        setDtCnTags(dtcn[dt]);
    }
    
    useEffect(() => {
        setDtTags(
            dtKey.map((k, idx) =>
                <TailBlueButton key={`dt${idx}`}
                    caption={data[k]}
                    onClick={() => { handleClick(data[k])}} />
            )
        );
    }, []);

    return (
        <div className='container mx-auto h-screen'>
            <div className='flex justify-center items-center h-1/6 bg-slate-300'>
                <TailH1 title={"초미세먼지 주간예보"} />
            </div>
            <div className='grow flex flex-col justify-center items-center bg-orange-100'>
                <div className='flex justify-center items-center'>
                    {dtTags}
                    {dtcnTags}
                </div>
            </div>
        </div>
    )
}
