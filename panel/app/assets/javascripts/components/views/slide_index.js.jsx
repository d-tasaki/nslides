var SlideIndex = React.createClass({
    propTypes: {
        slides: React.PropTypes.array.isRequired
    },

    render() {
        return (
            <div className="slideIndex">
              <TopMenu />
              <SlideList slides={this.props.slides} />
            </div>
        );
    },

    none: undefined
});
