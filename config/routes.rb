Rails.application.routes.draw do
  devise_for :users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  
  root to: "campaigns#index"

  resources :campaigns, only: [:index, :show]
  resources :like, only: [:show, :create, :update]
end
