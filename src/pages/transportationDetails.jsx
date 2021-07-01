import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, BlockHeader, BlockTitle, List, ListItem, Chip, ListGroup,Icon, Card, CardContent, CardHeader, Link, f7route, f7router, f7, f7ready, ListButton} from 'framework7-react';

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

  

  function getPassengers(personId) {
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
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/tbllZ7xwJ94GXrVsT",
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

  let [transportation, setTransportation] = useState()
  let [passengers,setPassengers] = useState([])
  let [people, setPeople] = useState([])
  
  useEffect(() => {
    getTransportation(f7route.params.transportationId)
  }, []);

  useEffect(()=>{
    getPeople()
  },[])

  useEffect(() => {
    transportation?.fields.Passengers.map(passengerId => {
      getPassengers(passengerId)
    })
  },[transportation])

  useEffect(() => {
    console.log("passengers modified: ", passengers.length)
  },[passengers])

  return (
    <Page>
      <Navbar title={`${transportation?.fields.Type} details`} backLink="Back" />
      <BlockHeader >{transportation?.fields.Transportation}</BlockHeader>
      <Block>
        <Chip style={{marginRight:"8px" , marginLeft:"8px"}} iconSize="4px" text="Onboard" mediaBgColor="blue" media={transportation?.fields["Passengers"].length} />
        <Chip style={{marginRight:"8px"}} text="With shuttle" mediaBgColor="green" media={String(transportation?.fields["Shuttle passengers count"])} />
        <Chip style={{marginRight:"8px"}} text="No shuttle" mediaBgColor="red" media={transportation?.fields["Passengers"].length} />
      </Block>
      <BlockTitle>Passenger list</BlockTitle>
      <List mediaList  >
        <ListGroup>
          <ListItem title="Shuttle passengers" groupTitle></ListItem>
        </ListGroup>
        {passengers.map((passenger,id) => {
          return (
            <ListItem
              key={id}
              style={{marginBottom:"4px", backgroundBlendMode:true}}
              title={`${passenger.fields["Person"]}`}
              noChevron
            >


            </ListItem>
          )
        })}
        <ListGroup>
          <ListItem title="Add passengers to shuttle" groupTitle></ListItem>
          <ListItem
            title="People list"
            smartSelect
            smartSelectParams={{
              openIn: 'popup',
              searchbar: true,
              searchbarPlaceholder: 'Search people',
              on: {
                change(ss, value) {
                  // console.log("smart select value: ",value)
                  let tempRequest = request
                  tempRequest["Passengers"] = value
                  // setRequest(tempRequest)
                  // console.log("updated request: ", request)
                }
              }
            }}
            >
              <select name="person" multiple>
                {/* <optgroup label="Flight: XYZ987 (17:35)"> */}
                  {people.map((person,id) => {return (<option key={id} value={person.id}>{person.fields.Name}</option>)})}
                {/* </optgroup> */}
              </select>
            </ListItem>
        </ListGroup>
        
      </List>  
      
    </Page>
  );

}
export default TransportationDetailsPage;

