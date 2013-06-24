source 'https://rubygems.org'

gem 'rails'
gem 'pg'
gem 'jquery-rails'
gem 'haml'

group :assets do
  gem 'sass-rails'
  gem 'coffee-rails'
  gem 'uglifier'
  gem 'zurb-foundation'
  gem 'foundation-icons-sass-rails'
end

#Debugging gems
group :development, :test do
  gem 'pry-rails'
  gem 'pry-debugger'
  gem 'pry-stack_explorer'
  gem 'annotate'
  gem 'quiet_assets'
  gem 'binding_of_caller'
  gem 'meta_request'
end

#Kept separate from the test group because it can cause errors in test
group :development do
  gem 'better_errors'
end
