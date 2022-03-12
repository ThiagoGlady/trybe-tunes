import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);
    this.searchArtist = this.searchArtist.bind(this);

    this.state = {
      artistName: '',
      isButtonDisabled: true,
      isLoading: false,
      foundArtist: false,
      foundAlbums: [],
      artistNameHolder: '',
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

  searchArtist() {
    const { artistName } = this.state;
    this.setState({
      isLoading: true,
      artistNameHolder: artistName,
    });

    searchAlbumsAPI(artistName)
      .then((albums) => {
        this.setState({
          foundAlbums: [...albums],
        }, () => {
          this.setState({
            isLoading: false,
            foundArtist: true,
          });
        });
      });

    this.setState({
      artistName: '',
    });
  }

  render() {
    const { artistName,
      isButtonDisabled,
      isLoading,
      foundArtist,
      foundAlbums,
      artistNameHolder,
    } = this.state;
    const { onNameChange, searchArtist } = this;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading
          ? <Carregando />
          : (
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
                  onClick={ searchArtist }
                >
                  Pesquisar
                </button>
              </label>
            </form>
          )}
        { foundArtist
          && (
            <div>
              <p>
                Resultado de Albuns de:
                { artistNameHolder }
              </p>
              { foundAlbums.map((album) => (
                <AlbumCard
                  key={ album.collectionId }
                  id={ album.collectionId }
                  artistName={ album.artistName }
                  collectionName={ album.collectionName }
                  artworkUrl100={ album.artworkUrl100 }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
