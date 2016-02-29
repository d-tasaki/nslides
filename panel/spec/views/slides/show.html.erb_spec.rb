require 'rails_helper'

RSpec.describe "slides/show", :type => :view do
  before(:each) do
    @slide = assign(:slide, Slide.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
