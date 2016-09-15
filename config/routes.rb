# == Route Map
#
#          Prefix Verb   URI Pattern                                Controller#Action
#     lists_index GET    /lists/index(.:format)                     lists#index
#            root GET    /                                          boards#index
#     board_lists GET    /boards/:board_id/lists(.:format)          lists#index
#                 POST   /boards/:board_id/lists(.:format)          lists#create
#  new_board_list GET    /boards/:board_id/lists/new(.:format)      lists#new
# edit_board_list GET    /boards/:board_id/lists/:id/edit(.:format) lists#edit
#      board_list GET    /boards/:board_id/lists/:id(.:format)      lists#show
#                 PATCH  /boards/:board_id/lists/:id(.:format)      lists#update
#                 PUT    /boards/:board_id/lists/:id(.:format)      lists#update
#                 DELETE /boards/:board_id/lists/:id(.:format)      lists#destroy
#          boards GET    /boards(.:format)                          boards#index
#                 POST   /boards(.:format)                          boards#create
#       new_board GET    /boards/new(.:format)                      boards#new
#      edit_board GET    /boards/:id/edit(.:format)                 boards#edit
#           board GET    /boards/:id(.:format)                      boards#show
#                 PATCH  /boards/:id(.:format)                      boards#update
#                 PUT    /boards/:id(.:format)                      boards#update
#                 DELETE /boards/:id(.:format)                      boards#destroy
#

Rails.application.routes.draw do
	root 'boards#index'

	resources :boards do
		resources :lists do
			# DONT WORRY ABOUT THIS- BONUS
			# resources :items
		end
	end
end
