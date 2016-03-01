var { ButtonToolbar, Button, ButtonInput, Input } = ReactBootstrap;

var ActionBox = React.createClass({
    getDefaultProps() {
        return {
            default_comments: [
                "うｐ乙",
                "ちょwwwwwwwwwwwwwwwwwww",
                "みっくみっくにしてあげる〜♪",
                "バルス!!!!!!",
                "ざわ…ざわ…",
                "88888888888888888888888"
            ]
        };
    },

    render() {
        var buttons = this.props.default_comments.map(
            (default_comment, index) => (
                <Button key={index} bsStyle="info" onClick={this.addComment} >{default_comment}</Button>
            )
        );

        return (
            <div className="action_box">
              <ButtonToolbar>
                {buttons}
              </ButtonToolbar>
              <form>
                <Input type="text" onSubmit={ this.addComment } placeholder="コメント" />
                <ButtonInput type="submit" onClick={ this.addComment } value="コメントする" bsStyle="warning" />
              </form>
            </div>
        );
    },

    addComment(event) {
        console.log("addComment", event);
        event.preventDefault();
        var comment = {
            page_id:       this.props.current_page.id,
            body:          event.target.textContent || event.target.form[0].value,
            recorded_time: this.props.getElapsedTime()
        };
        if (comment.body) App.slide.addComment(comment);
    },

    none: undefined
});
