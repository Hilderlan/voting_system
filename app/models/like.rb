class Like < ApplicationRecord
  belongs_to :campaign
  belongs_to :user

  before_update :is_blocked
 
  private
  
  # verifica se a campanha está bloqueada e aborta o update do Like
  def is_blocked
    if self.campaign.blocked
      throw(:abort)
    end
  end
end
