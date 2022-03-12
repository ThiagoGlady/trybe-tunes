import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        Gosto de observar o Universo Observável
      </div>
    );
  }
}

export default Favorites;
