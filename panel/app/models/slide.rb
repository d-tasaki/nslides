class Slide < ApplicationRecord
  has_many :pages, -> { order(:num) }
  has_many :comments

  VALID_STATUSES = [
    :queued,
    :enabled,
    :deleted,
  ]

  scope :enabled, -> { where(status: :enabled) }
  scope :not_deleted, -> { where(status: VALID_STATUSES.reject { |st| st == :deleted }) }

  def as_json(options = {})
    super(options.merge(methods: [:thumbnail_src]))
  end

  def enabled?
    self.status == "enabled".freeze
  end

  def thumbnail_src
    self.pages.first.try(:image_src)
  end

end
