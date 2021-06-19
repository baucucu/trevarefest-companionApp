import React, {useState, useEffect} from 'react';
import { Page, Navbar,Button, ListGroup, List, ListItem,ListInput} from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(utc)
dayjs.extend(isBetween)


const TransportationRequestPage = () => {

  console.log("datejs example: ", dayjs('2021-08-01'))

  let [transportation, setTransportation] = useState({})
  let [passengers, setPassengers] = useState([])
  
  useEffect(() => {
    getPassengers()
  }, []);

  return (
    <Page>
      <Navbar title="Transportation Request Form" backLink="Back" />
          <List noHairlinesMd form>
            <ListGroup>
              <ListInput
                  label="Departure time"
                  type="datepicker"
                  defaultValue="2021-08-01"
                  
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
                }}
              >
                <select name="person" multiple defaultValue={[]}>
                  <optgroup label="Flight: ABC123 (17:00)">
                    <option value="John Doe - ABC123">John Doe</option>
                    <option value="Jane Doe- ABC123">Jane Doe</option>
                  </optgroup>
                  <optgroup label="Flight: XYZ987 (17:35)">
                    <option value="John Fonda - XYZ987">John Fonda</option>
                    <option value="Miriam Maple - XYZ987">Miriam Maple</option>
                    <option value="Alex Raduca - XYZ987">Alex Raduca</option>
                    <option value="Boris Johnson - XYZ987">Boris Johnson</option>
                  </optgroup>
                </select>
              </ListItem>
              
            </ListGroup>
            <Button fill>Save shuttle information</Button>
          </List>
      
    </Page>
  );

  
  function getPassengers() {}
}
export default TransportationRequestPage;