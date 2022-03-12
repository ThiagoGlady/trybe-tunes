import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
              <Link data-testid="link-to-search" to="/search"> Pesquisa </Link>
              <Link data-testid="link-to-favorites" to="/favorites"> Favoritos </Link>
              <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
            </p>
          )}
      </header>
    );
  }
}

export default Header;
