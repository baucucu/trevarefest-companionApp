import React, {useState, useEffect} from 'react';
import { Page, Navbar,Button, ListGroup, List, ListItem,ListInput, f7, f7ready} from 'framework7-react';
import axios from 'axios';

var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(utc)
dayjs.extend(isBetween)


const TransportationRequestPage = (props) => {

  let [request, setRequest] = useState({
    From: props?.transportation && props.transportation.fields.Type === "Arrival" && props.transportation.fields.To,
    To: props?.transportation && props.transportation.fields.Type === "Departure" && props.transportation.fields.From,
    Time: props?.transportation && props.transportation.fields.Time,
    Passengers: []
  })
  let [people, setPeople] = useState([])
  let [transportation,setTransportation] = useState([])
  let [locations, setLocations] = useState([])
  
  useEffect(() => {
    getPeople()
    getTransportation()
    getLocations()
    console.log("initial request: ", request)
  }, []);

  useEffect(() => {
    // console.log("props: ", props)
    // console.log("dayjs utc: ",dayjs.utc(props?.transportation?.fields?.Time).format())
    console.log("props?.transportation: ", props?.transportation)
  },[])

  useEffect(() => {
    console.log("locations have changed: ", locations)
  },[locations])

  useEffect(() => {
    console.log("request has changed: ", request)
  },[request])

  useEffect(() => {
    console.log("people has changed: ", people)
    if(props?.transportation) {
      let passengers = people.filter(person => {return( props.transportation.fields?.withoutShuttle?.includes(person.id))})
      let tempRequest = request
      tempRequest.Passengers = passengers
      console.log("changing passengers: ", passengers)
      setRequest(tempRequest)
    }
  },[people])

  return (
    <Page>
      <Navbar title="Transportation Request Form" backLink="Back" />
          <List noHairlinesMd form>
            <ListGroup>
              <ListInput
                  label="Departure time"
                  type="datepicker"
                  value={[request.Time]}
                  placeholder="Please choose..."
                  onCalendarChange={(e)=>{
                    if(e) {
                      console.log("time: ",e)
                      let tempRequest = request
                      tempRequest["Time"] = e[0]
                      setRequest(tempRequest)
                    }
                  }}
                  calendarParams={{
                    minDate:"2021-07-31",
                    maxDate:"2021-08-06",
                    yearSelector: false,
                    timePicker: true,
                    dateFormat:"d M HH::mm",
                    events: [{
                      from: new Date("2021-07-31"),
                      to: new Date("2021-08-06"),
                      color: "#4caf50"
                    }],
                  }}
                >
                </ListInput>
              <ListItem title="FROM" groupTitle></ListItem>
              <ListInput
                label="Location"
                type="select"
                // readonly = {props?.transportation}
                value={request.From}
                placeholder="Please choose..."
                onChange={(e)=>{
                  console.log("From changed: ", e.target.value)
                  let tempRequest = request
                  tempRequest["From"] = e.target.value
                  setRequest(tempRequest)
                }}
              >
                <option value="-">-</option>  
                {locations.map((location, id) => {return(
                  <option key={id} value={location?.id}>{location?.fields?.Name}</option>  
                )})}
              </ListInput>
              
            </ListGroup>

            <ListGroup>
              <ListItem title="TO" groupTitle></ListItem>
              <ListInput
                label="Location"
                type="select"
                value={request.To}
                placeholder="Please choose..."
                // errorMessage="Please enter the destination"
                onChange={(e)=>{
                  console.log("To changed: ", e.target.value)
                  let tempRequest = request
                  tempRequest["To"] = e.target.value
                  setRequest(tempRequest)
                }}
              >
                <option value="-">-</option>  
                {locations.map((location, id) => {return(
                  <option key={id} value={location?.id}>{location?.fields?.Name}  </option>  
                )})}
              </ListInput>
            </ListGroup>
            <ListGroup>
              <ListItem title="PASSENGERS" groupTitle></ListItem>
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
                      setRequest(tempRequest)
                      // console.log("updated request: ", request)
                    }
                  }
                }}
              >
                <select name="person" multiple>
                  {/* <optgroup label="Flight: XYZ987 (17:35)"> */}
                    {request.Passengers.map((person,id) => {return (<option key={id} value={person.id}>{person.fields.Name}</option>)})}
                  {/* </optgroup> */}
                </select>
              </ListItem>
              
            </ListGroup>
            <Button fill onClick={() => submitRequest(request)}>Save transportation request</Button>
          </List>
      
    </Page>
  );

  function getLocations() {
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20Locations?&view=Drivable",
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
          setLocations(data.records);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  
  function submitRequest(request) {
    console.log("submitted: ", request)
    let data = {
      "records": [
        {"fields":
          {
            "From":request.From,
            "To":request.To,
            "Time": request.Time,
            "Passengers": request.Passengers,
            "Flights" :[props?.transportation?.id]
          }
        }
      ],
      "typecast":true
    }
    console.log("post data: ", data)
    
    fetch("https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Booking%3A%20Shuttles",
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer keyYNFILTvHzPsq1B'
          },
          body: JSON.stringify(data)
          
        }
      )
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
        })
        .catch((error) => {
          console.log(error);
        });
  }


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
        })
        .catch((error) => {
          console.log(error);
        });
  }
}
export default TransportationRequestPage;