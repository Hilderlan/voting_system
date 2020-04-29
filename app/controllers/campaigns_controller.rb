class CampaignsController < ApplicationController
  before_action :set_campaigns, only: [:show]

  def index
    @campaigns = Campaign.all
  end

  def show
    set_likes_count if @campaign.blocked
  end

  private 

  def set_campaigns
    @campaign = Campaign.find(params[:id])
  end

  def set_likes_count
    @likes = @campaign.likes.where(kind: true).count
    @dislikes = @campaign.likes.where(kind: false).count
  end
end