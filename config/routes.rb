Rails.application.routes.draw do
  root "home#index"

  # clearance routes
  resources :passwords, only: [:create, :new]
  resource :session, only: [:create]

  resources :users, controller: "users", only: [:create] do
    resource :password,
      controller: "passwords",
      only: [:edit, :update]
  end

  resources :playlists

  get "/sign_in" => "sessions#new", as: "sign_in"
  get "/sign_up" => "users#new", as: "sign_up"
  delete "/sign_out" => "clearance/sessions#destroy", as: "sign_out"

  namespace :api do
    jsonapi_resources :songs
  end

  mount LetterOpenerWeb::Engine, at: "/inbox" if Rails.env.development?
end
