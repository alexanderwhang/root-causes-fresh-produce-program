import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Button, cardClasses } from "@mui/material";
import { DataDragPractice } from "./dataPractice";
import { FooterContainer } from "./containers/footer";
import Button from "@mui/material/Button";

const baseUrl = "http://127.0.0.1:5000";
let users = [];
let users2 = [];

export const CallAssignments = () => {
  // let userList = [{}];
  function Users() {
    const [userList, setUserList] = useState([]);
    const [participantsList, setParticipantsList] = useState([]);
    const [volunteersList, setVolunteersList] = useState([]);

    // GET
    const fetchUserList = async () => {
      const data = await axios.get(`${baseUrl}/callermanagement`);
      const list = data.data.sortedVolunteers;
      setUserList(list);
      // setUserList(userList);
      // console.log("USER LIST: ", data);\
      console.log("USER LIST: ");
      console.log(list);
      // getUserObjs();
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

    console.log("output for userList");
    console.log(userList);
    let userObjs = [{}];

    const getUserObjs = async () => {
      for (let i = 0; i < userList.length; i++) {
        let volData = await axios.get(
          `${baseUrl}/volunteers/${userList[i].id}`
        );
        let vol = volData.data.volunteer;

        let pts = [];
        let ptIds = getArr(userList[i].items);
        for (let j = 0; j < ptIds.length; j++) {
          let ptData = await axios.get(`${baseUrl}/participants/${ptIds[j]}`);
          let pt = ptData.data.participant;
          pts.push(pt);
        }

        if (i === 0) {
          userObjs[0] = { vol: vol, pts: pts };
        } else {
          userObjs.push({ vol: vol, pts: pts });
        }
      }
    };

    // userObjs.push({"vol": vol, "pts": pts});
    const getArr = (str) => {
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
        return arr;
      }
    };
    // users2[0] = { vol: {}, pts: participantsList };

    // volunteersList.map((vol) => {
    //   return users2.push({ vol: vol, pts: [] });
    // });
    // console.log("users: ", users);
    // console.log("users2: ", users2);
    console.log("userObjs: ", userObjs);

    // return userObjs;
    return userList;
  }
  let ret = Users();
  const handleConfirmAssignments = async (e) => {
    // for (let i = 0; i < userIdList.length; i++) {
    //   const data = userIdList[0];
    //   console.log("confirm assignments");
    //   console.log("userIdList: ", userIdList);
    //   console.log("data: ", data);
    //   const response = await axios.post(`${baseUrl}/callassignment`, data);
    // }
  };

  return (
    <div>
      {/* <DataDragPractice data={ret} />
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
      <FooterContainer /> */}
    </div>
  );
};
