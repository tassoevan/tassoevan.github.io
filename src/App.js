import React, { Component } from 'react';
import regularIcons from '@fortawesome/fontawesome-free/sprites/regular.svg';
import brandsIcons from '@fortawesome/fontawesome-free/sprites/brands.svg';
import './App.css';
import icon from './icon.png';

class App extends Component {
  render() {
    return (
      <div className="App hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div>
              <img className="App__icon" src={icon} alt="" />
            </div>

            <h1 className="title">
              Tasso Evangelista
            </h1>
            <h2 className="subtitle">
              Front-end Engineer
            </h2>
          </div>
        </div>

        <div className="hero-foot">
          <nav className="tabs is-fullwidth">
            <div className="container">
              <ul>
                <li>
                  <a href="mailto:tasso@tassoevan.me">
                    <svg className="icon">
                      <use style={{ fill: 'currentColor' }} xlinkHref={`${ regularIcons }#envelope`}></use>
                    </svg>
                    <span className="is-hidden-touch is-hidden-desktop-only">tasso@tassoevan.me</span>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/tassoevan" rel="noopener noreferrer" target="_blank">
                    <svg className="icon">
                      <use style={{ fill: 'currentColor' }} xlinkHref={`${ brandsIcons }#twitter`}></use>
                    </svg>
                    <span className="is-hidden-touch is-hidden-desktop-only">@tassoevan</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/tassoevan" rel="noopener noreferrer" target="_blank">
                    <svg className="icon">
                      <use style={{ fill: 'currentColor' }} xlinkHref={`${ brandsIcons }#github`}></use>
                    </svg>
                    <span className="is-hidden-touch is-hidden-desktop-only">@tassoevan</span>
                  </a>
                </li>
                <li>
                  <a href="https://bitbucket.org/tassoevan" rel="noopener noreferrer" target="_blank">
                    <svg className="icon">
                      <use style={{ fill: 'currentColor' }} xlinkHref={`${ brandsIcons }#bitbucket`}></use>
                    </svg>
                    <span className="is-hidden-touch is-hidden-desktop-only">@tassoevan</span>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/tassoevan" rel="noopener noreferrer" target="_blank">
                    <svg className="icon">
                      <use style={{ fill: 'currentColor' }} xlinkHref={`${ brandsIcons }#linkedin`}></use>
                    </svg>
                    <span className="is-hidden-touch is-hidden-desktop-only">tassoevan</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default App;
