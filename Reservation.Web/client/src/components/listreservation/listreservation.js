import React, { Component } from 'react';
import Row from './row';
import Header from './header';
class ListReservation extends Component {
   render() {
      let { data, refresh } = this.props;
      return (
         <section className="list-reservation">
            <header className="list-header">
               <h3>List of Reservations</h3>
            </header>
            <button
               type="button"
               className="search-clear"
               id="searchClear"
               onClick={refresh}
               title="click to clear filters"
               value="Refresh"
            >
               Clear
            </button>
            <Header />
            {(!data || data.length === 0) && (
               <section className="empty-message">
                  No Reservations found
               </section>
            )}
            {data && data.map((res, i) => <Row key={i} {...res} index={i} />)}
         </section>
      );
   }
}

export default ListReservation;
