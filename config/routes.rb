Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users
  
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
end
