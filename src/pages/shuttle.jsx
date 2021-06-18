import React, {useState, useEffect} from 'react';
import { Page, Navbar,Button, ListGroup, List, ListItem,ListInput, Icon,} from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(utc)
dayjs.extend(isBetween)


const ShuttlePage = () => {

  console.log("datejs example: ", dayjs('2021-08-01'))

  let [shuttle, setShuttle] = useState({})
  let [cars, setCars] = useState([])
  let [drivers, setDrivers] = useState([])
  let [passengers, setPassengers] = useState([])
  
  useEffect(() => {
    getCars()
  }, []);

  useEffect(() => {
    getDrivers()
  }, []);

  useEffect(() => {
    getPassengers()
  }, []);

  return (
    <Page>
      <Navbar title="Shuttle" backLink="Back" />
          <List noHairlinesMd form>
            <ListGroup>
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
                {/* <Icon icon="demo-list-icon"  slot="media"/> */}
              </ListInput>
            </ListGroup>

            <ListGroup>
              <ListItem title="VEHICLE" groupTitle></ListItem>
              <ListItem
                title="Cars list"
                smartSelect
                smartSelectParams={{
                  openIn: 'popup',
                  searchbar: true,
                  searchbarPlaceholder: 'Search car',
                }}
              >
                <select name="person" defaultValue={[]}>
                  <optgroup label="AVAILABLE">
                    <option value="JACB123">ACB123</option>
                    <option value="Jane Doe">XHD332</option>
                  </optgroup>
                  <optgroup label="BUSY">
                    <option value="John Fonda">JHS991</option>
                    <option value="Miriam Maple">USL122</option>
                    <option value="Alex Raduca">9J8SS0</option>
                    <option value="Boris Johnson">GDF812</option>
                  </optgroup>
                </select>
              </ListItem>
              
            </ListGroup>
            <ListGroup>
              <ListItem title="DRIVER" groupTitle></ListItem>
              <ListItem
                title="Drivers list"
                smartSelect
                smartSelectParams={{
                  openIn: 'popup',
                  searchbar: true,
                  searchbarPlaceholder: 'Search driver',
                }}
              >
                <select name="person" defaultValue={[]}>
                  <optgroup label="AVAILABLE">
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Doe">Jane Doe</option>
                  </optgroup>
                  <optgroup label="BUSY">
                    <option value="John Fonda">John Fonda</option>
                    <option value="Miriam Maple">Miriam Maple</option>
                    <option value="Alex Raduca">Alex Raduca</option>
                    <option value="Boris Johnson">Boris Johnson</option>
                  </optgroup>
                </select>
              </ListItem>
              
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

  function getCars() {}
  function getDrivers() {}
  function getPassengers() {}
  function getShuttle() {}

}
export default ShuttlePage;