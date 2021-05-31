import React, {useState, useEffect} from 'react';
import { Page, Navbar, Subnavbar,Searchbar, theme ,Block, BlockTitle, List, ListItem, Chip, Icon, Card, CardContent, CardHeader, Link } from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const PeoplePage = ({ f7router }) => {
  function getPeople() {
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20People?view=Full%20view",
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
          setPeople(data.records);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  let [people, setPeople] = useState([])
  
  useEffect(() => {
    getPeople()
  }, []);

  return (
    <Page>
      <Navbar title="People" backLink="Back" >
        <Subnavbar inner={false}>
          <Searchbar
            searchContainer=".search-list"
            searchIn=".item-title"
            disableButton={!theme.aurora}
          ></Searchbar>
        </Subnavbar>
      </Navbar>
      <List className="searchbar-not-found">
        <ListItem title="Nothing found"></ListItem>
    </List>
      <List mediaList className="search-list searchbar-found">
        {people.sort((a, b) => a.fields["Name"].localeCompare(b.fields["Name"])).map((person,id) => {
          let hasTransportations = true
          let hasShuttles = true
          let hasRoom = true
          let hasActivities = true
          let band = "Band Name"
          return (
            <ListItem
              key={id}
              link={"/people/"+person.id}
              title={`${person.fields["Name"]}`}
              after="After"
              subtitle={band}
            >
                {person.fields["Role"].map((role,id)=> {return(<Chip key={id} style={{marginRight:"8px"}} iconSize="4px" text={role} />)})}
                <Chip style={{marginRight:"8px"}} iconSize="4px" text="2 flights" />
                <Chip style={{marginRight:"8px"}} text="with shuttle" mediaBgColor="green" media="8" />
            </ListItem>
          )
        })}
      </List>
    </Page>
  );

  
}
export default PeoplePage;

