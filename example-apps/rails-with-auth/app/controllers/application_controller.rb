class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  helper_method :current_user, :authenticated?

  private

  def current_user
    return @current_user if defined?(@current_user)

    @current_user = User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def authenticated?
    current_user.present?
  end

  def require_authentication
    return if authenticated?

    redirect_to new_session_path, alert: "You need to sign in to continue."
  end
end
