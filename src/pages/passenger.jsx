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

const PassengerPage = () => (
  <Page name="person">
    {/* Top Navbar */}
    <Navbar title="Passenger Name Timeline" backLink="Back" />
    
    {/* Page content */}

    <BlockTitle>Passenger timeline</BlockTitle>

    
  </Page>
);
export default PassengerPage;