var Page = React.createClass({
    render() {
        return (
            <div className="page">
              <img src={this.props.current_page.image_src} width={800} height={600} />
              <div className="prevPage" onClick={this.prevPage} />
              <div className="nextPage" onClick={this.nextPage} />
            </div>
        );
    },

    prevPage() {
        App.slide.prevPage(this.props.current_page);
    },

    nextPage() {
        App.slide.nextPage(this.props.current_page);
    },

    none: undefined
});
