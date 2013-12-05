BackbonePortfolio::Application.routes.draw do
  resources :users
  resources :projects
  resources :skills
get '/login_with_facebook', :to => 'users#authorise_facebook', :as => :login_with_facebook
get '/facebook_oauth_callback', :to => 'users#facebook_oauth_callback', :as => :facebook_oauth_callback
get '/users/:id/likes', :to => 'users#likes', :as => :user_likes
get '/users/:id/repos', :to => 'users#repos', :as => :user_repos
get '/login_with_github', :to => 'users#authorise_github', :as => :login_with_github
get '/github_oauth_callback', :to => 'users#github_oauth_callback', :as => :github_oauth_callback
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
