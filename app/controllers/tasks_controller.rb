class TasksController < ApplicationController
	def new
		@task = Task.new
		@tasks = Task.all
	end

	def create
		binding.pry
		task = Task.new(name: params['name'], desc: params['desc'], duedate: params['duedate'])
		task.save!
		render text: task.desc
	end

	def index
		@tasks = Task.all
	end
end