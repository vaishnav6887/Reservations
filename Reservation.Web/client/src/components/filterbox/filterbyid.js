import React, { Component } from 'react';

class FilterById extends Component {
   constructor(props) {
      super(props);
      this.state = {
         id: 0,
      };
      this.onBlur = this.onBlur.bind(this);
      this.onClick = this.onClick.bind(this);
   }
   onBlur(e) {
      this.setState({
         id: Number(e.target.value),
      });
   }
   onClick(e) {
      let val = this.state.id;
      if (!val || isNaN(Number(val))) {
         return;
      }

      this.props.getByIdSearchClick(Number(val));
   }
   render() {
      return (
         <section className="filter-byid">
            <header>
               <h3>Search By ID</h3>
            </header>
            <input
               type="text"
               id="idTextBox"
               placeholder="Enter ID to search"
               onBlur={this.onBlur}
            />
            <button
               type="button"
               id="searchByIdButton"
               value="Search"
               onClick={this.onClick}
            >
               Search
            </button>
         </section>
      );
   }
}

export default FilterById;
