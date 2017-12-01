import React, { Component } from 'react';
import './addreservation.css';

class AddReservation extends Component {
   constructor(props) {
      super(props);
      this.onBlur = this.onBlur.bind(this);
      this.onClick = this.onClick.bind(this);
      this.state = {
         name: '',
         hotelname: '',
         arrivaldate: '',
         departuredate: '',
      };
   }
   onBlur(e) {
      switch (e.target.name) {
         case 'guestname':
            this.setState({
               name: e.target.value,
            });
            break;
         case 'hotelname':
            this.setState({
               hotelname: e.target.value,
            });
            break;
         case 'arrivaldate':
            this.setState({
               arrivaldate: e.target.value,
            });
            break;
         case 'departuredate':
            this.setState({
               departuredate: e.target.value,
            });
            break;
         default:
            break;
      }
   }
   onClick() {
      if (!this.isValid()) {
         return;
      }
      var formData = {
         name: this.state.name,
         hotelname: this.state.hotelname,
         arrivaldate: this.state.arrivaldate,
         departuredate: this.state.departuredate,
      };
      this.props.onClick(formData);
   }

   isValid() {
      let { name, hotelname, arrivaldate, departuredate } = this.state;
      let valid = true;
      if (!name || name.trim().length === 0) {
         valid = false;
      }

      if (valid && (!hotelname || hotelname.trim().length === 0)) {
         valid = false;
      }

      if (valid && (!arrivaldate || arrivaldate.trim().length === 0)) {
         valid = false;
      }

      if (valid && (!departuredate || departuredate.trim().length === 0)) {
         valid = false;
      }

      return valid;
   }
   render() {
      return (
         <section className="add-reservation">
            <header>
               <h3>Add New Reservation</h3>
            </header>
            <section className="input-container">
               <section>Guest Name: </section>
               <input
                  type="text"
                  placeholder="Enter Guest's Name"
                  name="guestname"
                  onBlur={this.onBlur}
               />
            </section>
            <section className="input-container">
               <section>Hotel Name: </section>
               <input
                  type="text"
                  placeholder="Enter Hotel's Name"
                  name="hotelname"
                  onBlur={this.onBlur}
               />
            </section>
            <section className="input-container">
               <section>Arrival Date: </section>
               <input
                  type="date"
                  id="arrivalDate"
                  name="arrivaldate"
                  required
                  onBlur={this.onBlur}
               />
            </section>
            <section className="input-container">
               <section>Departure Date: </section>
               <input
                  type="date"
                  id="departureDate"
                  name="departuredate"
                  required
                  onBlur={this.onBlur}
               />
            </section>
            <section className="input-container">
               <button type="button" value="Search" onClick={this.onClick}>
                  Add
               </button>
            </section>
         </section>
      );
   }
}

export default AddReservation;
