import LogoImg from "./LogoImg";
import LogoP from "./LogoP";
import LogoA from "./LogoA";

function LogoHeader(){
  return(
    <header className="App-header">


      <LogoImg></LogoImg>
      <LogoP msg={"부산대학교"}/>
      <LogoP msg={"K-digital"}/>
      <LogoP msg={"5기"}/>
      <LogoA></LogoA>            


    </header>
  );
}
export default LogoHeader;
//임포트 하려면 EXPORT있어야함