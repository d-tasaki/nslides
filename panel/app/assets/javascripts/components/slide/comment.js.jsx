var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Comment = React.createClass({
    propTypes: {
        comment: React.PropTypes.shape({
            body:          React.PropTypes.string.isRequired,
            recorded_time: React.PropTypes.number.isRequired,
            page_id:       React.PropTypes.number,
            id:            React.PropTypes.number
        }),
        elapsed_time:  React.PropTypes.number.isRequired
    },

    render() {
        var top = (this.props.comment.id % 10) * 300.0 / 10.0 + "px";
        return (
            <span className="comment" style={{top: top}}>
              <ReactCSSTransitionGroup transitionName="comment" transitionAppear={true} transitionAppearTimeout={7000} transitionEnter={false} transitionLeave={false} >
                <span key={"comment_" + this.props.comment.id}>
                  {this.nl2br(this.props.comment.body)}
                </span>
              </ReactCSSTransitionGroup>
            </span>
        );
    },

    nl2br(text) {
        var regex = /(\n)/g;
        return text.split(regex).map((line) => {
            if (line.match(regex)) {
                return React.createElement('br');
            } else {
                return line;
            }
        });
    },

    none: undefined
});
