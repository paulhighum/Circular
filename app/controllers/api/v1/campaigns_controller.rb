class Api::V1::CampaignsController < Api::V1::BaseController

  before_action :set_campaign, only: [:show, :update, :destroy]

  def index
    @campaigns = Campaign.all
    json_response(@campaigns)
  end

  def create
    @campaign = Campaign.create(campaign_params)
    if @campaign.save
      json_response(@campaign, :created)
    else
      render json: { errors: @campaign.errors.messages }, status: :unprocessable_entity
    end
  end

  def show
    json_response(@campaign)
  end

  def update
    @campaign.update(campaign_params)
    head :no_content
  end

  def destroy
    @campaign.destroy
    head :no_content
  end

  def find
    @campaigns = Campaign.within_radius(250, params[:lat], params[:lng])
                         .order_by_distance(params[:lat], params[:lng])
    if @campaigns.empty?
      json_response({status: 'okay', results: nil})
    else
      json_response(@campaigns)
    end
  end

  private

  def campaign_params
    params.require(:campaignInfo).permit(:name, :lat, :lng)
          .merge(street_address: params['campaignInfo']['address'])
  end

  def set_campaign
    @campaign = Campaign.find(params[:id])
  end
end
