import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        Gosto de marcar um X no seu coração pra você nunca me esquecer
      </div>
    );
  }
}

export default Profile;
