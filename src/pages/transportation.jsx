import React, {useState, useEffect} from 'react';
import { Page, Navbar,Toolbar, BlockTitle, List, ListItem, Chip, NavRight, Link } from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const TransportationPage = ({ f7router }) => {
  function getTransportation() {
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
          setTransportation(data.records);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  let [transportation, setTransportation] = useState([])
  
  useEffect(() => {
    getTransportation()
  }, []);

  return (
    <Page>
      <Navbar title="Transportation">
        <NavRight>
          <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
        </NavRight>
      </Navbar>
      <Toolbar bottom>
        <Link href="/transportationRequest/">Request transport</Link>
      </Toolbar>
      <List mediaList>
        {transportation.sort((a, b) => (dayjs(a.fields.Time).isAfter(dayjs(b.fields.Time)) ? 1 : -1)).map((item,id) => {
          let formattedTime = dayjs.utc(item.fields.Time).format("D MMM - HH:mm").toString()
          return (
            <ListItem
              key={id}
              link={"/transportation/"+item.id}
              title={`${item.fields["Transportation"]}`}
              after={formattedTime}
              subtitle="Passengers"
            >
                <Chip style={{marginRight:"8px"}} iconSize="4px" text="Onboard" mediaBgColor="blue" media={item.fields["Passengers"].length} />
                <Chip style={{marginRight:"8px"}} text="with shuttle" mediaBgColor="green" media={String(item.fields["Shuttle passengers count"])} />
                <Chip style={{marginRight:"8px"}} text="no shuttle" mediaBgColor="red" media={item.fields["Passengers"].length} />
            </ListItem>
          )
        })}
        
      </List>
    </Page>
  );

  
}
export default TransportationPage;

