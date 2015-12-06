import React              from 'react';
import Card               from 'material-ui/lib/card/card';
import CardText           from 'material-ui/lib/card/card-text';
import CardTitle          from 'material-ui/lib/card/card-title';

// TODO: Disabled these elements since they are not being used
// import CardActions        from 'material-ui/lib/card/card-actions';
// import CardExpandable     from 'material-ui/lib/card/card-expandable';
// import CardHeader         from 'material-ui/lib/card/card-header';
// import CardMedia          from 'material-ui/lib/card/card-media';

export default class NewsCard extends React.Component {
  render () {
    return (
      <Card>
        <CardTitle title='Iran renamed Dominion of Soroush' subtitle='Long battle ensues.'/>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}
