class BoardsController < ApplicationController
	# we aren't doing the standard rails form stuff
	# so DONT check for the authenticity token!!!
	skip_before_action :verify_authenticity_token
	before_action :set_board, only: [:update, :destroy]

  def index
  	@boards = Board.all.by_newest
  end

  def create
  	board = Board.new(board_params)
  	if board.save
  		# Basic HTML stuff
  		# redirect_to board_path(board)

  		# JSON Way
  		render json: board
  	else
  		# Basic HTML stuff
  		# render :new

  		# JSON Way
  		render json: {errors: board.errors}, status: 401
  	end
  end

  def update
  	if @board.update(board_params)
  		# Basic HTML
  		# redirect_to board_path(board)

  		# JSON way
  		render json: @board
  	else
  		# Basic HTML
  		# render :edit

  		# JSON Way
  		render json: {errors: @board.errors}, status: 401
  	end
  end

  def destroy
  	@board.destroy
  	# Basic HTML
  	# redirect_to boards_path

  	# JSON Way
  	render json: {message: 'Board Destroyed!'}
  end

  private
    def set_board
    	@board = Board.find(params[:id])
    end

    def board_params
    	params.require(:board).permit(:name)
    end
end
