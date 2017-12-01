import React, { Component } from 'react';
import './header.css';

class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <header className="header">
            <h3>Guest Name</h3>
            <h3>Hotel Name</h3>
            <h3>Arrival Date</h3>
            <h3>Departure Date</h3>
         </header>
      );
   }
}

export default Header;
