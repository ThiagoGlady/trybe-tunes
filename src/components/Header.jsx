import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    getUser()
      .then((result) => {
        this.setState({
          user: result,
        }, () => {
          this.setState({
            isLoading: false,
          });
        });
      });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading
          ? <Carregando />
          : (
            <p data-testid="header-user-name">
              Bem vindo(a)
              { user.name }
            </p>
          )}
      </header>
    );
  }
}

export default Header;
