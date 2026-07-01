import { useState } from 'react'
import logo from "./assets/logo.png";
import { LockKeyholeOpen } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import './App.css'

function App() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [selectedPlanB,setselectedPlanB] = useState("one")


  return (
    <>
      <div className='backg'>
        <div className='backg-inside'>
          <img className="logo" src={logo} alt="" />
          <h2>Upgrade to Plus</h2>
          <div>Upgrade today and take your Al-powered productivity to the next level.</div>
          <div className='grey'>Billed to</div>
          <input type='text' placeholder='Enter first & last name' className='input'></input>
          <div className='grey'>Payment Details</div>
          <div className='container'>
            <div 
            className={`small-box ${selectedPlanB === "one" ? "active" : ""}`}
            onClick={()=>setselectedPlanB("one")}
            ><span className='small-box-symbol'>✾</span><span className='small-box-text'>Credit Card</span></div>
            <div
            className={`small-box ${selectedPlanB === "two" ? "active" : ""}`}
            onClick={()=>setselectedPlanB("two")}
            ><span className='small-box-symbol'>❧</span><span className='small-box-text'>Bank transfer</span></div>
            <div
              className={`small-box ${selectedPlanB === "three" ? "active" : ""}`}
              onClick={()=>setselectedPlanB("three")}
            ><span className='small-box-symbol'>✧</span><span className='small-box-text'>Points</span></div>
          </div>
          <div className='grey'>Email Address</div>
          <input type='text' placeholder='Enter email address' className='input'></input>
          <div className='grey'>Country<span style={{marginLeft:"225px"}}>Postal Code</span></div>
          <div className="row">
            <button className='button-two-1'>Finland<ChevronDown style={{marginLeft:"112px"}} /></button>
            <input type='text' placeholder='00270' className='input-two-2'></input>
          </div>
          <div className='row-2'>
            <button className='btn-1'>Cancel</button>
            <button className='btn-2'>Subscribe</button>
          </div>
          <div className='backg-inside-right'>
            <div className='black'>Starter Plan</div>
            <div
            className={`Pay-box ${selectedPlan === "monthly" ? "active" : ""}`}
            onClick={() => setSelectedPlan("monthly")}
            >
              <span className='circle'>{selectedPlan === "monthly" ? "◉" : "○"}</span>
              <span className='Pay-box-text'>
                <span className='Pay-box-texttitle'>Pay monthly</span>
                <span className='Pay-box-textprice'>$20 / Month / Member</span>
              </span>
            </div>
            <div
            className={`Pay-box ${selectedPlan === "yearly" ? "active" : ""}`}
            onClick={() => setSelectedPlan("yearly")}
            >
              <span className='circle'>{selectedPlan === "yearly" ? "◉" : "○"}</span>
              <span className='Pay-box-text'>
                <span className='Pay-box-texttitle'>Poy monthly</span>
                <span className='Pay-box-textprice'>$16 / Month / Member</span>
              </span>
            </div>
            <hr className="divider" />
            <div className='black-2'>Total</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop:"10px"}}>
              <LockKeyholeOpen color="#767676" size={24}  />
              <span style={{position: "relative",top: "4px",color:"rgb(118, 118, 118)",fontSize:"12px"}}>
                This environment is for demonstration purposes only. Please refrain from entering any actual sensitive data.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
