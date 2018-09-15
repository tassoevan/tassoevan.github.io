import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App hero is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">
              Tasso Evangelista
            </h1>
            <h2 class="subtitle">
              Front-end Engineer
            </h2>
          </div>
        </div>

        <div class="hero-foot">
          <nav class="tabs is-fullwidth">
            <div class="container">
              <ul>
                <li>
                  <a href="mailto:tasso@tassoevan.me">
                    E-mail
                  </a>
                </li>
                <li>
                  <a href="http://twitter.com/tassoevan" rel="noopener noreferrer" target="_blank">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="http://github.com/tassoevan" rel="noopener noreferrer" target="_blank">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="http://bitbucket.org/tassoevan" rel="noopener noreferrer" target="_blank">
                    Bitbucket
                  </a>
                </li>
                <li>
                  <a href="http://linkedin.com/in/tassoevan" rel="noopener noreferrer" target="_blank">
                    LinkedIn
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
