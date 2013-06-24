class CreatePriorities < ActiveRecord::Migration
  def change
    create_table :priorities do |t|
      t.integer :urgency_index
      t.string :name
      t.string :color

      t.timestamps
    end
  end
end
