class TasksController < ApplicationController
	def new
		@task = Task.new
	end

	def index
		@tasks = Task.all
	end

	def create
		@task = Task.create(params[:task])
		@task.save!
		render :index
	end
end