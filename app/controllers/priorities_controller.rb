class PrioritiesController < ApplicationController
  def new
    @priority = Priority.new
    @priorities = Priority.all
  end
  def create
    priority = Priority.new(params[:priority])
    priority.save!
    #Instead of rendering text, I render JSON so that the priority and all of its attributes are available
    #in the data variable in my javascript callback function
    render json: priority
  end
end