import React from "react";
import { useState, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
// import { FooterContainer } from './containers/footer';



export const DragPractice = ({data}) => { 
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

const displayLang = (first, second) => {
    if(first !== "English"){
        return first;
    }
    else if(second !== "English"){
        return second;
    } 
    else{
        return null;
    }
}


return (   
    <div className="caller">  
    <Navbar />  
    <h2>Caller Management</h2>
    <header className="caller-header"> 
    <div className="drag-n-drop"> 
    {list.map((grp,grpI)=>( 
    
    
        <div key={grp.index}  
        className={` ${grp.title==="Participants"? "participants": "dnd-group"} `}
        onDragEnter={dragging && !grp.items.length?(e)=>handleDragEnter(e,{grpI, itemI:0}):null}>   
        <div className="group-title" data-tooltip={grp.title !== "Participants"? `${grp.primaryLan}, ${grp.secondaryLan}`: null}> {grp.title === "Participants" ? `${grp.title}`: `${grp.title} (${displayLang(grp.primaryLan, grp.secondaryLan)})`}
    </div>
    


        {grp.items.map((item,itemI)=>( 
        <div draggable={true}  
            onDragStart={(e)=> {handleDragStart(e,{grpI,itemI})}}   
            onDragEnter ={dragging?(e)=>{handleDragEnter(e,{grpI,itemI})}:null} 
            key={item.id}
            className={dragging?getStyles({grpI,itemI}):"dnd-item"}>    
            
            <ul class="ptInfo"> 
                <li id="ptName">{item.firstName} {item.lastName} </li> 
                <li>{item.email} </li>
                {/* <li>{item.lastName}</li>  */}
                {/* <li>{item.address}</li>  */}
                <li>{item.phoneNumber} </li> 
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