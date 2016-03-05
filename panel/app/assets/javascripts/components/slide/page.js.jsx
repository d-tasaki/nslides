var Page = React.createClass({
    render() {
        var page_class = "page";
        if (this.props.current_page.width / this.props.current_page.height > 1.4) {
            page_class += " page-wide";
        }

        return (
            <div className={page_class}>
              <img src={this.props.current_page.image_src} width={600} />
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
