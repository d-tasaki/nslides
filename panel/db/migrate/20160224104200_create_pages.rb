class CreatePages < ActiveRecord::Migration[5.0]
  def change
    create_table :pages do |t|
      t.references :slide
      t.integer :num
      t.string :image_src
      t.integer :width
      t.integer :height

      t.timestamps
    end
  end
end
