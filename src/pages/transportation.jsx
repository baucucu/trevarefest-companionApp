import React, {useState, useEffect} from 'react';
import { Page,Button,  Navbar,Toolbar, List, ListItem, BlockTitle, NavRight, Link, Icon,Badge, Block, Chip} from 'framework7-react';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const TransportationPage = ({ f7router }) => {
  
  const [filters, setFilters] = useState({
    "Arrival": false,
    "Shuttle": false,
    "Festival Transportation": false,
    "Departure": false,
    "Request": true
  })

  const [transportation, setTransportation] = useState([])

  function changeFilters(filter) {
    console.log("current filters: ", filters)
    let tempFilters = filters
    tempFilters[filter] = !tempFilters[filter]
    console.log("temp filters: ", tempFilters)
    setFilters({...filters,...tempFilters})
    console.log("new filters: ", filters)
    
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
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  
  useEffect(() => {
    getTransportation()
  }, []);

  return (
    <Page>
      <Navbar title="Transportation">
        <NavRight>
          <Link iconOnly panelOpen="right">
            <Icon ios="f7:person_circle_fill" aurora="f7:person_circle_fill" md="material:person" >
              <Badge color="blue">5</Badge>
            </Icon>
          </Link>
        </NavRight>
      </Navbar>
      <Toolbar bottom>
        <Link href="/transportation/pending/">Pending requests</Link>
        <Link href="/transportation/request/">New request</Link>
      </Toolbar>
        <BlockTitle>Filters</BlockTitle>
        <Block strong>
          <Link onClick={()=> changeFilters("Arrival")}>
            <Chip outline={filters["Arrival"]}  text="Arrivals" color="green" />
          </Link>
          <Link onClick={()=>changeFilters("Shuttle")}>
            <Chip outline={filters["Shuttle"]}  text="Shuttles" color="blue" />
          </Link>
          <Link onClick={()=>changeFilters("Festival Transportation")}>
            <Chip outline={filters["Festival Transportation"]}  text="Festival Transportation" color="orange" />
          </Link>
          <Link onClick={()=>changeFilters("Departure")}>
            <Chip outline={filters["Departure"]}  text="Departures" color="red" />
          </Link>
        </Block>
          <List mediaList>
            {transportation.sort((a, b) => (dayjs(a.fields.Time).isAfter(dayjs(b.fields.Time)) ? 1 : -1)).filter(item=>!filters[item.fields.Type]).map((item,id) => {
              let formattedTime = dayjs.utc(item.fields.Time).format("D MMM - HH:mm").toString()
              return (
                <ListItem
                  key={id}
                  link={"/transportation/"+item.id}
                  title={`${item.fields["Transportation"]}`}
                  after={formattedTime}
                  subtitle="Passengers"
                >
                    <Chip style={{marginRight:"8px"}} iconSize="4px" text="Onboard" mediaBgColor="blue" media={item.fields["Passengers"].length} />
                    <Chip style={{marginRight:"8px"}} text="with shuttle" mediaBgColor="green" media={String(item.fields["Shuttle passengers count"])} />
                    <Chip style={{marginRight:"8px"}} text="no shuttle" mediaBgColor="red" media={item.fields["Passengers"].length} />
                </ListItem>
              )
            })}
          </List>
    </Page>
  );

  
}
export default TransportationPage;

