class PageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(page, params)
    ActionCable.server.broadcast "slide_channel_#{params[:slide_id]}", { current_page_num: page.num, started_at: Time.now.to_i * 1000 }
  end
end
