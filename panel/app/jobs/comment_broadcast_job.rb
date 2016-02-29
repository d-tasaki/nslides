class CommentBroadcastJob < ApplicationJob
  queue_as :default

  def perform(comment, params)
    ActionCable.server.broadcast "slide_channel_#{params[:slide_id]}", comment: comment
  end
end
