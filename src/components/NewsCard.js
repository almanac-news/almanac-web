import React from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardTitle from 'material-ui/lib/card/card-title'
import { Link } from 'react-router'

export class NewsCard extends React.Component {
  static propTypes = {
    url : React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    abstract: React.PropTypes.string.isRequired,
    browser: React.PropTypes.object.isRequired,
    date: React.PropTypes.number
  }

  /**
   * Invoked in component render function, will return based on browser size
   * @return {[type]} [description]
   */
  responsiveRender() {
    if (this.props.browser.lessThan.small) {
      return (
        <CardText>{ this.props.title }</CardText>
      )
    } else {
      return (
        <CardTitle title={ this.props.title } subtitle={ this.props.abstract } />
      )
    }
  }

  render() {
    return (
      <Card>
        <Link to={'/news/' + this.props.url.slice(-7) }>
          { this.responsiveRender() }
        </Link>
      </Card>
    )
  }
}

export default NewsCard
