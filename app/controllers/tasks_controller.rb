class TasksController < ApplicationController
	def new
		@task = Task.new
		@tasks = Task.all
	end

	def create
		task = Task.new(desc: params['desc'])
		task.save!
		render text: task.desc
	end

	def index
		@tasks = Task.all
	end
end