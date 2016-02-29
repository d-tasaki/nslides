class Page < ApplicationRecord
  belongs_to :slide

  def prev
    self.slide.pages.where(id: self.id-1).first
  end

  def next
    self.slide.pages.where(id: self.id+1).first
  end
end
