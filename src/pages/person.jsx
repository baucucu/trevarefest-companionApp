import React from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from 'framework7-react';

const PersonPage = () => (
  <Page name="person">
    {/* Top Navbar */}
    <Navbar title="Person Name Timeline" backLink="Back" />
    
    {/* Page content */}

    <BlockTitle>Your personal calendar</BlockTitle>

    {/* <!--
    Additional "timeline-horizontal" class to enable Horizontal timeline
    Additional "col-50" to define column width (50%)
    Additional "tablet-20" to define column width for tablets (20%)
    --> */}

    <div className="timeline timeline-horizontal col-80 tablet-35">
      {/* <!-- Timeline Item (Day) --> */}
      <div className="timeline-item">
        <div className="timeline-item-date">2 <small>Aug</small></div>
        <div className="timeline-item-content">
          <Card className="demo-facebook-card">
              <CardHeader className="no-border">
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
  </Page>
);
export default PersonPage;