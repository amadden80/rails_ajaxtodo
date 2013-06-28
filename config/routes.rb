Ajaxtodo::Application.routes.draw do
  root to: 'home#index'
  #Notice that I am only including the resourceful routes that I am using, not all seven
  #index is only included because it appears to be necessary for form_for in some cases
  resources :tasks, only: [:new, :index, :create, :destroy, :update] do
    member do
      put :increase_urgency
      put :decrease_urgency
    end
  end
  resources :priorities, only: [:new, :index, :create]

end
