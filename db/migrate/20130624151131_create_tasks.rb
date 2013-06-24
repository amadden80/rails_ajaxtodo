class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :desc

      t.timestamps
    end
  end
end
