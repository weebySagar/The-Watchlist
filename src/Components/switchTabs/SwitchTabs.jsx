import React, { useState } from 'react';
import "./style.scss";




const SwitchTabs = ({data,onTabChange}) => {
const [left, setLeft] = useState(0);
const [selectedTab, setSelectedTab] = useState(0)    ;



const handleActiveTab=(tab,index)=>{
setLeft(index*100);

setTimeout(() => {
    
    setSelectedTab(index)
}, 300);
onTabChange(tab)
}

  return (
    <div className='switching-tabs'>
        <div className="tab-items">
                {
                    data.map((item,index)=>(
                        <span key={index} 
                        className={`tab-item ${selectedTab===index ? "active" : ""}`}
                        onClick={()=>handleActiveTab(item,index)}
                    >{item}</span>
                    ))
                }
                <span className="moving-bg" style={{left :left}}/>
        </div>
    </div>
  )
}

export default SwitchTabs