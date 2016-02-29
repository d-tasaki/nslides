Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'slides#index'

  resources :slides do
    resources :comments
    resources :pages
  end

  resources :comments

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
end
