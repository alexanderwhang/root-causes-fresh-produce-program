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

// export function callAssignments() {
//   function Users() {
//     // const [userList, setUserList]= useState([{}]);
//     // const [userObjs, setUserObjs]= useState([]);

//     let userList = [{}];

//     // GET
//     const fetchUserList = async () => {
//       const data = await axios.get(`${baseUrl}/callermanagement`);
//       userList = data.data.sortedVolunteers;
//       // setUserList(userList);
//       // console.log("USER LIST: ", data);\
//       console.log("USER LIST: ");
//       console.log(userList);
//       getUserObjs();
//     };

//     useEffect(() => {
//       fetchUserList();
//     }, []);
//   };
// export function UserIdList() {
//   let userIdList = [{}];

//   // GET
//   const fetchUserIdList = async () => {
//     const data = await axios.get(`${baseUrl}/callermanagement`);
//     userIdList = data.data.sortedVolunteers;
//     // setUserList(userList);
//     // console.log("USER LIST: ", data);\
//     console.log("USER LIST: ");
//     console.log(userIdList);
//     // getUserObjs();
//     return userIdList;
//   };

//   useEffect(() => {
//     fetchUserIdList();
//   }, []);

//   // return userIdList;
// }
export function Users() {
  // const [userList, setUserList]= useState([{}]);
  // const [userObjs, setUserObjs]= useState([]);

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

        if (i == 0) {
          userObjs[0] = { vol: vol, pts: pts };
        } else {
          userObjs.push({ vol: vol, pts: pts });
        }
        // userObjs.push({"vol": vol, "pts": pts});
  let userObjs = [{}];

  const getUserObjs = async () => {
    for (let i = 0; i < userList.length; i++) {
      let volData = await axios.get(`${baseUrl}/volunteers/${userList[i].id}`);
      let vol = volData.data.volunteer;

      let pts = [];
      let ptIds = getArr(userList[i].items);
      for (let j = 0; j < ptIds.length; j++) {
        let ptData = await axios.get(`${baseUrl}/participants/${ptIds[j]}`);
        let pt = ptData.data.participant;
        pts.push(pt);
      }
      console.log("-------------------------");
      console.log("userObjs: ");
      console.log(userObjs);
    };

    const getArr = (str) => {
      let intStr = "";
      let arr = [];
      for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (!(char == " " || char == "," || char == "[" || char == "]")) {
          intStr += char;
        } else if (intStr != "") {
          arr.push(intStr);
          intStr = "";
        }
      if (i == 0) {
        userObjs[0] = { vol: vol, pts: pts };
      } else {
        userObjs.push({ vol: vol, pts: pts });
      }
      return arr;
    };

    const [participantsList, setParticipantsList] = useState([]);
    const [volunteersList, setVolunteersList] = useState([]);

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
    }, []);

    //  USERS 2
    users2[0] = { vol: {}, pts: participantsList };

    volunteersList.map((vol) => {
      return users2.push({ vol: vol, pts: [] });
    });
    console.log(users);
    console.log("users2: ", users2);
    // return (users2);

    // USERS
    //volunteersList.map((vol) => {
    // return (
    //  users.push({index:vol.id,title: vol.first_name, items: [],language:vol.language})
    // );
    //});
    // console.log(users)

    //users.push({index:users.length+1,title: "Participants", items: participantsList,language:null});
    // console.log(users)
    return userObjs;
  }

  let ret = Users();
  //let participantsList= users[users.length-1].items;
  //let [peoples, setPeople] = useState(users);

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
      <DataDragPractice data={users} />
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
};
//   // GET PARTICIPANTS
//   const fetchParticipants = async () => {
//     const data = await axios.get(`${baseUrl}/participants/status/3`);
//     const { participants } = data.data;
//     setParticipantsList(participants);
//     console.log("DATA1: ", data);
//   };

//   // GET VOLUNTEERS
//   const fetchVolunteers = async () => {
//     const data = await axios.get(`${baseUrl}/volunteers/type/Caller`);
//     const { volunteers } = data.data;
//     setVolunteersList(volunteers);
//     console.log("DATA2: ", data);
//   };

//   useEffect(() => {
//     fetchParticipants();
//     fetchVolunteers();
//   }, []);
// }

  //  USERS 2
  // users2[0]=({"vol": {}, "pts": participantsList});

  //  volunteersList.map((vol) => {
  //   return (
  //     users2.push({"vol": vol, "pts": []})
  //   );
  // });
  // console.log(users)
  //   console.log("users2: ", users2)
  // // return (users2);

  // // USERS
  // volunteersList.map((vol) => {
  //   return (
  //     users.push({index:vol.id,title: vol.first_name, items: [],language:vol.language})
  //   );
  // });
  // // console.log(users)

  // users.push({index:users.length+1,title: "Participants", items: participantsList,language:null});
  // console.log(users)
  // return (users)