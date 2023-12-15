export default function TailButton({caption,handleClick,bcolor}) {
    //사용하려면 caption줘야함. 클릭했을 때 하는 행동
    //TailButton을 만들면서 반드시 caption과 handleClick을 반드시 넣어라
    const tailColor = {
      sky :  'bg-sky-700 hover: bg-sky-200 hover:text-sky-700',
      orange :  'bg-orange-700 hover: bg-orange-200 hover:text-orange-700',
      lime :  'bg-lime-700 hover: bg-lime-200 hover:text-lime-700'
    }
  
    return (
    <button className={`inline-flex justify-center items-center
                       px-5 py-2 rounded-md m-2 
                        ${tailColor[bcolor]}
                        text-white` }
                        onClick={handleClick}
                        >
    {caption}
    </button>
      
    
  )
}
