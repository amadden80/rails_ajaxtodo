class AddNameAndDueDateToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :duedate, :date
    add_column :tasks, :name, :string
  end
end
