import React, { Component } from 'react'

/* component styles */
// import styles from './styles';

/* authors */
const AUTHORS = ['tsaiDavid', 'sushiogoto', 'natelevine', 'smehraein']

export class Footer extends Component {
  render() {
    function renderGitHubFollowButton(user) {
      return (
        <a key={user}
           className='github-button' href={`https://github.com/${user}`}
           data-count-href={`/${user}/followers`}
           data-count-api={`/users/${user}#followers`}
           data-count-aria-label='# followers on GitHub'
           aria-label={`Follow @${user} on GitHub`}>
          @{user}
        </a>
      )
    }
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
            <a className='github-button'
               href='https://github.com/almanac-news/almanac-web-server'
               data-icon='octicon-star'
               data-count-href='/almanac-news/almanac-web-server/stargazers'
               data-count-api='/repos/almanac-news/almanac-web-server#stargazers_count'
               data-count-aria-label='# stargazers on GitHub'
               aria-label='Star almanac-news/almanac-web-server on GitHub'>
               Star
            </a>
              {
                AUTHORS.map((author) => renderGitHubFollowButton(author))
              }
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
