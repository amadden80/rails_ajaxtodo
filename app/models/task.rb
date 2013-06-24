class Task < ActiveRecord::Base
  attr_accessible :name, :desc, :duedate, :priority_id

  belongs_to :priority

end
