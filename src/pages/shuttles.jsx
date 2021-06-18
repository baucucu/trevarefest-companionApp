import React, {useState, useEffect} from 'react';
import { Page, Navbar, Toolbar, Link, List, ListItem, Chip } from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const ShuttlesPage = ({ f7router }) => {
  function getShuttles() {
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Booking%3A%20Shuttles",
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
          setShuttles(data.records);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  let [shuttles, setShuttles] = useState([])
  
  useEffect(() => {
    getShuttles()
  }, []);

  return (
    <Page>
      <Navbar title="Shuttles"/>
      <Toolbar bottom>
        <Link href="/shuttles/new">Request a new shuttle</Link>
        <Link href="/passenger/">Book a passenger</Link>
      </Toolbar>
      <List mediaList>
        {shuttles.sort((a, b) => (dayjs(a.fields["Departure Time"]).isAfter(dayjs(b.fields["Departure Time"])) ? 1 : -1)).map((shuttle,id) => {
          let formattedTime = dayjs.utc(shuttle.fields["Departure Time"]).format("D MMM - HH:mm").toString()
          return (
            <ListItem
              key={id}
              link={"/shuttles/"+shuttle.id}
              title={`${shuttle.fields["License #"]}`}
              after={formattedTime}
              subtitle={shuttle.fields["From"]+" to "+shuttle.fields["To"]}
            >
                <Chip style={{marginRight:"8px"}} iconSize="4px" text="Seats" mediaBgColor="blue" media={shuttle.fields["Seats"][0]} />
                <Chip style={{marginRight:"8px"}} text="Booked" mediaBgColor="green" media={String(shuttle.fields["Passengers Count"])} />
                <Chip style={{marginRight:"8px"}} text="Open" mediaBgColor="red" media={shuttle.fields["Open seats"]} />
            </ListItem>
          )
        })}
      </List>
    </Page>
  );

  
}
export default ShuttlesPage;

