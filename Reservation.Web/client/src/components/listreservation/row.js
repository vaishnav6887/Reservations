import React, { Component } from 'react';
import Header from './header'
import './row.css';
class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        let {hotelname, name, departuredate, arrivaldate, id, index} = this.props;
        return (
            <section className={`row ${index % 2 ? 'even' : ''}`}>
                <span>
                    {name}
                </span>
                <span>
                    {hotelname}
                </span>
                <span>
                    {arrivaldate}
                </span>
                <span>
                    {departuredate}
                </span>
            </section>
        )
    }
}

export default Row;