import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Album extends Component {
  render() {
    const { match } = this.props;
    return (
      <div data-testid="page-album">
        Id:
        { match.params.id }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.number.isRequired,
};

export default Album;
