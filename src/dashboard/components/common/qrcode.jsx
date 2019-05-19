/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import QRCode from 'qrcode';

export default class Qrcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
    this.handler = null;
  }

  componentDidMount() {
    QRCode.toDataURL(this.props.data, this.props.option).then((url) => {
      this.handler = setTimeout(() => {
        this.setState({
          url,
        });
      }, 0);
    });
  }

  componentWillReceiveProps(props) {
    if (props.data !== this.props.data) {
      QRCode.toDataURL(props.data, this.props.option).then((url) => {
        this.handler = setTimeout(() => {
          this.setState({
            url,
          });
        }, 0);
      });
    }
  }

  componentWillUnmount() {
    if (this.handler) clearTimeout(this.handler);
  }

  render() {
    return (
      <img src={this.state.url} alt={this.props.data} />
    );
  }
}
