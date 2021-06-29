import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, BlockTitle, List, ListItem, Chip, Icon, Card, CardContent, CardHeader, Link, f7route, f7router } from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const TransportationDetailsPage = (transportation) => {

  let [trasportation, setTransportation] = useState([])
  
  useEffect(() => {
  }, []);

  return (
    <Page>
      <Navbar title="Transportation Details" backLink="Back" />
      <BlockTitle>Transportation ID</BlockTitle>
      
    </Page>
  );

}
export default TransportationDetailsPage;

