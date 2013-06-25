class Priority < ActiveRecord::Base
  attr_accessible :name, :urgency_index, :color, :task_ids

  has_many :tasks
end
