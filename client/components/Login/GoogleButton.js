import React, { PropTypes } from 'react';

class GoogleLogin extends React.Component {
  static propTypes = {
    loginHandler: PropTypes.func.isRequired,
    clientID: PropTypes.string.isRequired,
    scopes: PropTypes.string
  }

  static defaultProps = {
    scopes: 'profile'
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.googleAsyncInit = () => {
      gapi.init({
        clientID: this.props.clientID,
        scopes: this.props.scopes
      });
    };

    const loadAsync = function async(d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;

      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//apis.google.com/js/client.js?&output=embed';
      fjs.parentNode.insertBefore(js, fjs);
    };

    loadAsync(document, 'script', 'google-platform');
  }

  handleClick = () => {
    const config = {
      'immediate': false,
      'client_id': this.props.clientID,
      'output': 'embed',
      'scope': this.props.scopes || 'https://www.googleapis.com/auth/plus.me'
    };
    const self = this;

    gapi.auth.authorize(config, function cb() {
      const response = gapi.auth.getToken();
      self.props.loginHandler(response);
    });
  }

  render() {
    return (
      <div>
        <button onClick={ this.handleClick }>
          Google Login
        </button>
      </div>
    );
  }
}

export default GoogleLogin;
