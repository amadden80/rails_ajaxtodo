class Priority < ActiveRecord::Base
  attr_accessible :name, :urgency_index, :color

  has_many :tasks
end
