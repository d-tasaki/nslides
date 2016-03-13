var { ButtonToolbar, Button, ButtonInput, Input } = ReactBootstrap;

var ActionBox = React.createClass({
    getDefaultProps() {
        return {
            default_comments: [
                "うｐ乙",
                "ちょwwwwwwwwww",
                "みっくみっくにしてあげる〜♪",
                "にっこにっこにー",
                "ざわ…ざわ…",
                "バルス!!!!!!",
                "88888888888"
            ]
        };
    },

    render() {
        var buttons = this.props.default_comments.map(
            (default_comment, index) => (
                <Button key={index} bsStyle="info" bsSize="small" onClick={this.addComment} >{default_comment}</Button>
            )
        );

        return (
            <div className="action_box">
              <form>
                <Input type="textarea" onKeyDown={ this.keyDown } placeholder="コメント" rows={1} />
                <ButtonInput type="submit" onClick={ this.addComment } value="コメントする" bsStyle="warning" />
              </form>
              <ButtonToolbar>
                {buttons}
              </ButtonToolbar>
            </div>
        );
    },

    keyDown(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            // ShiftキーなしのEnterキーが押された場合
            this.addComment(event);
        }
    },

    addComment(event) {
        event.preventDefault();
        var comment = {
            page_id:       this.props.current_page.id,
            body:          event.target.textContent || event.target.form[0].value,
            recorded_time: this.props.getElapsedTime()
        };
        if (comment.body) App.slide.addComment(comment);
        if (event.target.form) event.target.form[0].value = "";
    },

    none: undefined
});
