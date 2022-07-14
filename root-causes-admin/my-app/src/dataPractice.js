
import React from "react";
import { useState, useRef } from "react";
import Navbar from "./components/Navbar/Navbar"; 
import { Users } from "./users";
// import { FooterContainer } from './containers/footer';



export const DataDragPractice = ({data}) => { 
    const [list,setList] =useState(data);   
    const [dragging,setDragging] =useState(false); 
    const dragItem =useRef(); 
    const dragNode= useRef();  



const handleDragStart=(e,params) => {   
    console.log("drag starting...",params)  
    dragItem.current =params;   
    dragNode.current =e.target;  
    dragNode.current.addEventListener('dragend',handleDragEnd); 
    setTimeout(()=>{  
    setDragging(true); 
    },0)
}    

//you have to index into volnteers
//items =pts
const handleDragEnter=(e,params)=>{  
    console.log('Entering drag...',params);  
    const currentItem =dragItem.current; 
    if(e.target!==dragNode.current){  
        console.log("TARGET IS NOT THE SAME")  
        setList(  
            oldList => { 
                let newList =JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemI,0,newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0]) 
                dragItem.current= params; 
                return newList 
            }  
        ) 
    } 
} 


const handleDragEnd=()=>{  
    console.log("Ending drag...")   
    setDragging(false);   
    dragNode.current.removeEventListener('dragend',handleDragEnd); 
    dragItem.current =null;   
    dragNode.current =null;   
} 


const getStyles=(params)=>{  
    const currentItem = dragItem.current; 
    if(currentItem.grpI===params.grpI && currentItem.itemI===params.itemI ){  
        return 'current dnd-item'; 
    }  
    return 'dnd-item' 
}  
console.log("!!!!!!!!")
console.log(data)

return (   
    <div className="caller">  
    <Navbar />  
    <h2>Caller Management</h2>
    <header className="caller-header"> 
    <div className="drag-n-drop">  
    {list.map((grp,grpI)=>(  
       
    
    
        <div key={grp.vol.id}  
        className={` ${grp.vol.first_name==="Participants"? "participants": "dnd-group"} `}
        onDragEnter={dragging && !grp.pts.length?(e)=>handleDragEnter(e,{grpI, itemI:0}):null}>   
        <div className="group-title">{grp.vol.first_name}   
    </div>
    


        {grp.pts.map((item,itemI)=>( 
        <div draggable={true}  
            onDragStart={(e)=> {handleDragStart(e,{grpI,itemI})}}   
            onDragEnter ={dragging?(e)=>{handleDragEnter(e,{grpI,itemI})}:null} 
            key={item.id}
            className={dragging?getStyles({grpI,itemI}):"dnd-item"}>    
            
            <ul className="ptInfo"> 
                <li id="ptName">{item.first_name} {item.last_name} </li> 
                <li>{item.email} </li>
                {/* <li>{item.lastName}</li>  */}
                {/* <li>{item.address}</li>  */}
                <li>{item.phone} </li> 
                {/* <li>{item.email}</li>  */}
                <li>{item.language} </li> 
                {/* <li>{item.status}</li> */}
            </ul> 
        </div>
        ))}  
        </div>   

    ))}  
    </div>    
    </header>    
    </div>   
    );  
}; 