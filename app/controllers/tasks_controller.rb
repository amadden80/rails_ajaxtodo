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

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render json: task
  end

  def update
    task = Task.find(params[:id])
    if task.update_attributes(params[:task])
      render json: {task: task, priority: task.priority}
    else
      render text: 'ERROR WHILE UPDATING. CHECK RAILS SERVER LOG.'
    end
  end

  def increase_urgency
    task = Task.find(params[:id])
    task.increase_urgency #calls a new method defined in the Task model

    render json: task.priority
  end

  def decrease_urgency
    task = Task.find(params[:id])
    task.decrease_urgency #calls a new method defined in the Task model

    render json: task.priority
  end

end
