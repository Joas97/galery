import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Content extends Component {

  render() {
    const { body } = this.props;
    return (
      <div>
        { body }
      </div>
    );
  }
}

Content.propTypes = {
  body: PropTypes.object.isRequired
};

export default Content;
