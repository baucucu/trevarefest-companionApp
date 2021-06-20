import React, {useState, useEffect} from 'react';
import { Page, Navbar,Button, ListGroup, List, ListItem,ListInput, f7, f7ready} from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(utc)
dayjs.extend(isBetween)


const TransportationRequestPage = () => {

  let [request, setRequest] = useState({
    From: null,
    To: null,
    Time: null,
    Passengers: []
  })
  let [people, setPeople] = useState([])
  let [transportation,setTransportation] = useState([])
  
  useEffect(() => {
    getPeople()
    getTransportation()
  }, []);

  
  return (
    <Page>
      <Navbar title="Transportation Request Form" backLink="Back" />
          <List noHairlinesMd form>
            <ListGroup>
              <ListInput
                  label="Departure time"
                  type="datepicker"
                  value="2021-08-01"
                  
                  placeholder="Please choose..."
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
                  {/* <Icon icon="clock"  slot="media" color="#fffff"/> */}
                </ListInput>
              <ListItem title="FROM" groupTitle></ListItem>
              <ListInput
                label="Location"
                type="select"
                placeholder="Please choose..."
                onChange={(e)=>console.log("location change: ", e)}
              >
                {/* <Icon icon="demo-list-icon" slot="media"/> */}
                <option value="Airport">Airport</option>
                <option value="Trevare">Trevare</option>
                <option value="Svolvær Sentrum">Svolvær Sentrum</option>
              </ListInput>
              
            </ListGroup>

            <ListGroup>
              <ListItem title="TO" groupTitle></ListItem>
              <ListInput
                label="Location"
                type="select"
                defaultValue={false}
                placeholder="Please choose..."
              >
                {/* <Icon icon="demo-list-icon" slot="media"/> */}
                <option value="Airport">Airport</option>
                <option value="Trevare">Trevare</option>
                <option value="Svolvær Sentrum">Svolvær Sentrum</option>
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
                    {people.map((person,id) => {return (<option key={id} value={person.id}>{person.fields.Name}</option>)})}
                  {/* </optgroup> */}
                </select>
              </ListItem>
              
            </ListGroup>
            <Button fill>Save transportation request</Button>
          </List>
      
    </Page>
  );
  
    
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
          console.log("transportation",transportation);
        })
        .catch((error) => {
          console.log(error);
        });
  }
}
export default TransportationRequestPage;