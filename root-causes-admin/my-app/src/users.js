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

export function callAssignments() {
  function Users() {
    // const [userList, setUserList]= useState([{}]);
    // const [userObjs, setUserObjs]= useState([]);

    let userList = [{}];

    // GET
    const fetchUserList = async () => {
      const data = await axios.get(`${baseUrl}/callermanagement`);
      userList = data.data.sortedVolunteers;
      // setUserList(userList);
      // console.log("USER LIST: ", data);\
      console.log("USER LIST: ");
      console.log(userList);
      getUserObjs();
    };

    useEffect(() => {
      fetchUserList();
    }, []);

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
{
  /*export const Users=[{
    "key": 1,
    "status": "green",
    "firstName": "Gelya",
    "lastName": "Patman",
    "address": "71 Lyons Junction",
    "email": "gpatman0@globo.com",
    "phoneNumber": "584-350-9281",
    "language": "Tsonga",
    "group": "A."  
  }, {
    "key": 2,
    "status": "green",
    "firstName": "Lin",
    "lastName": "Spehr",
    "address": "33 Nancy Road",
    "email": "lspehr1@google.de",
    "phoneNumber": "360-197-4366",
    "language": "Ykeydish",
    "group": "A."  
  }, {
    "key": 3,
    "status": "green",
    "firstName": "Louis",
    "lastName": "Dudding",
    "address": "623 Ramsey Crossing",
    "email": "ldudding2@cbsnews.com",
    "phoneNumber": "248-870-5482",
    "language": "Nepali",
    "group": "B."  
  }, {
    "key": 4,
    "status": "salmon",
    "firstName": "Enrichetta",
    "lastName": "Donizeau",
    "address": "9834 Rutledge Center",
    "email": "edonizeau3@hostgator.com",
    "phoneNumber": "181-148-8055",
    "language": "Kyrgyz",
    "group": "B."  
  }, {
    "key": 5,
    "status": "tan",
    "firstName": "Sibbie",
    "lastName": "Newe",
    "address": "6400 Hansons Street",
    "email": "snewe4@illinois.edu",
    "phoneNumber": "784-285-7890",
    "language": "Kannada",
    "group": "A."  
  }, {
    "key": 6,
    "status": "green",
    "firstName": "Fabe",
    "lastName": "Westberg",
    "address": "88377 Havey Street",
    "email": "fwestberg5@cyberchimps.com",
    "phoneNumber": "383-277-2219",
    "language": "Greek",
    "group": "A."  
  }, {
    "key": 7,
    "status": "green",
    "firstName": "Sile",
    "lastName": "Gaenor",
    "address": "6268 Magdeline Lane",
    "email": "sgaenor6@pinterest.com",
    "phoneNumber": "336-154-0146",
    "language": "Japanese",
    "group": "B."  
  }, {
    "key": 8,
    "status": "tan",
    "firstName": "Earle",
    "lastName": "Urry",
    "address": "3714 Sunfield Road",
    "email": "eurry7@engadget.com",
    "phoneNumber": "134-862-1216",
    "language": "Guaraní",
    "group": "A."  
  }, {
    "key": 9,
    "status": "tan",
    "firstName": "Giraldo",
    "lastName": "Bartalucci",
    "address": "3 Bashford Drive",
    "email": "gbartalucci8@foxnews.com",
    "phoneNumber": "973-165-3292",
    "language": "Burmese",
    "group": "A."  
  }, {
    "key": 10,
    "status": "green",
    "firstName": "Artemis",
    "lastName": "Richley",
    "address": "0256 Meadow Rkeyge Circle",
    "email": "arichley9@tiny.cc",
    "phoneNumber": "380-609-6400",
    "language": "Korean",
    "group": "B."  
  }, {
    "key": 11,
    "status": "green",
    "firstName": "Desiree",
    "lastName": "Santo",
    "address": "842 Vernon Point",
    "email": "dsantoa@lycos.com",
    "phoneNumber": "625-724-1741",
    "language": "German",
    "group": "A."  
  }, {
    "key": 12,
    "status": "green",
    "firstName": "Skippy",
    "lastName": "Bastkeye",
    "address": "8019 Arkansas Lane",
    "email": "sbastkeyeb@japanpost.jp",
    "phoneNumber": "119-269-5142",
    "language": "Dhivehi",
    "group": "B."  
  }, {
    "key": 13,
    "status": "green",
    "firstName": "Evie",
    "lastName": "Chiverstone",
    "address": "12 Shelley Drive",
    "email": "echiverstonec@statcounter.com",
    "phoneNumber": "713-979-7212",
    "language": "Indonesian",
    "group": "B."  
  }, {
    "key": 14,
    "status": "salmon",
    "firstName": "Sybyl",
    "lastName": "Trenbay",
    "address": "4 Ramsey Pass",
    "email": "strenbayd@alibaba.com",
    "phoneNumber": "298-313-3819",
    "language": "Icelandic",
    "group": "B."  
  }, {
    "key": 15,
    "status": "salmon",
    "firstName": "Mada",
    "lastName": "Cordel",
    "address": "978 Mosinee Pass",
    "email": "mcordele@scientificamerican.com",
    "phoneNumber": "616-949-5343",
    "language": "Lao",
    "group": "B."  
  }, {
    "key": 16,
    "status": "green",
    "firstName": "Adelle",
    "lastName": "Sorrell",
    "address": "9754 Pankratz Junction",
    "email": "asorrellf@bigcartel.com",
    "phoneNumber": "846-577-4500",
    "language": "Guaraní",
    "group": "A."  
  }, {
    "key": 17,
    "status": "tan",
    "firstName": "Belva",
    "lastName": "Gisbey",
    "address": "7 Fremont Center",
    "email": "bgisbeyg@goo.gl",
    "phoneNumber": "231-542-2761",
    "language": "Spanish",
    "group": "A."  
  }, {
    "key": 18,
    "status": "green",
    "firstName": "Byrle",
    "lastName": "Redwood",
    "address": "490 Dapin Point",
    "email": "bredwoodh@unicef.org",
    "phoneNumber": "770-354-8388",
    "language": "French",
    "group": "A." 
  }, {
    "key": 19,
    "status": "green",
    "firstName": "Leif",
    "lastName": "Yeardley",
    "address": "01 Gateway Road",
    "email": "lyeardleyi@economist.com",
    "phoneNumber": "278-228-3548",
    "language": "Haitian Creole",
    "group": "B."
  }, 
  {
    "key": 20,
    "status": "green",
    "firstName": "Putnem",
    "lastName": "Pendred",
    "address": "68 Lukken Junction",
    "email": "ppendredj@wiley.com",
    "phoneNumber": "796-182-8099",
    "language": "Azeri",
    "group": "A."
  }
  ] 
*/
}
