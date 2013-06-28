class TasksController < ApplicationController

  before_filter :ordered_tasks, only: [:new, :update]

  def new
    @task = Task.new
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
      # render json: {task: task, priority: task.priority}
      respond_to do |format|
        format.js
      end
    else
      respond_to do |format|
        format.js { render status: 500, text: 'Server error' }
      end
    end
  end

  def increase_urgency
    task = Task.find(params[:id])
    task.increase_urgency #calls a new method defined in the Task model

    render json: task.priority #I don't really care about the task at this point, just what its new priority is
  end

  def decrease_urgency
    task = Task.find(params[:id])
    task.decrease_urgency #calls a new method defined in the Task model

    render json: task.priority
  end

  private
  def ordered_tasks
    @tasks = Task.joins(:priority).order('priorities.urgency_index DESC, name ASC' )
  end

end
