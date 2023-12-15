import TailButton from "./TailButton"
//배열,선택,셀,셀선택(c1을 바꿈)
export default function TrafficNav({title, carr, sel,setSel}) {
    
    const handleBtClick = (item) => {
        setSel(item);
    }
    const tags = carr.map((item,idx) => 
        <TailButton
        caption = {item}
        key = {`bt${idx}`}
        handleClick = {() => {handleBtClick(item)}}
        //item이랑 sel이랑 같은거면 orange사용, 아님 sky
        bcolor ={item === sel?'orange': 'sky'}
    />
    );



    return (
    <div className="flex w-full bg-slate-100 p-3 my-4">
      <div className="flex justify-center items-center text-xl w-1/6">
        {title}        
      </div>
      <div className="flex justify-end items-center w-5/6">
        {tags}        
      </div>
    </div>
  )
}
