var { Grid, Row, Col, Image, Input } = ReactBootstrap;

var SlideForm = React.createClass({
    render() {
        var is_persisted = (this.props.slide.id != undefined);
        var file_form;
        var delete_form;
        var method;
        var url;

        if (is_persisted) {
            delete_form = (
                <ButtonInput type="submit" bsStyle="danger" value="削除" />
            );
            method = "put";
            url = "/slides/" + this.props.slide.id;
        } else {
            file_form = (
                <Input type="file" name="slide[file]" label="PDF File" help="PDFファイルをアップロードしてください。pptやkeyは事前にPDFへの変換をお願いします。" />
            );
            method = "post";
            url = "/slides/";
        }

        return (
            <div className="slideForm">
              <Grid>
                <Row>
                  <Col md={4} >
                    <form action={url} method="post" encType="multipart/form-data" acceptCharset="UTF-8" >
                      <input type="hidden" name="utf8" value="✓" />
                      <input type="hidden" name="_method" value={method} />
                      <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
                      <Input type="text" name="slide[title]" label="Title" placeholder="タイトルを入力してください" defaultValue={this.props.slide.title} />
                      {file_form}
                      <ButtonInput type="submit" bsStyle="primary" value="保存" />
                    </form>
                    <form action={url} method="post" >
                      <input type="hidden" name="utf8" value="✓" />
                      <input type="hidden" name="_method" value="delete" />
                      <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
                      {delete_form}
                    </form>
                  </Col>
                  <Col md={4} >
                    <Image src={this.props.slide.thumbnail_src} width="100%" />
                  </Col>
                </Row>
              </Grid>
            </div>
        );
    },

    none: undefined
});
