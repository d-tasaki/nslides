class AddStatusColumnToSlides < ActiveRecord::Migration[5.0]
  def change
    add_column :slides, :status, :string
  end
end
