import React, {useState, useEffect} from 'react';
import { Button, Page, Navbar, Block, BlockHeader, Toolbar,BlockTitle, List, ListItem, Chip, ListGroup,SwipeoutActions, SwipeoutButton, ListButton, NavRight, Link, Icon, Badge} from 'framework7-react';
import axios from 'axios';

var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const TransportationDetailsPage = (props) => {

  const {transportation, f7route, f7router} = props


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
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20People?view=Full",
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
          console.log("people: ", data.records);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function hasShuttle(passengerId, transportation) {
    let result = false
    if(transportation?.fields?.withShuttle?.includes(passengerId)) {result = true}
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

  function saveShuttle(passengers,car,driver,shuttleId) {
    
    let shuttle = shuttles.filter(s => s.id === shuttleId)[0]
    console.log("shuttle to be saved: ", shuttle)
    let shuttlePassengers = shuttle?.fields["Passengers"] ? shuttle.fields["Passengers"] : []
    console.log("shuttle passengers: ", shuttlePassengers)
    let newPassengers = [...passengers,...shuttlePassengers]
    console.log("new passengers: ", newPassengers)
    
    let data = {"records" : [
      {
        "id": shuttleId,
        "fields": {
          "Passengers": newPassengers,
          "Car": car && [car],
          "Driver": driver && [driver]
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
      .then((response) => {
        console.log("shuttle saved: ",response.data)
        f7router.refreshPage()  
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getDrivers() {
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20People?view=Drivers",
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
          setDrivers(data.records);
          console.log("drivers: ", data.records);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function getCars() {
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20Cars?view=Grid%20view",
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
          setCars(data.records);
          console.log("cars: ", data.records);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  function convertRequestToShuttle(recordId) {
    let data = {"records" : [
      {
        "id": recordId,
        "fields": {
          "Type": "Shuttle"
        }
      }
    ]}
    console.log("will save shuttle data: ", data)

    axios({
      url: "https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20Transportation",
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer keyYNFILTvHzPsq1B'
      },
      data : data
    })
      .then((response) => {
        console.log("shuttle saved: ",response.data)
        f7router.navigate("/")  
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function refreshPage(done) {
    f7router.refreshPage()
    done();
  }

  const [shuttles,setShuttles] = useState([])
  const [passengers,setPassengers] = useState([])
  const [people, setPeople] = useState([])
  const [tempPassagengers, setTempPassengers] = useState([])
  const [cars,setCars] = useState([])
  const [drivers,setDrivers] = useState([])
  const [driver,setDriver] =useState()
  const [tempDriver, setTempDriver] = useState()
  const [car,setCar] =useState()
  const [tempCar, setTempCar] = useState()
 
  useEffect((
  ) => {
    console.log("transportation: ", transportation)
  },[])

  useEffect(() => {
    getCars()
  },[])

  useEffect(() => {
    getDrivers()
  },[])

  useEffect(()=>{
    getPeople()
  },[])

  useEffect(() => {
    transportation?.fields?.Passengers && transportation?.fields?.Passengers.map(passengerId => {
      getPassenger(passengerId)
    })
  },[transportation])

  useEffect(() => {
    transportation?.fields?.Shuttle && transportation?.fields?.Shuttle.map(shuttleId => {
      getShuttle(shuttleId)
    })
  },[transportation])

  useEffect(() => {
    if(transportation.fields.Type === "Shuttle") {
      if(shuttles.length > 0) {
        if(shuttles[0].fields.Car) {
          setCar(shuttles[0].fields.Car[0])
        }
        if(shuttles[0].fields.Driver) {
          setDriver(shuttles[0].fields.Driver[0])
        }
      }
    }
  },[shuttles,setShuttles])

  useEffect(() => {
    console.log("passengers modified: ", passengers)
    // let shuttlePassengers = passengers.filter(passenger => {return(hasShuttle(passenger.id,shuttles))})
    // setWithShuttles(shuttlePassengers)
  },[passengers])

  useEffect(() => {
    console.log("temp passengers modified: ", tempPassagengers)
  },[tempPassagengers])

  useEffect(() => {
    console.log("shuttles modified: ", shuttles)
  },[shuttles])

  useEffect(() => {
    console.log("car modified: ", car)
  },[car,setCar])

  useEffect(() => {
    console.log("driver modified: ", driver)
  },[driver,setDriver])

  return (
    <Page ptr ptrMousewheel={true} onPtrRefresh={refreshPage}>
      <Navbar title={`${transportation?.fields?.Type} details`} backLink="Back" />
      {transportation && ["Arrival", "Departure"].includes(transportation?.fields.Type) && transportation.fields?.withoutShuttle  && < Toolbar bottom>
        <Button onClick={()=>{
          f7router.navigate('/transportation/request/', {
            props: {
              transportation: transportation
            }
          })
        }}>Create a new shuttle for this flight</Button>
      </Toolbar>}
      <BlockHeader >{transportation?.fields.Transportation}</BlockHeader>

      {["Shuttle", "Request"].includes(transportation?.fields?.Type) || <Block>
        <Chip style={{marginRight:"8px" , marginLeft:"8px"}} iconSize="4px" text="Onboard" mediaBgColor="blue" media={transportation?.fields["Passengers"].length} />
        {/* <Chip style={{marginRight:"8px"}} text="With shuttle" mediaBgColor="green" media={String(transportation?.fields["Shuttle passengers count"])} /> */}
        <Chip style={{marginRight:"8px"}} text="With shuttle" mediaBgColor="green" media={String(transportation?.fields.withShuttle ? transportation.fields.withShuttle.length : 0)} />
        {transportation?.fields["Shuttle passengers count"] !== transportation?.fields["Passengers"].length && <Chip style={{marginRight:"8px"}} text="No shuttle" mediaBgColor="red" media={String(transportation?.fields.withoutShuttle ? transportation?.fields.withoutShuttle.length : 0)}/>}      </Block>}
      {/* <BlockTitle>Passenger list</BlockTitle> */}
      
      
      <List mediaList  >
        <ListGroup key="passengersList">
          <ListItem key="title1" title={transportation?.fields.Type === "Shuttle" ? "Shuttle passengers" : "Passengers"} groupTitle></ListItem>

        {/* Passenger list */}

        {passengers.length > 0 && passengers.map((passenger,id) => {
          return (
            <ListItem
              key={id}
              style={{marginBottom:"4px", backgroundBlendMode:true}}
              title={`${passenger.fields["Person"]}`}
              noChevron
              swipeout
            >
              {["Shuttle","Request"].includes(transportation?.fields?.Type) || hasShuttle(passenger.id, transportation) && <Icon slot="media" size="large" material="checkmark_circle_fill" ios="checkmark_circle_fill" f7="checkmark_circle_fill" color="green"></Icon>}
              {["Shuttle","Request"].includes(transportation?.fields?.Type) || hasShuttle(passenger.id, transportation) || <Icon slot="media" size="large" material="exclamationmark_circle_fill" ios="exclamationmark_circle_fill" f7="exclamationmark_circle_fill" color="red"></Icon>}
              <SwipeoutActions right>
                <SwipeoutButton delete confirmText="Are you sure you want to delete this item?">
                  Delete
                </SwipeoutButton> 
              </SwipeoutActions>
            </ListItem>
          )
        })}
        </ListGroup >

        {/* Connected shuttles */}

        {["Shuttle", "Request"].includes(transportation?.fields?.Type) || <ListGroup key="shuttlesList">
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
                    popupCloseLinkText	:"Save",
                    on: {
                      change(ss, value) {
                        console.log("smart select CHANGED: ",value)
                        setTempPassengers(value)
                      },
                      close(ss) {
                        console.log("smart select event: ",ss)
                        console.log("smart select closed value", ss.getValue())
                        console.log("shuttle id: ", shuttle.id)
                        saveShuttle(ss.getValue(),car, driver,shuttle.id)
                      }
                    }
                  }}
                >
                  <select name="person" multiple >
                    {transportation?.fields?.withoutShuttle?.map((person,pid) => {return (<option key={pid} value={person}>{passengers.filter(passenger => passenger.id === person)[0]?.fields?.Name}</option>)})}
                  </select>
                </ListItem>
                {/* {tempPassagengers.length > 0 && <ListButton key="submitButton" onClick={() => saveShuttle(shuttle,tempPassagengers)}>Save changes</ListButton>} */}
              </div>
            )
          })}
          
        </ListGroup>}
        
        {/* Shuttle passengers */}
        
        {transportation?.fields?.Type === "Shuttle" && <ListGroup>
          <ListItem title="Add passengers to shuttle" key="title3" groupTitle></ListItem>
          <ListItem
            // key="smartSelect"
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
                  {people.filter(person => {return(!passengers.map(passenger=>{return(passenger.id)}).includes(person.id))}).map((person,id) => {return (<option key={id} value={person.id}>{person.fields.Name}</option>)})}
              </select>
            </ListItem>
            {tempPassagengers?.length > 0 && 
              <ListButton 
                key="saveButton"
                onClick={() => {
                  saveShuttle(tempPassagengers,car,driver,transportation.fields.Shuttle[0])
                }}>
                Save shuttle details
              </ListButton>
            }
        </ListGroup>}
        
        {/* Shuttle Driver & Car */}
        {transportation.fields.Type === "Shuttle" && <ListGroup>
          <ListItem groupTitle>Car & Driver</ListItem>
          <ListItem
            title="Car"
            smartSelect
            smartSelectParams={{
              openIn: 'popup',
              searchbar: true,
              searchbarPlaceholder: 'Search cars',
              // defaultValue: shuttles.length > 0 && shuttles[0].fields?.Car[0],
              on: {
                change(ss, value) {
                  console.log("smart select CHANGED: ",value)
                  setTempCar(value)
                },
                close(ss) {
                  console.log("smart select event: ",ss)
                  console.log("smart select closed value", ss.getValue())
                }
              }
            }}
            >
              <select name="car" >
                  {cars.map((car,id) => {return (<option key={id} value={car.id}>{car.fields.Car}</option>)})}
              </select>
            </ListItem>
          <ListItem
            title="Driver"
            smartSelect
            smartSelectParams={{
              openIn: 'popup',
              searchbar: true,
              searchbarPlaceholder: 'Search drivers',
              // defaultValue: shuttles.length > 0  && shuttles[0].fields?.Driver[0],
              // defaultValue: "rec6ZzAkwlGcihrPd",
              on: {
                change(ss, value) {
                  console.log("smart select CHANGED: ",value)
                  setTempDriver(value)
                },
                close(ss) {
                  console.log("smart select event: ",ss)
                  console.log("smart select closed value", ss.getValue())
                }
              }
            }}
            >
              <select name="driver" >
                  {drivers.map((driver,id) => {return (<option key={id} value={driver.id}>{driver.fields.Name}</option>)})}
              </select>
            </ListItem>
            {(tempCar || tempDriver ) && <ListButton 
              key="saveButton"
              onClick={() => {
                saveShuttle(tempPassagengers,tempCar,tempDriver,transportation.fields.Shuttle[0])
              }}>
              Save shuttle details
            </ListButton>}
        </ListGroup>}
        
        {transportation.fields.Type === "Shuttle Request" && <ListButton onClick={() => convertRequestToShuttle(transportation.id)}>Approve shuttle request</ListButton>}
      </List>
    </Page>
  );

}
export default TransportationDetailsPage;

