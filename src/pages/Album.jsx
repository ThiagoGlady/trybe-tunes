import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumData: [],
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
  }

  render() {
    const { albumData } = this.state;
    console.log(albumData);
    return (
      <div data-testid="page-album">
        <Header />
        { albumData[0]
          ? (
            <div>
              <p data-testid="artist-name">{ albumData[0].artistName }</p>
              <p data-testid="album-name">{ albumData[0].collectionName}</p>
              { albumData.map((track, index) => (
                <MusicCard
                  key={ index }
                  index={ index }
                  track={ track }
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
