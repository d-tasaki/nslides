var CommentBox = React.createClass({
    render() {
        var elapsed_time = this.props.getElapsedTime();
        var comments = this.props.comments.map(
            comment => {
                if (comment.recorded_time < elapsed_time && elapsed_time < comment.recorded_time + 5000) {
                    return (<Comment key={comment.id} comment={comment} elapsed_time={elapsed_time} />);
                } else {
                    return undefined;
                }
            }
        );

        return (
            <div className="comment_box">
              {comments}
            </div>
        );
    }
});
