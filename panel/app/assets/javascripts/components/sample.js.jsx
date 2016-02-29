var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Sample = React.createClass({
  getInitialState: function() {
    return {
      value: '(´・ω・｀)'
    };
  },
  onClick: function() {
    var value = this.state.value === '(´・ω・｀)' ? '(｀･ω･´)ゞ' : '(´・ω・｀)';
    this.setState({ value: value });
  },
  render: function() {
    var value = <span className="sample" key={this.state.value}>{this.state.value}</span>; 
    return (
      <div>
        <div>Animation!!<button onClick={this.onClick}>click!!</button></div>
        <CSSTransitionGroup transitionName="sample" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
          {value}
        </CSSTransitionGroup>
      </div>
    );
  }
});
