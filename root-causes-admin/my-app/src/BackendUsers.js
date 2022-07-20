import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Button, cardClasses } from "@mui/material";
import { DataDragPractice } from "./dataPractice";
import { FooterContainer } from "./containers/footer";
import Button from "@mui/material/Button";
import Navbar from "./components/Navbar/Navbar";

const baseUrl = "http://127.0.0.1:5000";
let users = [];
let users2 = [];
// let userList = [];

export const CallAssignments = () => {
  // let userList = [{}];

  const [userList, setUserList] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);
  const [volunteersList, setVolunteersList] = useState([]);
  const [userObjSet, setUserObjSet] = useState(false);
  // let userObjSet = false;

  // GET
  const fetchUserList = async () => {
    const data = await axios.get(`${baseUrl}/callermanagement`);
    const userList = data.data.sortedVolunteers;
    // setUserList(list);
    // setUserList(userList);
    // console.log("USER LIST: ", data);\
    console.log("USER LIST: ");
    console.log(userList);
    getUserObjs(userList);
  };

  // GET PARTICIPANTS
  const fetchParticipants = async () => {
    const data = await axios.get(`${baseUrl}/participants/status/3`);
    const { participants } = data.data;
    setParticipantsList(participants);
    console.log("DATA1: ", data);
  };

  // GET VOLUNTEERS
  const fetchVolunteers = async () => {
    const data = await axios.get(`${baseUrl}/volunteers/type/Caller`);
    const { volunteers } = data.data;
    setVolunteersList(volunteers);
    console.log("DATA2: ", data);
  };

  useEffect(() => {
    fetchParticipants();
    fetchVolunteers();
    fetchUserList();
  }, []);

  // console.log("output for userList");
  // console.log(userList);
  let userObjs = [{}];

  const getUserObjs = async (userList) => {
    console.log("getting user objs...");
    console.log("userList: ", userList);
    for (let i = 0; i < userList.length; i++) {
      console.log("i: ", i);
      let volData = await axios.get(`${baseUrl}/volunteers/${userList[i].id}`);
      let vol = volData.data.volunteer;

      let pts = [];
      let ptIds = getArr(userList[i].items);
      console.log("userList[i].items: ", userList[i].items);
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

    setUserObjSet(true);
    console.log("userObjSet:", userObjSet);
  };

  // userObjs.push({"vol": vol, "pts": pts});
  const getArr = (str) => {
    // if(str.length<3) {
    //   return [];
    // }
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
  // users2[0] = { vol: {}, pts: participantsList };

  // volunteersList.map((vol) => {
  //   return users2.push({ vol: vol, pts: [] });
  // });
  // console.log("users: ", users);
  // console.log("users2: ", users2);
  // console.log("userObjs: ", userObjs);

  // return userList;

  const handleConfirmAssignments = async (e) => {
    // for (let i = 0; i < userIdList.length; i++) {
    //   const data = userIdList[0];
    //   console.log("confirm assignments");
    //   console.log("userIdList: ", userIdList);
    //   console.log("data: ", data);
    //   const response = await axios.post(`${baseUrl}/callassignment`, data);
    // }
  };

  const [list, setList] = useState(userObjs);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
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
    console.log("Entering drag...", params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("TARGET IS NOT THE SAME"); 
      setList((oldList) => {  
        console.log("________")
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
    console.log("Ending drag...");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params) => {
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

   if (userObjSet) {
    console.log("userObjSet: ", userObjSet);
    return (
      <div>
        <Navbar />
        <div className="caller">
          <h2>Caller Management</h2>
          <header className="caller-header">
            <div className="drag-n-drop">
              {list.map((grp, grpI) => (
                <div
                  key={grp.vol.id}
                  className={
                    ` ${grp.vol.first_name} ` === "Participants"
                      ? "participants"
                      : "dnd-group"
                  }
                  onDragEnter={
                    dragging && !grp.pts.length
                      ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                      : null
                  }
                >
                  <div className="group-title">{grp.vol.first_name}</div>

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
                        <li>{item.email} </li>
                        <li>{item.last_name}</li> 
                        <li>{item.address}</li> 
                        <li>{item.phone} </li>
                        <li>{item.email}</li> 
                        <li>{item.language} </li>
                        <li>{item.status}</li>
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
            <Button variant="contained">Generate Assignments</Button>
            <Button
              color="success"
              variant="contained"
              onClick={handleConfirmAssignments}
            >
              Confirm Assignments{" "}
            </Button>
          </div>
        </section>
        <FooterContainer />
      </div>
    );
  } else {
    console.log("userObjSet: ", userObjSet);
  }
};
