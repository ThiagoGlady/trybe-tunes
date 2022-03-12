import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);

    this.state = {
      artistName: '',
      isButtonDisabled: true,
    };
  }

  onNameChange({ target }) {
    const { value } = target;
    this.setState({
      artistName: value,
    }, () => {
      if (value.length >= 2) {
        this.setState({
          isButtonDisabled: false,
        });
      } else {
        this.setState({
          isButtonDisabled: true,
        });
      }
    });
  }

  render() {
    const { artistName, isButtonDisabled } = this.state;
    const { onNameChange } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artistName">
            <input
              type="text"
              placeholder="Nome do Artista"
              data-testid="search-artist-input"
              value={ artistName }
              onChange={ onNameChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
