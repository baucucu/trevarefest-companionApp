import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, BlockTitle, List, ListItem, Chip, Icon, Card, CardContent, CardHeader, Link } from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const FlightsPage = ({ f7router }) => {
  function getFlights() {
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/tbleaxo1OqwVqJwBk",
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer keyYNFILTvHzPsq1B'
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setFlights(data.records);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  let [flights, setFlights] = useState([])
  
  useEffect(() => {
    getFlights()
  }, []);

  return (
    <Page>
      <Navbar title="Flights"/>
      <BlockTitle>Arivals</BlockTitle>
      <List mediaList>
        {flights.sort((a, b) => (dayjs(a.fields.Time).isAfter(dayjs(b.fields.Time)) ? 1 : -1)).filter(flight => flight.fields["Type"] === "Arrival").map((flight,id) => {
          let formattedTime = dayjs.utc(flight.fields.Time).format("D MMM - HH:mm").toString()
          return (
            <ListItem
              key={id}
              link={"/flights/"+flight.id}
              title={`${flight.fields["Flight #"]}`}
              after={formattedTime}
              subtitle="Passengers"
            >
                <Chip style={{marginRight:"8px"}} iconSize="4px" text="Onboard" mediaBgColor="blue" media={flight.fields["Passengers"].length} />
                <Chip style={{marginRight:"8px"}} text="with shuttle" mediaBgColor="green" media={String(flight.fields["Shuttle passengers count"])} />
                <Chip style={{marginRight:"8px"}} text="no shuttle" mediaBgColor="red" media={flight.fields["Passengers"].length} />
            </ListItem>
          )
        })}
        
      </List>
      <BlockTitle>Departures</BlockTitle>
      <List mediaList>
        {flights.sort((a, b) => (dayjs(a.fields.Time).isAfter(dayjs(b.fields.Time)) ? 1 : -1)).filter(flight => flight.fields["Type"] === "Departure").map((flight,id) => {
          let time = new Date(flight.fields.Time).toLocaleString()
          let formattedTime = dayjs.utc(flight.fields.Time).format("D MMM - HH:mm").toString()
          return (
            <ListItem
              key={id}
              link={"/flights/"+flight.id}
              title={`${flight.fields["Flight #"]}`}
              after={formattedTime}
              subtitle="Passengers"
            >
                <Chip style={{marginRight:"8px"}} iconSize="4px" text="Onboard" mediaBgColor="blue" media={flight.fields["Passengers"].length} />
                <Chip style={{marginRight:"8px"}} text="with shuttle" mediaBgColor="green" media={String(flight.fields["Shuttle passengers count"])} />
                <Chip style={{marginRight:"8px"}} text="no shuttle" mediaBgColor="red" media={flight.fields["Passengers"].length} />
            </ListItem>
          )
        })}
        
      </List>
    </Page>
  );

  
}
export default FlightsPage;

