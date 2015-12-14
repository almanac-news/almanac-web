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
    const { url, title, abstract } = this.props;

    return (
      <Card>
<<<<<<< 17ec7f1aace199ae7b5d80d15b96735befbc1390
        <CardTitle title={ title } subtitle={ abstract } />
        <Link to={'/news/' + url.slice(-7) }>Read More</Link>
=======
        <CardTitle title={ this.props.title } subtitle={ this.props.abstract } />
        <Link to={'/news/' + this.props.url.slice(-6) }>Read More</Link>
>>>>>>> Adding in data constants and reducers and NewsCard
      </Card>
    );
  }
}

export default NewsCard;
