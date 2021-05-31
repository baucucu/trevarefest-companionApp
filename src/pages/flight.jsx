import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, BlockTitle, List, ListItem, Chip, Icon, Card, CardContent, CardHeader, Link } from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const FlightPage = () => {

  let [flight, setFlights] = useState([])
  
  useEffect(() => {
  }, []);

  return (
    <Page>
      <Navbar title="Flight" backLink="Back" />
      <BlockTitle>Flight</BlockTitle>
      
    </Page>
  );

}
export default FlightPage;

