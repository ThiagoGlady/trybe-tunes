import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const {
      id,
      artistName,
      collectionName,
      artworkUrl100,
    } = this.props;
    const linkToAlbum = `/album/${id}`;

    return (
      <Link data-testid={ `link-to-album-${id}` } to={ linkToAlbum }>
        <div className="album-card">
          <img src={ artworkUrl100 } alt="Capa do Album" />
          <p>{ artistName }</p>
          <p>{ collectionName }</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  id: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default AlbumCard;
