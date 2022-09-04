import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connectedComponent} from "./util/redux-utils";
import {getStatusIfNeeded} from "./rootActions";
import {selectStatus} from "./rootSelectors";
import i18n from "i18next";

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
          <a className="nav-link dropdown-toggle" href="?" role="button" data-toggle="dropdown">
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
          <button className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarCollapse"
                  aria-controls="navbarCollapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/about" className={'nav-link'}>Mis on EVKK</Link>
              </li>
              <li className="nav-item">
                <Link to="/resource" className={'nav-link'}>Ressurss</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/sonarakendus/paring.html" rel="noopener noreferrer" target="_blank">Päring</a>
              </li>
              {/*
              <li className="nav-item">
                <Link to="/resources" className={'nav-link'}>Materjalid</Link>
              </li>
              <li className="nav-item">
                <Link to="/links" className={'nav-link'}>Kasulikud lingid</Link>
              </li>
              */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle"
                   href="?"
                   role="button"
                   data-toggle="dropdown">
                  Tööriistad
                </a>
                <div className="dropdown-menu">
                  <Link to="/correction"
                        className={'dropdown-item'}>Tekstihindaja</Link>
                  <Link to="/tools/clusterfinder"
                        className={'dropdown-item'}>Keelemustrite leidja</Link>
                  <a className="dropdown-item"
                     href="/sonarakendus/home.html"
                     rel="noopener noreferrer"
                     target="_blank">Sõnasagedus & kontekst</a>
                  {/*<a className="dropdown-item" href="/tools/clusterfinder" rel="noopener noreferrer">Keelemustrite leidja</a>*/}
                  {/*<Link to="/tools/masinoppe-ennustus" className={'dropdown-item'}>Masinõppe ennustus</Link>*/}
                  <Link to="/tools/wordanalyser"
                        className={'dropdown-item'}>Sõnaanalüsaator</Link>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/employees"
                      className={'nav-link'}>Töötajad</Link>
              </li>
              <li className="nav-item">
                <a href="https://evkk.tlu.ee/vers1/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className={'nav-link'}>Vana versioon <i className="fas fa-external-link-alt"/></a>
              </li>
              {this.props.location.pathname === '/tools/wordanalyser' ?
                <li className="nav-item dropdown lang-dropdown">
                  <a className="nav-link dropdown-toggle"
                     href="?"
                     role="button"
                     data-toggle="dropdown">
                    <i className="fas fa-globe"/> Muuda keelt
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item"
                       href="#"
                       onClick={() => {
                         i18n.changeLanguage('et')
                       }}>
                      <img src={require('./resources/flags/est.png').default}
                           alt='EST'/> EST
                    </a>
                    <a className="dropdown-item"
                       href="#"
                       onClick={() => {
                         i18n.changeLanguage('en')
                       }}>
                      <img src={require('./resources/flags/eng.png').default}
                           alt='ENG'/> ENG
                    </a>
                  </div>
                </li>
                : <></>}
            </ul>
            {/*
            <ul className="navbar-nav ml-auto">
              {this.renderUserMenu()}
            </ul>
             */}
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

export default connectedComponent(withRouter(Nav), mapStateToProps, mapDispatchToProps);
