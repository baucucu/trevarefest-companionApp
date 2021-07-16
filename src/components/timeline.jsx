import React, {useState, useEffect} from 'react'
import {
    Link,
    Card,
    CardHeader,
    CardContent,
    CardFooter,
  } from 'framework7-react';
export const Timeline = (userId) => {
    
    let [user, setUser] = useState({})
    let [calendar, setCalendar] = useState([])

    useEffect(()=>{
        getUser(userId.userId)
    },[])

    useEffect(() => {
        // getFlights()
        // getTransportation()
        // getBooking()
        // getActivities()
        // getprogram()
        // getFollows()
    },[])

    return(
        <div className="timeline timeline-horizontal col-70 tablet-20">
        {/* <!-- Timeline Item (Day) --> */}
        <div className="timeline-item">
            <div className="timeline-item-date">2 <small>Aug</small></div>
            <div className="timeline-item-content">
                <Card className="demo-facebook-card">
                    <CardHeader className="no-border">
                        {/* <div className="demo-facebook-avatar">
                        <img
                            src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg"
                            width="34"
                            height="34"
                        />
                        </div> */}
                        <div className="demo-facebook-name">Event name</div>
                        <div className="demo-facebook-date">3:47 PM</div>
                    </CardHeader>
                    <CardContent padding={false}>
                        <img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%" />
                    </CardContent>
                    <CardFooter className="no-border">
                        <Link>Action 1</Link>
                        <Link>Action 2</Link>
                    </CardFooter>
                    </Card>
                    <Card className="demo-facebook-card">
                    <CardHeader className="no-border">
                        {/* <div className="demo-facebook-avatar">
                        <img
                            src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg"
                            width="34"
                            height="34"
                        />
                        </div> */}
                        <div className="demo-facebook-name">Event name</div>
                        <div className="demo-facebook-date">3:47 PM</div>
                    </CardHeader>
                    <CardContent padding={false}>
                        <img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%" />
                    </CardContent>
                    <CardFooter className="no-border">
                        <Link>Action 1</Link>
                        <Link>Action 2</Link>
                    </CardFooter>
                    </Card>
                    <Card className="demo-facebook-card">
                    <CardHeader className="no-border">
                        {/* <div className="demo-facebook-avatar">
                        <img
                            src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg"
                            width="34"
                            height="34"
                        />
                        </div> */}
                        <div className="demo-facebook-name">Event name</div>
                        <div className="demo-facebook-date">3:47 PM</div>
                    </CardHeader>
                    <CardContent padding={false}>
                        <img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%" />
                    </CardContent>
                    <CardFooter className="no-border">
                        <Link>Action 1</Link>
                        <Link>Action 2</Link>
                    </CardFooter>
                    </Card>
                    <Card className="demo-facebook-card">
                    <CardHeader className="no-border">
                        {/* <div className="demo-facebook-avatar">
                        <img
                            src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg"
                            width="34"
                            height="34"
                        />
                        </div> */}
                        <div className="demo-facebook-name">Event name</div>
                        <div className="demo-facebook-date">3:47 PM</div>
                    </CardHeader>
                    <CardContent padding={false}>
                        <img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%" />
                    </CardContent>
                    <CardFooter className="no-border">
                        <Link>Action 1</Link>
                        <Link>Action 2</Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
        {/* <!-- Timeline Item With Card --> */}
        <div className="timeline-item">
            <div className="timeline-item-date">3 <small>Aug</small></div>
            <div className="timeline-item-content">
            <Card className="demo-facebook-card">
                <CardHeader className="no-border">
                {/* <div className="demo-facebook-avatar">
                    <img
                    src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg"
                    width="34"
                    height="34"
                    />
                </div> */}
                <div className="demo-facebook-name">Event name</div>
                <div className="demo-facebook-date">3:47 PM</div>
                </CardHeader>
                <CardContent padding={false}>
                <img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%" />
                </CardContent>
                <CardFooter className="no-border">
                <Link>Action 1</Link>
                <Link>Action 2</Link>
                </CardFooter>
            </Card>
            </div>
        </div>
        {/* <!-- Timeline Item With List Block --> */}
        <div className="timeline-item">
            <div className="timeline-item-date">4 <small>Aug</small></div>
            <div className="timeline-item-content">
            <div className="list inset">
                <ul>
                </ul>
            </div>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-item-date">5 <small>Aug</small></div>
            <div className="timeline-item-content">
            <Card className="demo-facebook-card">
                <CardHeader className="no-border">
                    {/* <div className="demo-facebook-avatar">
                    <img
                        src="https://cdn.framework7.io/placeholder/people-68x68-1.jpg"
                        width="34"
                        height="34"
                    />
                    </div> */}
                    <div className="demo-facebook-name">Event name</div>
                    <div className="demo-facebook-date">3:47 PM</div>
                </CardHeader>
                <CardContent padding={false}>
                    <img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%" />
                </CardContent>
                <CardFooter className="no-border">
                    <Link>Action 1</Link>
                    <Link>Action 2</Link>
                </CardFooter>
                </Card>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-item-date">6 <small>Aug</small></div>
            <div className="timeline-item-content">
            
            </div>
        </div>
        </div>
    )
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
                console.log("user data: ", data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

