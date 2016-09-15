class ListsController < ApplicationController
	skip_before_action :verify_authenticity_token
	before_action :set_board

  def index
  	@lists = @board.lists.all.by_newest
  end

	def create
		list = @board.lists.new(list_params)
		if list.save
			render json: list
		else
			render json: {errors: list.errors}, status: 401
		end
	end

	def update
		list = @board.lists(list_params)
		if list.update
			render json: list
		else
			render json: {errors: list.errors}, status: 401
		end
	end

	def destroy
		@board.list.destroy

		render json: {message: 'List Destroyed!'}
	end

  private
    def set_board
    	@board = Board.find(params[:board_id])
    end

		def list_params
			params.require(:list).permit(:name, :board_id)
		end
end
