class Comment < ApplicationRecord
  belongs_to :slide
  belongs_to :page
end
