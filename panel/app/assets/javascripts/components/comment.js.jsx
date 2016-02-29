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
//        slide_width:   React.PropTypes.number,
//        slide_height:  React.PropTypes.number
    },

    render() {
        var top = (this.props.comment.id % 10) * 300.0 / 10.0 + "px";
        return (
            <span className="comment" style={{top: top}}>
              <ReactCSSTransitionGroup transitionName="comment" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false} >
                <span key={"comment_" + this.props.comment.id}>
                  {this.props.comment.body}
                </span>
              </ReactCSSTransitionGroup>
            </span>
        );
    },

    // getDefaultProps() {
    //     return ({
    //         slide_width:  800,
    //         slide_height: 600
    //     });
    // },

    // // 文字列表示領域の幅
    // getWidth() {
    //     return this.props.comment.body.length * 20;
    // },

    // getX() {
    //     return (this.props.slide_width + this.getWidth()) * (1.0 - (this.props.elapsed_time - this.props.comment.recorded_time) / 3000.0) - this.getWidth();
    // },

    // getY() {
    //     return 0;
    // },

    // shouldComponentUpdate() {
    //     return (this.getX() + this.getWidth() >= 0);
    // },

    __render() {
        return (
            <div className="comment" style={{
                     left:  this.getX(),
                     top:   this.getY(),
                     width: this.getWidth(),
                     position: 'absolute'
                 }}>
              {this.props.comment.body}
            </div>
        );
    },

    none: undefined
});
