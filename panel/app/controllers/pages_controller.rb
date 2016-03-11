class PagesController < ApplicationController
  before_action :set_slide, only: [:index, :show]
  before_action :set_pages, only: [:index, :show]
  before_action :set_page,  only: [:show]

  # GET /slides/:slide_id/pages
  # GET /slides/:slide_id/pages.json
  def index
  end

  # GET /slides/:slide_id/pages/:id
  # GET /slides/:slide_id/pages/:id.json
  def show
  end

  private

  def set_slide
    @slide = Slide.find(params[:slide_id]) if params[:slide_id]
  end

  def set_pages
    @pages = @slide.pages
  end

  def set_page
    @page = @slide.pages.where(num: params[:id]).first
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def page_params
    params.fetch(:page, {})
  end
end
