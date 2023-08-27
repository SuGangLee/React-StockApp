import StyleSheet from "styled-components";
import { MdHome, MdStarBorder, MdOutlinePermIdentity } from "react-icons/md";
import { FaClipboardList, FaChartPie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function NavigationBar() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  return (
    <NavContainer>
      <MdHome
        size={35}
        onClick={() => {
          navigate("/");
          setType("home");
        }}
        className={type === "home" ? "border-0 active-color" : "border-0"}
      />
      <MdStarBorder
        size={35}
        onClick={() => {
          navigate("/like");
          setType("star");
        }}
        className={type === "star" ? "border-0 active-color" : "border-0"}
      />
      <FaChartPie size={30} />
      <FaClipboardList
        size={30}
        onClick={() => {
          navigate("/portfolio");
          setType("portfolio");
        }}
        className={type === "portfolio" ? "border-0 active-color" : "border-0"}
      />
      <MdOutlinePermIdentity size={35} />
    </NavContainer>
  );
}

const NavContainer = StyleSheet.div`
    width:100%;
    height:7%;
    position : absolute;
    bottom : 0;
    display:flex;   
    justify-content:space-around;
    align-items:center;
    background-color:white;
    padding:0.5%;
    > *{
        border-radius:30%;
        
        padding:1%;

        
        &:hover {
            background: #2E3032;
            color:white;
            
        }
        &.active-color {
          background: #2E3032;
            color:white;
        }
       

       
    }
`;
export default NavigationBar;
