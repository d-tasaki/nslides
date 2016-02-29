class CommentsController < ApplicationController
  before_filter :set_slide, :set_page

  def index
    @comments = @slide.comments.order(id: :desc).limit(1000)
    @comments = @comments.where(page_id: @page.id) if @page
  end

  private

  def set_slide
    @slide = Slide.find(params[:slide_id]) if params[:slide_id]
  end

  def set_page
    if params[:page_id]
      @page = Page.find(params[:page_id])
    elsif params[:page_num]
      @page = @slide.pages.where(num: params[:page_num]).first
    else
      # do nothing.
    end
  end

end
