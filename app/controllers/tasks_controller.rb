class TasksController < ApplicationController
	def new
		@task = Task.new
	end

	def create
		@task = Task.new(desc: params['desc'])
		@task.save!
		render nothing: true
	end
end