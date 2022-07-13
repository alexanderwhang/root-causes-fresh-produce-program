import React from "react";
import "../pages/Driver.css";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import {useEffect, useState} from 'react';
import axios from "axios"
import { MDBDataTableV5 } from 'mdbreact';

const baseUrl = "http://localhost:5000"

export function NewTable(data) {
    const [participantsList, setParticipantsList] = useState([]);

    // GET
  const fetchParticipants = async () => {
    const data = await axios.get(`${baseUrl}/participants`);
    const { participants } = data.data;
    setParticipantsList(participants);
    console.log("DATA: ", data)
  }

  useEffect(() => {
    fetchParticipants();
  }, [])


    const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Status',
        field: 'status',
        width: 20,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'First Name',
        field: 'firstName',
        width: 270,
      },
      {
        label: 'Last Name',
        field: 'lastName',
        width: 200,
      },
      {
        label: 'Address',
        field: 'address',
        width: 100,
      },
      {
        label: 'Email',
        field: 'email',
        width: 150,
      },
      {
        label: 'Phone Number',
        field: 'phoneNumber',
        width: 100,
      },
      {
        label: 'Language',
        field: 'language',
        width: 100,
      },
      {
        label: 'Group',
        field: 'group',
        width: 100,
      },
    ],
    rows: [
      {
        status:" {data.status}",
        firstName: "{data.firstName}",
        lastName: 'Edinburgh',
        address: '61',
        email: '2011/04/25',
        phoneNumber: '$320',
        language:"",
        group:"",
      }
    ],
  });
    return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />;

}
