var SlideShow = React.createClass({
    getInitialState() {
        return {
            started_at: (new Date).getTime(),
            current_page_num: this.props.current_page_num,
            elapsed_time: 0,
            acts_as: "viewer",

            slide: this.props.slide,
            pages: this.props.pages,
            comments: []
        };
    },

    componentDidMount() {
        this.createChannel();
        this.fetchComments();
        this.interval = setInterval(this.updateElapsedTime, 200);
    },

    componentWillUnmount() {
        clearInterval(this.interval);
    },

    render: function() {
        var current_page = this.getCurrentPage();

        return (
            <div className="slide_show">
              <TopMenu />
              <SlideBox
                 slide={this.state.slide}
                 current_page={current_page}
                 comments={this.state.comments}
                 acts_as={this.state.acts_as}
                 setActsAs={this.setActsAs}
                 getElapsedTime={this.getElapsedTime} />
              <ActionBox current_page={current_page} getElapsedTime={this.getElapsedTime} />
            </div>
        );
    },

    // ActionCable用チャネルの作成
    createChannel() {
        App.slide = App.cable.subscriptions.create(
            { channel: "SlideChannel", slide_id: this.state.slide.id },
            {
                // ActionCableが接続されたときのコールバック
                connected() {
                },

                // ActionCableが切断されたときのコールバック
                disconnected() {
                },

                // ActionCableが受信したときのコールバック
                received(data) {
                    console.log("recieved!", data);
                    var next_state = this.mergeData(data);
                    var callback;
                    if (next_state.current_page_num && next_state.current_page_num != this.state.current_page_num) {
                        // ページが変更されていたらコメントを取得
                        callback = this.fetchComments;
                    }
                    this.setState(next_state, callback);
                },

                addComment(comment) {
                    this.perform('add_comment', { comment: comment });
                },

                prevPage(current_page) {
                    this.perform('goto_prev_page', { page_id: current_page.id });
                },

                nextPage(current_page) {
                    this.perform('goto_next_page', { page_id: current_page.id });
                },

                none: undefined
            }
        );
        App.slide.received = App.slide.received.bind(this);
    },

    fetchComments() {
        $.ajax({
            url: "/slides/" + this.props.slide.id + "/comments.json",
            data: { page_num: this.state.current_page_num },
            dataType: "json"
        }).done(
            (data) => { this.setState(this.mergeData(data)); }
        ).fail(
            (data) => { console.log("Failed to fetch comments", data); }
        );
    },

    mergeData(data) {
        var ret = {};

        if (data.comment) {
            ret.comments = this.mergeComments([data.comment]);
        }
        if (data.comments) {
            ret.comments = this.mergeComments(data.comments);
        }
        if (data.current_page_num) {
            ret.current_page_num = data.current_page_num;
        }
        if (data.started_at) {
            ret.started_at = data.started_at;
        }
        return ret;
    },

    // mergeSlide(slide_data) {
    //     var ret = {};
    //     for (var key in slide_data) {
    //         if (key == "pages") {
    //             ret[key] = this.mergePages(slide_data[key]);
    //         } else {
    //             ret[key] = slide_data[key];
    //         }
    //     }
    //     return ret;
    // },

    // mergePages(pages_data = []) {
    //     var ret = [];
    //     pages_data.forEach(
    //         (page_data) => {
    //             var state_page = this.getPage({page_id: page_data.page_id});
    //             if (state_page) {
    //                 // 現在のstateにページデータが登録されている場合はマージ
    //                 var ret_page = {};
    //                 for (var key in page_data) {
    //                     if (key == "comments") {
    //                         ret_page[key] = this.mergeComments(page_data[key], state_page.comments);
    //                     } else {
    //                         ret_page[key] = page_data[key];
    //                     }
    //                 }
    //                 ret.push(ret_page);
    //             } else {
    //                 // 現在のstateにページデータが登録されていない場合はまるごと追加
    //                 ret.push(page_data);
    //             }
    //         }
    //     );
    //     return ret;
    // },

    mergeComments(comments_data) {
        // 重複チェック用に現在のコメントIDを取得
        var ids = this.state.comments.map((comment) => comment.id);

        return comments_data.reduce(
            (ret, comment) => {
                if (ids.indexOf(comment.id) >= 0) {
                    // 重複するコメントデータは追加しない
                    return ret;
                } else {
                    // 重複してないコメントデータを追加
                    return ret.concat(comment);
                }
            },
            this.state.comments || []).sort((a, b) => (b.recorded_time - a.recorded_time));
    },

    getPage(options) {
        if (options.page_num) {
            return this.state.pages.find((page) => (page.num == options.page_num));
        } else if (options.page_id) {
            return this.state.pages.find((page) => (page.num == options.page_id));
        } else {
            return undefined;
        }
    },

    getCurrentPage() {
        return this.getPage({page_num: this.state.current_page_num});
    },

    getElapsedTime() {
        return (new Date).getTime() - this.state.started_at;
    },

    updateElapsedTime() {
        this.setState({elapsed_time: this.getElapsedTime()});
    },

    setActsAs(acts_as) {
        switch(acts_as) {
        case "presenter":
        case "audience":
        case "viewer":
            this.setState({ acts_as });
            break;
        default:
            console.log("Unkown arg for setActsAs(): #{acts_as}");
        }
    },

    none: undefined

});
