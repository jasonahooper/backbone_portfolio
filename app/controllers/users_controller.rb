class UsersController < ApplicationController

  def index
    render :json => User.all
  end

  def show
    user = User.find(params[:id])
    render :json => user
  end

  def update
    user = User.find(params[:id])
    user.update_attributes!(user_params)
    render :nothing => true
  end

  def authorise_facebook
    permissions = %w(email publish_actions user_events manage_pages read_friendlists)
    redirect_to facebook_oauth_client.auth_code.authorize_url(
      :redirect_uri => facebook_oauth_callback_url, :scope => permissions.join(','))
  end

  def authorise_github
    redirect_to github_oauth_client.auth_code.authorize_url
  end

  def github_oauth_callback
    access_token = github_oauth_client.auth_code.get_token(params[:code],
      :parse => :query)
    token = access_token.token
    client = Octokit::Client.new :access_token => token

    @user = User.find_or_create_by_github_id!(client.user.id,
      :github_access_token => token,
      :first_name => client.user.id,
      :last_name => client.login
    )

    flash[:notice] = "Successfully logged in!"
    session[:user_id] = @user.id
    redirect_to '/'
  end

  def facebook_oauth_callback
    access_token = facebook_oauth_client.auth_code.get_token(params[:code],
      :redirect_uri => facebook_oauth_callback_url, :parse => :query)

    picture = access_token.get('me/picture')
    facebook_user = JSON(access_token.get('/me').body).symbolize_keys

    @user = User.find_or_create_by_facebook_id!(facebook_user[:id],
      :facebook_access_token => access_token.token,
      :first_name => facebook_user[:first_name],
      :last_name => facebook_user[:last_name],
      :bio => facebook_user[:bio],
      :image_url => picture.response.env[:url].to_s
    )

    flash[:notice] = "Successfully logged in!"
    session[:user_id] = @user.id
    redirect_to '/'
  end

  def likes
    oauth_access_token = User.find(params[:id]).facebook_access_token
    @graph = Koala::Facebook::API.new(oauth_access_token)
    render :json => @graph.get_connections('me','likes')
  end

  def repos
    token = User.find(params[:id]).github_access_token
    client = Octokit::Client.new :access_token => token
    repos = client.repos
    render :json => repos.map { |m| { 'name' => m.name } }
  end

  private

  def facebook_oauth_client
    @facebook_oauth_client ||= OAuth2::Client.new(
      BackbonePortfolio::Application.config.facebook_app_id,
      BackbonePortfolio::Application.config.facebook_secret,
      :site => 'https://graph.facebook.com',
      :token_url => '/oauth/access_token'
    )
  end

  def github_oauth_client
    @github_oauth_client ||= OAuth2::Client.new(
      BackbonePortfolio::Application.config.github_client_id,
      BackbonePortfolio::Application.config.github_client_secret,
      :site => 'https://github.com',
      :authorize_url => 'login/oauth/authorize',
      :token_url => '/login/oauth/access_token'
    )
  end

  def user_params
    params.permit(:first_name, :last_name, :bio, :mission, :image_url)
  end

end
