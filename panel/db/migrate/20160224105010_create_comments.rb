class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.references :slide
      t.references :page
      t.integer :recorded_time
      t.text :body

      t.timestamps
    end
  end
end
