import { PracticeUsers } from "./practiceUsers";
export const CreateAssignments=({data})=>{   
    const participantsList=data[data.length-1].items;   
    const copy = data[data.length-1].items; 
    const ret = [];
   //takes participants from the participants list and adds them to a volunteer
    for(let j =0;j<data.length-1;j++){
        let volunteer =data[j];
        for(let i=0;i<participantsList.length;i++){ 
            let participant=participantsList[i];

            if(participant.language===volunteer.lan){ 
                volunteer.items.push(participant);  
                copy.splice(i,1);
            }
        }  
        ret.push(volunteer);
    } 
    //appends and empty participant list to the returned array
    ret.push({index:ret.length+1,title:"Participants",items:copy,lan:null}) 
    return (ret);
} 
    
