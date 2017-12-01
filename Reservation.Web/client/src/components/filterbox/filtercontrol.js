import React, { Component } from 'react';
import FilterById from './filterbyid';
import NameFilter from './namefilter';
import './filter.css';

class FilterControl extends Component {
   render() {
      let { getByIdSearchClick, filterByParam } = this.props;
      return (
         <section className="filter-control">
            <FilterById getByIdSearchClick={getByIdSearchClick} />
            <NameFilter filterByParam={filterByParam} />
         </section>
      );
   }
}

export default FilterControl;
