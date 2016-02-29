require 'rails_helper'

RSpec.describe "slides/index", :type => :view do
  before(:each) do
    assign(:slides, [
      Slide.create!(),
      Slide.create!()
    ])
  end

  it "renders a list of slides" do
    render
  end
end
