var SlideBox = React.createClass({
    render: function() {
        return (
            <div className="slide_box">
              <Page
                 current_page={this.props.current_page}
                 acts_as={this.props.acts_as} />
              <CommentBox
                 comments={this.getCommentsForCurrentPage()}
                 getElapsedTime={this.props.getElapsedTime} />
              <SideBox
                 comments={this.getCommentsForCurrentPage()}
                 getElapsedTime={this.props.getElapsedTime}
                 acts_as={this.props.acts_as}
                 setActsAs={this.props.setActsAs} />
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
