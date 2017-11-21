import React, { Component } from 'react';
import ListReservation from './components/listreservation/listreservation';
import AddReservation from './components/addreservation/addreservation';
import FilterControl from './components/filterbox/filtercontrol';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: []
    };
    this.onClick = this.onClick.bind(this);
    this.getById = this.getById.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  onClick(data) {
    let self = this;
    let stinr = JSON.stringify(data);
    let reve = JSON.parse(stinr);
    fetch("/api/reservation", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(respn => {
          let arr = this.state.reservation;
          data._id = respn;
          arr.push(data);
          this.setState({
            reservation : arr
          });
      });
  }
  componentWillMount() {
    this.refresh();
  }
  getById(id){
    fetch(`/api/reservation/${id}`).then(res => res.json()).then((reservation) => {
        var current = [];
        if(reservation && reservation._id > 0) {
          current.push(reservation);
        }

        this.setState({ 'reservation': current });
    });
  }
  refresh(data){
    let filters = '/api/reservations';
    if(data){
      if(data.hotelName) {
        filters = `${filters}?hotelName=${data.hotelName}`
      }
      if(data.arrivalDate){
        filters = `${filters}&arrivalDate=${data.arrivalDate}`
      }
      if(data.departureDate){
        filters = `${filters}&departureDate=${data.departureDate}`
      }
    }
    
    fetch(filters).then(res => res.json()).then(reservation => this.setState({ reservation }));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Reservation Center</h1>
        </header>
        <section className="Col-container">
          <section className="addContainer">
            <AddReservation onClick={this.onClick} />
          </section>
          <section className="listContainer">
            <FilterControl getByIdSearchClick={this.getById} filterByParam={this.refresh} />
            <ListReservation data={this.state.reservation} refresh={this.refresh} />
          </section>
        </section>
      </div>
    );
  }
}

export default App;
