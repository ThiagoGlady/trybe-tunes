import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumData: [],
      favoriteSongs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;

    getMusics(match.params.id)
      .then((data) => {
        this.setState({
          albumData: [...data],
        });
      });

    this.setState({
      isLoading: true,
    });

    getFavoriteSongs()
      .then((favoriteList) => {
        this.setState({
          favoriteSongs: favoriteList,
          isLoading: false,
        });
      });
  }

  render() {
    const { albumData, favoriteSongs, isLoading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { isLoading
          && <Carregando />}
        { albumData[0]
          ? (
            <div>
              <p data-testid="artist-name">{ albumData[0].artistName }</p>
              <p data-testid="album-name">{ albumData[0].collectionName}</p>
              { favoriteSongs[0]
                && albumData.map((track, index) => (
                  <MusicCard
                    key={ index }
                    index={ index }
                    track={ track }
                    favoriteTracks={ favoriteSongs }
                  />
                ))}
              { favoriteSongs.length === 0
                && albumData.map((track, index) => (
                  <MusicCard
                    key={ index }
                    index={ index }
                    track={ track }
                    favoriteTracks={ [] }
                  />
                ))}
            </div>
          )
          : <Carregando />}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.number.isRequired,
};

export default Album;
