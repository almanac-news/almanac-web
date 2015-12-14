import React from 'react';
import Card from 'material-ui/lib/card/card';
// import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import { Link } from 'react-router';

// TODO: Disabled these elements since they are not being used
// import CardActions        from 'material-ui/lib/card/card-actions';
// import CardExpandable     from 'material-ui/lib/card/card-expandable';
// import CardHeader         from 'material-ui/lib/card/card-header';
// import CardMedia          from 'material-ui/lib/card/card-media';

export class NewsCard extends React.Component {
  static propTypes = {
    url : React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    abstract: React.PropTypes.string.isRequired,
    date: React.PropTypes.number
  }

  render () {
    return (
      <Card>
        <CardTitle title={ this.props.title } subtitle={ this.props.abstract } />
        <Link to={'/news/' + this.props.url.slice(-6) }>Read More</Link>
      </Card>
    );
  }
}

export default NewsCard;
