class Task < ActiveRecord::Base
  attr_accessible :name, :desc, :duedate
end
