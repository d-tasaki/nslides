var SlideBox = React.createClass({
    render: function() {
        return (
            <div className="slide_box">
              <Page current_page={this.props.current_page} />
              <CommentBox comments={this.getCommentsForCurrentPage()} getElapsedTime={this.props.getElapsedTime}/>
            </div>
        );
    },

    getCommentsForCurrentPage() {
        return this.props.comments.filter(
            (comment) => (comment.page_id == this.props.current_page.id)
        );
    },

    none: undefined
});
