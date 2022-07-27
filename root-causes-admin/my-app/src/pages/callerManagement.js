import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Button, cardClasses } from "@mui/material";
// import { DataDragPractice } from "./dataPractice";
import { FooterContainer } from "../containers/footer";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar/Navbar";

const baseUrl = "http://127.0.0.1:5000";
// let users = [];
// let users2 = [];
let userObjs = [{}];
let userIdList = [];
let unsortedUserObjs = [];
let volunteersList = [{}];
let participantsList = [{}];

export const CallAssignments = () => { 
  //This react hook is responsible for grabbing data from the backend, creating and adding the data to the drag and drop area, and then returning everything in the caller page
  // let userList = [{}];

  //   const [userList, setUserList] = useState([]);
  //   const [participantsList, setParticipantsList] = useState([{}]);
  //   const [volunteersList, setVolunteersList] = useState([{}]);
  const [listDefined, setListDefined] = useState(false);
  const [assignmentsGenerated, setAssignmentsGenerated] = useState(false);
  const [list, setList] = useState(unsortedUserObjs);
  const [dragging, setDragging] = useState(false);
  const [confirmed, setConfirmed] = useState(false)
  const dragItem = useRef();
  const dragNode = useRef();

  // GET
  const fetchUserList = async () => { 
    const data = await axios.get(`${baseUrl}/callermanagement`);
    userIdList = data.data.sortedVolunteers;
    // setUserList(list);
    // setUserList(userList);
    // console.log("USER LIST: ", data);\
    console.log("USER ID LIST: ");
    console.log(userIdList);
    // getUserObjs(userList);
  };

  // GET PARTICIPANTS
  const fetchParticipants = async () => { 
    //This react hook is responsible for grabing a participants list with a status of needing to be called.
    const data = await axios.get(`${baseUrl}/participants/status/3`);
    const { participants } = data.data;
    // setParticipantsList(participants);
    // console.log("DATA1: ", data);
    participantsList = data.data.participants;
    console.log("participantsList: ", participantsList);

    getInitUserList();
  };

  // GET VOLUNTEERS
  const fetchVolunteers = async () => {
    // This react hook grabs from the backend a list of volunteers who are responsible for calling participants
    const data = await axios.get(`${baseUrl}/volunteers/type/Caller`);
    const volunteers = data.data.volunteers;
    // setVolunteersList(data.data.volunteers);
    // console.log("DATA2: ", data);
    // console.log("data.data.volunteers: ", data.data.volunteers);
    volunteersList = data.data.volunteers;
    console.log("volunteersList: ", volunteersList);

    getInitUserList();
  };

  useEffect(() => { 
    //This allows for each of these react hooks to be called once
    fetchParticipants();
    fetchVolunteers();
    fetchUserList();
  }, []);

  // console.log("output for userList");
  // console.log(userList);

  const getInitUserList = () => { 
    // This react hook is responsible for taking the user objects and formatting them into a manner that javascript can understand
    // This formatting is also what allows for the  objects to work with the drag and drop
    console.log("getInitUserList");
    console.log("volunteersList.length: ", volunteersList.length);
    console.log("participantsList.length: ", participantsList.length);

    if (volunteersList.length > 1 && participantsList.length > 1) {
      console.log("passed if statement");

      let i = 0;
      volunteersList.map((vol) => {
        unsortedUserObjs[i] = { vol: vol, pts: [] };
        setList(unsortedUserObjs);
        i++;
      });
      unsortedUserObjs.push({
        vol: { first_name: "Participants" },
        pts: participantsList,
      });

      setListDefined(true);
    }
    console.log("unsortedUserObjs: ", unsortedUserObjs);
  };

  const getUserObjs = async (userIdList) => {  
    //gets the userObjects from the backend and then formats the objects 
    setListDefined(false);

    console.log("getting user objs...");
    console.log("userIdList: ", userIdList);
    for (let i = 0; i < userIdList.length; i++) {
      console.log("i: ", i);
      let volData = await axios.get(
        `${baseUrl}/volunteers/${userIdList[i].id}`
      );
      let vol = volData.data.volunteer;
      //   console.log("volData : ", volData);

      let pts = [];
      let ptIds = getArr(userIdList[i].items);
      console.log("userIdList[i].items: ", userIdList[i].items);
      console.log("ptIds: ", ptIds);
      for (let j = 0; j < ptIds.length; j++) {
        let ptData = await axios.get(`${baseUrl}/participants/${ptIds[j]}`);
        let pt = ptData.data.participant;
        console.log("ptData: ", ptData);
        pts.push(pt);
      }

      if (i === 0) {
        userObjs[0] = { vol: vol, pts: pts };
      } else {
        userObjs.push({ vol: vol, pts: pts });
      }
    }
    console.log("USER OBJS: ", userObjs);
    setList(userObjs);
    console.log("LIST: ", list);

    setListDefined(true);
    console.log("listDefined: ", listDefined);
  };

  // userObjs.push({"vol": vol, "pts": pts});
  const getArr = (str) => {
    // if(str.length<3) {
    //   return [];
    // } 
    // This code takes an array, casted as an string, and turns it back into an array while keeping allow the arrays elements intact
    let intStr = "";
    let arr = [];
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (!(char === " " || char === "," || char === "[" || char === "]")) {
        intStr += char;
      } else if (intStr !== "") {
        arr.push(intStr);
        intStr = "";
      }
    }
    return arr;
  };

  // return userList;

  const handleGenerateAssignments = () => { 
    // This grabs the sorted volunteers with each volunteer being pared with participants who speak the same language 
    // The paring is done equitably such that each volunteer gets an equal number of participants
    getUserObjs(userIdList);
  };
  const handleConfirmAssignments = async (e) => {
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      console.log("confirm assignments");
      console.log("list: ", list);
      console.log("data: ", data);
      const response = await axios.post(`${baseUrl}/callassignment`, data);
      console.log("response: ", response);
      setConfirmed(true);
    }
  };

  const handleDragStart = (e, params) => { 
    //This code allows for the current item to be dragged 
    // using an event listener, the code checks to see whether you are still dragging the item
    console.log("drag starting...", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  //you have to index into volnteers
  //items =pts
  const handleDragEnter = (e, params) => { 
    //This code is responsible for allowing for what happens when you want to drag into another group 
    // Once you have dragged into another group, the list that was input is then updated 
    console.log("Entering drag...", params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("TARGET IS NOT THE SAME");
      setList((oldList) => {
        console.log("________");
        console.log(oldList);

        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].pts.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].pts.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const handleDragEnd = () => { 
    // This react hook deals with resetting the event handler and then ending the drag and drop
    console.log("Ending drag...");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params) => { 
    //this line of code is responsible for the styling of the item background of the item once the item is being dragged
    //it creates the appearance of an item being removed from the group
    const currentItem = dragItem.current;
    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };
  // console.log("list: ", list);

  if (listDefined) {
    console.log("listDefined: ", listDefined);
    console.log("User objs: ", userObjs);
    console.log("List: ", list);

    //This part of the app renders the caller page 
    // using the data inputed from the backend, each object in the array of objects is the group(grp) 
    //the items inside the object.pts is are the items 
    //
    return (
      <div>
        <Navbar />
        <div className="callerManagement">
          <div className="caller">
            <h2>Caller Management</h2>
            <header className="caller-header">
              <div className="drag-n-drop">
                {list.map((grp, grpI) => (
                  <div
                    key={grp.vol.id}
                    className={
                      `${grp.vol.first_name}` == "Participants"
                        ? "participants"
                        : "dnd-group"
                    }
                    id={
                      `${grp.pts.length}` < 1
                        ? "pre-click-grps"
                        : "post-click-grps"
                    }
                    onDragEnter={
                      dragging && !grp.pts.length
                        ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                        : null
                    }
                  >
                    <div className="group-title">{grp.vol.first_name === "Participants"? `${grp.vol.first_name}` : `${grp.vol.first_name} ${grp.vol.last_name} (${grp.vol.language})`}</div>

                    {grp.pts.map((item, itemI) => (
                      <div
                        draggable={true}
                        onDragStart={(e) => {
                          handleDragStart(e, { grpI, itemI });
                        }}
                        onDragEnter={
                          dragging
                            ? (e) => {
                                handleDragEnter(e, { grpI, itemI });
                              }
                            : null
                        }
                        key={item.id}
                        className={
                          dragging ? getStyles({ grpI, itemI }) : "dnd-item"
                        }
                      >
                        <ul className="ptInfo">
                          <li id="ptName">
                            {item.first_name} {item.last_name}{" "}
                          </li>
                          <li>{item.address}</li>
                          <li>{item.phone} </li>
                          <li>{item.language} </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </header>
          </div>
          {/* buttons */}
          <section id="call_assign">
            <div className="call_buttons">
              <Button
                variant="contained"
                onClick={handleGenerateAssignments}
                className="callerButton"
              >
                Generate Assignments
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={handleConfirmAssignments}
                className="callerButton"
              >
                Confirm Assignments{" "}
              </Button>
              <h4 hidden={!confirmed}>Call Assignments Posted!</h4>
            </div>
          </section>
        </div>
        <FooterContainer />
      </div>
    );
  } else {
    console.log("listDefined: ", listDefined);
    console.log("User objs: ", userObjs);
    console.log("List: ", list);
  }
};
