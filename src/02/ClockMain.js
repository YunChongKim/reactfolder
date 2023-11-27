import LogoImg from "../01/LogoImg";
import {useState} from "react";

function ClockMain(){
    const [ctime, setCtime] = useState(new Date().toLocaleTimeString());
    //let ctime = new Date().toLocaleTimeString();
    
    //1초에 한 번씩 시간 변경
    setInterval(()=>{
    setCtime(new Date().toLocaleTimeString());
   }, 1000);
   
    return(
        // <div className="App-header">
        <main  className="App-header">
            <LogoImg />
            <div>현재시간 : {ctime} </div>
            </main>
        // </div>
    );
}

export default ClockMain;