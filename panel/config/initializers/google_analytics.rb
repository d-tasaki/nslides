case Rails.env
when 'production' then
  GA.tracker = ENV['GOOGLE_ANALITICS_TRACKER_ID']
when 'staging' then
  GA.tracker = ENV['GOOGLE_ANALITICS_TRACKER_ID']
else
  GA.tracker = nil
end
