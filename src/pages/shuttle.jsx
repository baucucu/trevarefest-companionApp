import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, BlockTitle, List, ListItem, Chip, Icon, Card, CardContent, CardHeader, Link } from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const ShuttlePage = () => {

  let [shuttle, setShuttle] = useState([])
  
  useEffect(() => {
  }, []);

  return (
    <Page>
      <Navbar title="Shuttle" backLink="Back" />
      <BlockTitle>Shuttle</BlockTitle>
      
    </Page>
  );

}
export default ShuttlePage;

