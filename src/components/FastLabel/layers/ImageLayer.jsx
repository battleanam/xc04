import React, { Component } from 'react';

class ImageLayer extends Component {

  canvas = React.createRef();

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  loadImage(src, afterImageLoaded) {
    const img = new Image();

  }

  componentDidMount() {
    const { src } = this.props;
  }

  render() {
    return <canvas ref={this.canvas}/>;
  }

}
