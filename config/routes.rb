Ajaxtodo::Application.routes.draw do
  root :to => 'home#index'
  resources :tasks, only: [:new, :index, :create]
end
