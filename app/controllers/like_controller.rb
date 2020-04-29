class LikeController < ApplicationController
  before_action :set_campaign, only: [:show]
  before_action :set_like, only: [:update]

  def show
    @like = Like.where(campaign: @campaign, user: current_user)
    render json: @like
  end

  def create
    @like = Like.new(like_params.merge(user: current_user))
    if @like.save
      render json: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def update
    if @like.update(like_params)
      render json: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  private

  def like_params
    params.require(:like).permit(:kind, :campaign_id)
  end

  def set_campaign
    @campaign = Campaign.find(params[:id])
  end

  def set_like
    @like = Like.find(params[:id])
  end
end
