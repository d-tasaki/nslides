var { Grid, Row, Col } = ReactBootstrap;

var SlideList = React.createClass({
    propTypes: {
        slides: React.PropTypes.array.isRequired
    },

    render() {
        return (
            <div className="slideList">
              <Grid>
                <Row>
                  <Col md={3}>
                    {this.getSlideCards(0)}
                  </Col>
                  <Col md={3}>
                    {this.getSlideCards(1)}
                  </Col>
                  <Col md={3}>
                    {this.getSlideCards(2)}
                  </Col>
                </Row>
              </Grid>
            </div>
        );
    },

    getSlideCards(index) {
        var card_num_in_a_col = Math.ceil(this.props.slides.length / 3);
        return this.props.slides.slice(index * card_num_in_a_col, (index+1) * card_num_in_a_col).map(
            (slide) => (
                <SlideCard key={slide.id} slide={slide} />
            )
        );
    },

    none: undefined
});
