require 'rails_helper'

RSpec.describe "slides/new", :type => :view do
  before(:each) do
    assign(:slide, Slide.new())
  end

  it "renders new slide form" do
    render

    assert_select "form[action=?][method=?]", slides_path, "post" do
    end
  end
end
