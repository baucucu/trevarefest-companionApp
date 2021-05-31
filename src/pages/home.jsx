import React,{useState, useEffect} from 'react';
import {
  Page,
  Navbar,
  Toolbar,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  BlockTitle,
} from 'framework7-react';
import {Timeline} from '../components/timeline.jsx'

const HomePage = (f7) => { 
  
  let [user, setUser] = useState({})
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    getUser(f7.f7route.query.user)
  }, [])

  function getUser(recordId) {
    setLoading(true)
    fetch(`https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20People/${recordId}`,
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
  
          console.log("user record: ", data)
          setUser(data);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return(
  <Page name="home">
    {/* Top Navbar */}
    {user?.id && <Navbar small sliding={false}>
      {/* <NavLeft>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
      </NavLeft> */}
      <NavTitle >Trevare Festival</NavTitle>
      <NavRight>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
      </NavRight>
    </Navbar>}
    {/* Toolbar */}
    {user?.id && <Toolbar bottom>
      <Link>Join an activity</Link>
    </Toolbar>}
    {/* Page content */}

    {user?.id && <BlockTitle>Hi, {user.fields?.["Name"]}, this is your personal calendar</BlockTitle>}

    {/* <!--
    Additional "timeline-horizontal" class to enable Horizontal timeline
    Additional "col-50" to define column width (50%)
    Additional "tablet-20" to define column width for tablets (20%)
    --> */}
    
    {loading && <div>Loading</div>}
    {user?.id && <Timeline user={user}/>}
    {user?.id || <div>Not logged in</div>}
  </Page>
)}
export default HomePage;


