import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, BlockHeader, Toolbar,BlockTitle, List, ListItem, Chip, ListGroup,SwipeoutActions, SwipeoutButton, ListButton, NavRight, Link, Icon, Badge} from 'framework7-react';
import axios from 'axios';

var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const TransportationDetailsPage = ({f7route, f7router}) => {

  function getTransportation(id) {
    fetch(`https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20Transportation/${id}`,
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
      setTransportation(data);
      console.log("retrieved transportation:",data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function getPassenger(personId) {
    fetch(`https://api.airtable.com/v0/appw2hvpKRTQCbB4O/tbllZ7xwJ94GXrVsT/${personId}`,
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
      
      setPassengers(passengers => [...passengers,data])
      
      console.log("retrieved passenger:",data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function getPeople() {
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20People?maxRecords=3&view=Full",
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
          console.log("people: ", people);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function hasShuttle(passengerId, shuttles) {
    let shuttlesIds = shuttles.map(shuttle => shuttle.id)
    console.log("hasShuttles shuttlesIds: ",shuttlesIds)
    let passenger = passengers.filter(passenger => passenger.id === passengerId)[0]
    console.log("hasShuttle passenger: ", passenger)
    let passengerShuttles = passenger?.fields?.Shuttles
    console.log("hasShuttles passengerShuttles: ", passengerShuttles)
    let result = false
    if(passengerShuttles) {
      console.log("matching passenger shuttles")
      result = passenger.fields?.Shuttles.filter(shuttle => shuttlesIds.includes(shuttle)).length > 0 ? true : false
      console.log("hasShuttle result: ", result)
    }
    return result
  }
  
  function getShuttle(id) {
    fetch(`https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20Transportation/${id}`,
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
      setShuttles(shuttles => [...shuttles,data]);
      console.log("retrieved shuttle:",data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function saveShuttle(shuttle,tempPassagengers) {
    console.log("shuttle to be saved: ", shuttle)
    let shuttlePassengers = shuttle.fields["Passengers"]
    console.log("shuttle passengers: ", shuttlePassengers)
    
    let newPassengers = [...tempPassagengers,...shuttlePassengers]
    console.log("new passengers: ", newPassengers)
    
    let data = {records : [
      {
        id: shuttle.id,
        fields: {
          "Passengers": newPassengers
        }
      }
    ]}
    console.log("will save shuttle data: ", data)

    axios({
      // url: "https://api.airtable.com/v0/appw2hvpKRTQCbB4O/tblIudjc2G41JVdQ8",
      url: "https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Booking%3A%20Shuttles",
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer keyYNFILTvHzPsq1B'
      },
      data : data
    })
      // .then((res) => res.json())
      .then((response) => {
        console.log("shuttle saved: ",response.data)
        setPassengers([])
        setShuttles([])
        setTempPassengers([])
        getTransportation(f7route.params.transportationId)  
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let [transportation, setTransportation] = useState()
  let [shuttles,setShuttles] = useState([])
  let [passengers,setPassengers] = useState([])
  let [withShuttles,setWithShuttles] = useState([])
  let [people, setPeople] = useState([])
  let [tempPassagengers, setTempPassengers] = useState([])
  
  useEffect(() => {
    getTransportation(f7route.params.transportationId)
  }, []);

  useEffect(()=>{
    getPeople()
  },[])

  useEffect(() => {
    transportation?.fields.Passengers.map(passengerId => {
      getPassenger(passengerId)
    })
  },[transportation])

  useEffect(() => {
    transportation?.fields?.Shuttle && transportation?.fields?.Shuttle.map(shuttleId => {
      getShuttle(shuttleId)
    })
  },[transportation])

  useEffect(() => {
    console.log("passengers modified: ", passengers)
    let shuttlePassengers = passengers.filter(passenger => {return(hasShuttle(passenger.id,shuttles))})
    setWithShuttles(shuttlePassengers)
  },[passengers])

  useEffect(() => {
    console.log("temp passengers modified: ", tempPassagengers)
  },[tempPassagengers])

  useEffect(() => {
    console.log("shuttles modified: ", shuttles)
  },[shuttles])

  return (
    <Page>
      <Navbar title={`${transportation?.fields.Type} details`} backLink="Back" />
      <Toolbar bottom>
        <Link href="/transportation/request/">Request a new shuttle for this flight</Link>
      </Toolbar>
      <BlockHeader >{transportation?.fields.Transportation}</BlockHeader>
      {["Shuttle","Request"].includes(transportation?.fields.Type) || <Block>
        <Chip style={{marginRight:"8px" , marginLeft:"8px"}} iconSize="4px" text="Onboard" mediaBgColor="blue" media={transportation?.fields["Passengers"].length} />
        {/* <Chip style={{marginRight:"8px"}} text="With shuttle" mediaBgColor="green" media={String(transportation?.fields["Shuttle passengers count"])} /> */}
        <Chip style={{marginRight:"8px"}} text="With shuttle" mediaBgColor="green" media={withShuttles.length} />
        {transportation?.fields["Passengers"].length !== withShuttles.length && <Chip style={{marginRight:"8px"}} text="No shuttle" mediaBgColor="red" media={String(transportation?.fields["Passengers"].length - withShuttles.length)} />}
      </Block>}
      {/* <BlockTitle>Passenger list</BlockTitle> */}
      <List mediaList  >
        <ListGroup key="passengersList">
          <ListItem key="title1" title={transportation?.fields.Type === "Shuttle" ? "Shuttle passengers" : "Flight passengers"} groupTitle></ListItem>
        
        {passengers.map((passenger,id) => {
          return (
            <ListItem
              key={id}
              style={{marginBottom:"4px", backgroundBlendMode:true}}
              title={`${passenger.fields["Person"]}`}
              noChevron
              swipeout
            >
              {["Shuttle","Request"].includes(transportation?.fields.Type) || hasShuttle(passenger.id, shuttles) && <Icon slot="media" size="large" material="checkmark_circle_fill" ios="checkmark_circle_fill" f7="checkmark_circle_fill" color="green"></Icon>}
              {["Shuttle","Request"].includes(transportation?.fields.Type) || hasShuttle(passenger.id, shuttles) || <Icon slot="media" size="large" material="exclamationmark_circle_fill" ios="exclamationmark_circle_fill" f7="exclamationmark_circle_fill" color="red"></Icon>}
              <SwipeoutActions right>
                <SwipeoutButton delete confirmText="Are you sure you want to delete this item?">
                  Delete
                </SwipeoutButton> 
              </SwipeoutActions>
            </ListItem>
          )
        })}
        </ListGroup >
        {["Shuttle"].includes(transportation?.fields.Type) || <ListGroup key="shuttlesList">
          <ListItem title="Connected shuttles" groupTitle></ListItem>
          {shuttles.map((shuttle,id)=> {
            return(
              <div key={id}>
                <ListItem 
                  title={shuttle.fields["Shuttle Booking"]} 
                  subtitle={shuttle.fields["Passenger Names"]} 
                  badge="Add passengers" 
                  badgeColor="blue"
                  smartSelect
                  smartSelectParams={{
                    openIn: 'popup',
                    searchbar: true,
                    searchbarPlaceholder: 'Search people',
                    on: {
                      change(ss, value) {
                        console.log("smart select CHANGED: ",value)
                        setTempPassengers(value)
                      },
                      close(ss) {
                        console.log("smart select event: ",ss)
                        console.log("smart select closed value", ss.getValue())
                      }
                    }
                  }}
                >
                  <select name="person" multiple >
                    {passengers.filter(person => !hasShuttle(person.id,shuttles)).map((person,pid) => {return (<option key={pid} value={person.id}>{person.fields.Name}</option>)})}
                  </select>
                </ListItem>
                {tempPassagengers.length > 0 && <ListButton key="submitButton" onClick={() => saveShuttle(shuttle,tempPassagengers)}>Save changes</ListButton>}
              </div>
            )
          })}
          
        </ListGroup>}
        {transportation?.fields.Type === "Shuttle" && <ListGroup key="shuttlesSS">
          <ListItem title="Add passengers to shuttle" key="title3" groupTitle></ListItem>
          <ListItem
            key="smartSelect"
            title="People list"
            smartSelect
            smartSelectParams={{
              openIn: 'popup',
              searchbar: true,
              searchbarPlaceholder: 'Search people',
              on: {
                change(ss, value) {
                  console.log("smart select CHANGED: ",value)
                  setTempPassengers(value)
                },
                close(ss) {
                  console.log("smart select event: ",ss)
                  console.log("smart select closed value", ss.getValue())
                }
              }
            }}
            >
              <select name="person" multiple>
                  {people.map((person,id) => {return (<option key={id} value={person.id}>{person.fields.Name}</option>)})}
              </select>
            </ListItem>
            {tempPassagengers?.length > 0 && 
              <ListButton 
                key="saveButton"
                onClick={() => {

                }}>
                Save shuttle details
              </ListButton>
            }
        </ListGroup>}
      </List>
    </Page>
  );

}
export default TransportationDetailsPage;

