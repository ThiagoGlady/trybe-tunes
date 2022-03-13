import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      index,
      track,
    } = this.props;

    return (
      <div className="track-name">
        { index
          && (
            <>
              <p>{ track.trackName }</p>
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
