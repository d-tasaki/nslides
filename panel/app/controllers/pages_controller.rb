class PagesController < ApplicationController
  before_action :set_slide, only: [:show]
  before_action :set_page,  only: [:show]

  def show
  end

  private

  def set_slide
    @slide = Slide.find(params[:slide_id]) if params[:slide_id]
  end

  def set_page
    @page = @slide.pages.where(num: params[:id]).first
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def page_params
    params.fetch(:page, {})
  end
end
