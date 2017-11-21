import React, { Component } from 'react';

class NameFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelName: '',
            arrivalDate: '',
            departureDate: ''
        };

        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    onClick(e) {
        let {hotelName, arrivalDate, departureDate} = this.state;
        let currentState = {
            hotelName: hotelName,
            arrivalDate: arrivalDate,
            departureDate: departureDate
        }

        this.props.filterByParam(currentState);
    }

    onBlur(e) {
        switch (e.target.name) {
            case 'hotelnamefilter':
                this.setState({
                    hotelName: e.target.value
                });
                break;
            case 'arrivaldatefilter':
                this.setState({
                    arrivalDate: e.target.value
                });
                break;
            case 'departurefilter':
                this.setState({
                    departureDate: e.target.value
                });
                break;
        }
    }
    render() {
        return (
            <section className='name-filter'>
                <header><h3>Search By Name and date</h3></header>
                <section className="input-container">
                    <input type='text' id='searchTextBox' name='hotelnamefilter' placeholder="Enter Hotel Name" onBlur={this.onBlur} />
                    <input type='date' id='searchInDate' name='arrivaldatefilter' placeholder="Enter arrival date" onBlur={this.onBlur} />
                    <input type='date' id='searchOutDate' name='departurefilter' placeholder="Enter departure date" onBlur={this.onBlur} />
                </section>
                <button type="button" id='searchButton' value="Search" onClick={this.onClick}>Lookup</button>
            </section>
        );
    }
}

export default NameFilter;