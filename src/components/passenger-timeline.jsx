import React, {useState, useEffect} from 'react'
import {
    Link,
    Card,
    CardHeader,
    CardContent,
    CardFooter,
  } from 'framework7-react';
export const PassengerTimeline = (userId) => {

    function getUser(userId) {
        fetch(`https://api.airtable.com/v0/appw2hvpKRTQCbB4O/Directory%3A%20People/${userId}`,
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
                setUser(data);
                // console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    let [user, setUser] = useState({})
    let [calendar, setCalendar] = useState([])

    useEffect(()=>{
        getUser(userId.userId)
    },[])

    let tables = [
        ""
    ]

    useEffect(() => {
        // getFlights()
        // getTransportation()
        // getBooking()
        // getActivities()
        // getprogram()
        // getFollows()
    })

    return(
        <div className="timeline">
            
        </div>
    )
}

