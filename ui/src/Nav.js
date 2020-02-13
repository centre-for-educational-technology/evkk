import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connectedComponent} from "./util/redux-utils";
import {getStatusIfNeeded} from "./rootActions";
import {selectStatus} from "./rootSelectors";

class Nav extends Component {

  componentDidMount() {
    this.props.getStatusIfNeeded();
  }

  renderUserMenu = () => {
    if (!this.props.status.loggedInEmailAddress) {
      return (
        <li className="nav-item">
          <Link to="/login" className={'nav-link'}>Logi sisse</Link>
        </li>
      );
    } else {
      return (
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown">
            {this.props.status.loggedInEmailAddress}
          </a>
          <div className="dropdown-menu">
            <Link to="/profile" className={'dropdown-item'}>Profiil</Link>
            <Link to="/files" className={'dropdown-item'}>Minu failid</Link>
            <Link to="/logout" className={'dropdown-item'}>Logi välja</Link>
          </div>
        </li>
      );
    }
  };

  render() {
    if (!this.props.status) return null;

    return (
      <div className={'container'} style={{marginTop: '1em'}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className={'navbar-brand'}>EVKK</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/about" className={'nav-link'}>Mis on EVKK</Link>
              </li>
              <li className="nav-item">
                <Link to="/employees" className={'nav-link'}>Töötajad</Link>
              </li>
              <li className="nav-item">
                <Link to="/resources" className={'nav-link'}>Materjalid</Link>
              </li>
              <li className="nav-item">
                <Link to="/links" className={'nav-link'}>Kasulikud lingid</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                  Tööriistad
                </a>
                <div className="dropdown-menu">
                  <Link to="/tools/minitorn-pikkus" className={'dropdown-item'}>Teksti pikkus</Link>
                  <Link to="/tools/char-counter" className={'dropdown-item'}>Sümbolite lugeja</Link>
                  <Link to="/tools/masinoppe-ennustus" className={'dropdown-item'}>Masinõppe ennustus</Link>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {this.renderUserMenu()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: selectStatus()(state)
});

const mapDispatchToProps = {getStatusIfNeeded};

export default connectedComponent(Nav, mapStateToProps, mapDispatchToProps);
