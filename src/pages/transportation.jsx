import React, {useState, useEffect} from 'react';
import { Page,Button,  Navbar,Toolbar, List, ListItem, BlockTitle, NavRight, Link, Icon,Badge, Block, Chip} from 'framework7-react';
import { filter } from 'dom7';
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)



const TransportationPage = ({ f7router }) => {
  
  const [filters, setFilters] = useState({
    "Arrival": {
      value:false,
      color: "lightblue",
      count: 0
    },
    "Departure": {
      value:false,
      color: "blue",
      count: 0,
    },
    "Shuttle": {
      value:false,
      color: "green", 
      count:0
    },
    "Request": {
      value:false,
      color: "red",
      count: 0
    }
  })

  const [transportation, setTransportation] = useState([])

  function changeFilters(filter) {
    // console.log("current filters: ", filters)
    let tempFilters = filters
    tempFilters[filter].value = !tempFilters[filter].value
    // console.log("temp filters: ", tempFilters)
    setFilters({...filters,...tempFilters})
    // console.log("new filters: ", filters)
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
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  
  useEffect(() => {
    getTransportation()
  }, []);

  useEffect(()=>{
    console.log("transportation changed: ", transportation)
    
  }, [transportation])

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
        {/* <Link href="/transportation/pending/">Pending requests</Link> */}
        <Link href="/transportation/request/">New request</Link>
      </Toolbar>
        <BlockTitle>Filters</BlockTitle>
        <Block strong>
          {Object.keys(filters).map((filter,id)=>{  
            return (
              <Link key={id} onClick={()=> changeFilters(filter)}>
                <Chip outline={filters[filter].value}  text={filter} color={filters[filter].color} style={{marginRight:"4px"}}>
                  <Badge style={{marginLeft: "4px"}} bgColor='white' textColor={filters[filter].color}>{transportation.filter(transport => transport.fields.Type === filter).length}</Badge>
                </Chip>
              </Link>    
            )
          })}
        </Block>
          <List mediaList noHairlines >
            {transportation.sort((a, b) => (dayjs(a.fields.Time).isAfter(dayjs(b.fields.Time)) ? 1 : -1)).filter(item=>!filters[item.fields.Type].value).map((item,id) => {
              // console.log(item)
              if (item.fields.Type === "Shuttle") {
                return (
                  <ListItem
                    key={id}
                    style={{marginBottom:"4px", backgroundBlendMode:true}}
                    link={"/transportation/"+item.id}
                    title={`${item.fields["Transportation"]}`}
                    badge="Add passengers"
                    badgeColor={filters[item.fields.Type].color}
                    textColor={filters[item.fields.Type].color}
                    noChevron
                    textColor={filters[item.fields.Type].color}
                  >
                    Passengers  
                    <Chip style={{marginRight:"8px", marginLeft:"8px"}} text="Onboard" mediaBgColor="green" media={item.fields["Passengers"].length} />
                  </ListItem>
                )} else if (item.fields.Type === "Request") {
                  return (
                    <ListItem 
                      key={id}
                      style={{marginBottom:"4px", backgroundBlendMode:true}}
                      link={"/transportation/"+item.id}
                      title={`${item.fields["Transportation"]}`}
                      badge="Book a shuttle"
                      badgeColor={filters[item.fields.Type].color}
                      textColor={filters[item.fields.Type].color}
                      noChevron
                      // subtitle={item.fields.Type}
                    >
                      Passengers  
                      <Chip style={{marginRight:"8px", marginLeft:"8px"}} text="Requesting" mediaBgColor="red" media={item.fields["Passengers"].length} />
                    </ListItem>
                  )
                } else {
                  return (
                    <ListItem 
                      key={id}
                      style={{marginBottom:"4px", backgroundBlendMode:true}}
                      link={"/transportation/"+item.id}
                      title={`${item.fields["Transportation"]}`}
                      badge="Book a shuttle"
                      textColor={filters[item.fields.Type].color}
                      badgeColor={filters[item.fields.Type].color}
                      textColor={filters[item.fields.Type].color}
                      noChevron
                    >
                      Passengers  
                      <Chip style={{marginRight:"8px" , marginLeft:"8px"}} iconSize="4px" text="Onboard" mediaBgColor="blue" media={item.fields["Passengers"].length} />
                      <Chip style={{marginRight:"8px"}} text="With shuttle" mediaBgColor="green" media={String(item.fields.withShuttle ? item.fields.withShuttle.length : 0)} />
                      {item.fields["Shuttle passengers count"] !== item.fields["Passengers"].length && <Chip style={{marginRight:"8px"}} text="No shuttle" mediaBgColor="red" media={String(item.fields.withoutShuttle ? item.fields.withoutShuttle.length : 0)}/>}
                    </ListItem>
                  )
                }
            })}
          </List>
    </Page>
  );
}

export default TransportationPage;