var { Input, OverlayTrigger, Table, Tooltip } = ReactBootstrap;

var SideBox = React.createClass({
    render() {
        var tooltip_presenter = (<Tooltip id="presenter">自身のページを遷移すると聴衆のページも遷移します</Tooltip>);
        var tooltip_audience  = (<Tooltip id="audience">発表者がページ遷移すると自身のページも遷移します</Tooltip>);
        var tooltip_viewer    = (<Tooltip id="viewer">発表者のページ遷移に影響されず自身のペースで閲覧できます</Tooltip>);

        var comments = this.props.comments.map(
            (comment) => (
                <tr key={comment.id}>
                  <td className="recordedTime">{comment.recorded_time / 1000}</td>
                  <td className="userName">匿名</td>
                  <td className="commentBody">{comment.body}</td>
                </tr>
            )
        );

        return (
            <div className="sideBox">
              <Input label="閲覧モード">
                <OverlayTrigger placement="bottom" overlay={tooltip_presenter}>
                  <label className="inline-item">
                    <input type="radio" onChange={this.changeActsAs} value="presenter" checked={this.props.acts_as == "presenter"} />
                    <span>発表者</span>
                  </label>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={tooltip_audience}>
                  <label className="inline-item">
                    <input type="radio" onChange={this.changeActsAs} value="audience" checked={this.props.acts_as == "audience"} />
                    <span>聴衆</span>
                  </label>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={tooltip_viewer}>
                  <label className="inline-item">
                    <input type="radio" onChange={this.changeActsAs} value="viewer" checked={this.props.acts_as == "viewer"} />
                    <span>閲覧者</span>
                  </label>
                </OverlayTrigger>
              </Input>

              <Input label="コメント">
                <Table striped condensed hover>
                  <thead>
                    <tr>
                      <td className="recordedTime">経過秒</td>
                      <td className="userName">発言者</td>
                      <td className="commentBody">コメント</td>
                    </tr>
                  </thead>
                  <tbody>
                    {comments}
                  </tbody>
                </Table>
              </Input>
            </div>
        );
    },

    changeActsAs(event) {
        var acts_as = event.target.value;
        this.props.setActsAs(acts_as);
    },

    none: undefined
});
