class Task < ActiveRecord::Base
  attr_accessible :name, :desc, :duedate, :priority_id

  belongs_to :priority

  def increase_urgency
    current_urgency = self.priority.urgency_index

    higher_priorities = Priority.where('urgency_index > ?', current_urgency)
    if higher_priorities.any?
      self.priority = higher_priorities.first(order: 'urgency_index ASC') #Gets the lowest of the higher priorities
      self.save
    end

  end

  def decrease_urgency
    current_urgency = self.priority.urgency_index

    lower_priorities = Priority.where('urgency_index < ?', current_urgency)
    if lower_priorities.any?
      self.priority = lower_priorities.first(order: 'urgency_index DESC') #gets the highest of the lower priorities
      self.save
    end
  end

end
