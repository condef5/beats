Rails.application.routes.draw do
  root "home#index"

  namespace :api do
    jsonapi_resources :songs
  end
end
