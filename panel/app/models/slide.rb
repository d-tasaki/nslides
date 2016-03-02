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

  def enabled?
    self.status == "enabled".freeze
  end

end
