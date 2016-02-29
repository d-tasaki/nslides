# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
class SlideChannel < ApplicationCable::Channel
  def subscribed
    stream_from "slide_channel_#{params[:slide_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def add_comment(data)
    data = data.with_indifferent_access
    comment = slide.comments.create(data[:comment])
    CommentBroadcastJob.perform_later(comment, params)
  end

  def goto_prev_page(data)
    data = data.with_indifferent_access
    current_page = Page.find(data[:page_id])
    prev_page = current_page.prev
    PageBroadcastJob.perform_later(prev_page, params) if prev_page
  end

  def goto_next_page(data)
    data = data.with_indifferent_access
    current_page = Page.find(data[:page_id])
    next_page = current_page.next
    PageBroadcastJob.perform_later(next_page, params) if next_page
  end

  private

  def slide
    @slide ||= Slide.find(params[:slide_id])
  end
end
