var SlideNew = React.createClass({
    render() {
        return (
            <div className="slideNew">
              <TopMenu />
              <SlideForm slide={this.props.slide} authenticity_token={this.props.authenticity_token} />
            </div>
        );
    },

    none: undefined
});
