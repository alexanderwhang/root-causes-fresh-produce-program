const CreateAssignment = () => {
  let DistributedUsers = [];
  //Splits the participants into chunks for volunteers
  function splitParticipants(data, chunkSize) {
    let ret = [];
    for (let i = 0; i < data.length; i += chunkSize) { 
      if(data==undefined){ 
        ret.push([])
      } 
      else{
      const chunk = data.slice(i, i + chunkSize); 
      ret.push(chunk); 
      }
    } 
    
    return ret;
  }

  //gets and stores the languages of the volunteers
  function volunteersToLanguages(data) {
    var languagesSpoken = new Map();
    const participants = data[data.length - 1].items;

    //set the map
    for (let i = 0; i < participants.length; i++) {
      let participant = participants[i];
      languagesSpoken.set(participant.language, []);
    }
    for (let j = 0; j < data.length - 1; j++) {
      let volunteer = data[j];

      for (const [key, value] of languagesSpoken.entries()) {
        if (key === volunteer.language) {
          value.push(volunteer);
        }
      }
    }
    return languagesSpoken;
    //return languagesSpoken;
  }

  //gets and stores the languages of the volunteers
  function participantToLanguages(data) {
    var languagesSpoken = new Map();
    for (let i = 0; i < data.length; i++) {
      let participant = data[i];
      if (languagesSpoken.has(participant.language)) {
        languagesSpoken.get(participant.language).push(data[i]);
      } else {
        languagesSpoken.set(participant.language, []);
        languagesSpoken.get(participant.language).push(participant);
      }
    }
    return languagesSpoken;
  }

  //assigns the participants to the volunteers
  //the function assumes that the part.lan ===vol.lang
  function partToVol(volunteers, participants) {
    //ret
    let ret = [];
    //break up the participants into chunks
    const participantChunks = splitParticipants(
      participants,
      Math.ceil(participants.length /volunteers.length)
    );
    //iterate through each volunteer based on language
    //set each volunteer to a chunks
    for (let i = 0; i < volunteers.length; i++) {
      let volunteer = volunteers[i]; 
      volunteer.items = participantChunks[i];
      ret.push(volunteer);
    }
    return ret;
  }
  //if no volunteer speaks the languages put in participants
  //if the algorithm will catch the 1 case
  /*if multiple volunteers speak the same language as participants then distribute amongst the volunteers
  then throw them in to the final array*/
  function matchVolstoParts(part, vol) {
    //creat the participants list object
    let ret = [];
    let Participants = {
      index: null,
      title: "pts",
      items: [],
      language: null

    };
    let languages = vol.keys();
    for (const key of languages) {
      if (volunteers.get(key).length === 0) {
        let temp = participants.get(key);
        for (let j = 0; j < temp.length; j++) {
          let participant = temp[j];
          Participants.items.push(participant);
        }
      } else {
        //returns all the volunteers
        let temp = partToVol(volunteers.get(key), participants.get(key));
        

        for (let i = 0; i < temp.length; i++) { 
          ret.push(temp[i]);
        }
      }
    }
    Participants.index = ret.length + 1; 
    for(let i =0;i<ret.length;i++){ 
        let volunteer=ret[i]; 
        if(volunteer.items===null){  
          volunteer.items =[]; 
        }
    }
    ret.push(Participants);
    for (let k = 0; k < ret.length; k++) {
      let person = ret[k];
      person.index = k + 1;
    }

    return ret;
  }

  let participants = participantToLanguages(participantsList);
  let volunteers = volunteersToLanguages(users);

  DistributedUsers = matchVolstoParts(participants, volunteers);  
 
  setPeople(DistributedUsers);  
  peoples = DistributedUsers; 
  console.log(peoples)
}; 
  
 