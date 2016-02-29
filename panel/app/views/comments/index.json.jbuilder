json.comments @comments do |comment|
  json.extract! comment, :id, :slide_id, :page_id, :recorded_time, :body
end
