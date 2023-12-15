
export default function TailCard({imgSrc, title, subtitle, tags}) {
  return (
    <div className=" border border-solid ">
      <div className="w-49">
        <img src={imgSrc} alt = {title}/>

      </div>
      <div className="text-sky-900 text-2xl font-bold">
        {title}
      </div>
      
      <div>
        {subtitle}
      </div>
      
      <div>
        {tags}
      </div>
    </div>
  )
}
