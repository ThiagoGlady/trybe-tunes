import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends Component {
  constructor() {
    super();
    this.setFavoriteTrack = this.setFavoriteTrack.bind(this);

    this.state = {
      isFavorite: false,
      isLoading: false,
    };
  }

  async setFavoriteTrack() {
    const { track } = this.props;

    await this.setState({
      isFavorite: true,
      isLoading: true,
    });

    await addSong(track);

    await this.setState({
      isLoading: false,
    });
  }

  render() {
    const {
      index,
      track,
    } = this.props;

    const { setFavoriteTrack } = this;

    const {
      isFavorite,
      isLoading,
    } = this.state;

    return (
      <div className="track-name">
        { index
          && (
            <>
              <p>{ track.trackName }</p>
              { isLoading
                ? <Carregando />
                : (
                  <label htmlFor="favorite-track">
                    Favorita
                    <input
                      type="checkbox"
                      checked={ isFavorite }
                      onClick={ setFavoriteTrack }
                      data-testid={ `checkbox-music-${track.trackId}` }
                    />
                  </label>
                )}
              <audio
                data-testid="audio-component"
                src={ track.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
            </>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  index: PropTypes.number.isRequired,
  track: PropTypes.string.isRequired,
};

export default MusicCard;
