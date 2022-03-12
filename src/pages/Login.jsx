import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends Component {
  constructor() {
    super();

    this.onNameChange = this.onNameChange.bind(this);
    this.verifyButton = this.verifyButton.bind(this);
    this.onSaveLoginClick = this.onSaveLoginClick.bind(this);

    this.state = {
      isLoginButtonDisabled: true,
      loginName: '',
      isLoading: false,
      willRedirect: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        willRedirect: true,
      });
    }
  }

  // Função que sempre atualiza o estado com o novo valor do input de login.
  onNameChange({ target }) {
    const { value } = target;
    this.setState({
      loginName: value,
    }, () => {
      this.verifyButton();
    });
  }

  onSaveLoginClick() {
    const { loginName } = this.state;
    const timeOfLoading = 1000;
    createUser({ name: loginName });
    this.setState(
      { isLoading: true },
    );
    setTimeout(() => {
      this.setState({
        willRedirect: true,
      });
    }, timeOfLoading);
  }

  // Função que verifica se o valor do input de login tem 3 ou mais caracteres.
  verifyButton() {
    const { loginName } = this.state;
    const minimumNameLength = 3;
    if (loginName.length >= minimumNameLength) {
      this.setState({
        isLoginButtonDisabled: false,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
      });
    }
  }

  render() {
    const { onNameChange, onSaveLoginClick } = this;
    const { isLoginButtonDisabled, loginName, isLoading, willRedirect } = this.state;

    return (
      <div data-testid="page-login">
        { isLoading
          ? <Carregando />
          : (
            <div>
              <input
                data-testid="login-name-input"
                type="text"
                placeholder="Seu nome"
                value={ loginName }
                onChange={ onNameChange }
              />
              <br />
              <button
                disabled={ isLoginButtonDisabled }
                type="reset"
                data-testid="login-submit-button"
                onClick={ onSaveLoginClick }
              >
                Entrar
              </button>
            </div>
          )}
        { willRedirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
