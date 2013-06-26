class TasksController < ApplicationController
  def new
    @task = Task.new
    @tasks = Task.joins(:priority).order('priorities.urgency_index DESC, name ASC' )
    @priorities = Priority.all
  end

  def create
    task = Task.new(params[:task])
    task.save!
    #Instead of rendering text, I render JSON so that the task and all of its attributes are available
    #in the data variable in my javascript callback function
    render json: {task: task, priority: task.priority}
  end

end
