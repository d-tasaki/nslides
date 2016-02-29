class Slide < ApplicationRecord
  has_many :pages, -> { order(:num) }
  has_many :comments
end
