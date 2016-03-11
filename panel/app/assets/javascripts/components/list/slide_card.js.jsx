var { Thumbnail, Glyphicon } = ReactBootstrap;

var SlideCard = React.createClass({
    propTypes: {
        slide: React.PropTypes.shape({
            thumbnail_url: React.PropTypes.string,
            id:            React.PropTypes.number
        }).isRequired
    },

    render() {
        return (
            <div className="slideCard thumbnail">
              <a href={"/slides/" + this.props.slide.id}>
                <img src={this.props.slide.thumbnail_src} width={"100%"} />
              </a>
              <div className="caption">
                <h4>{this.props.slide.title}</h4>
                <div className="actions">
                  <a href={"/slides/" + this.props.slide.id + "/edit"} ><Glyphicon glyph="cog"      /></a>
                </div>
              </div>
            </div>
        );
    },

    none: undefined
});
