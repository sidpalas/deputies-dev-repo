require_relative "development"

Rails.application.configure do
  # Allow preview and proxy hosts used by Deputies and Daytona sandboxes.
  config.hosts << /\A([a-zA-Z0-9-]+\.)*deputies\.localhost\z/
  config.hosts << /\Alocalhost(?::\d+)?\z/
  config.hosts << /\A[a-zA-Z0-9-]+\.daytonaproxy01\.net\z/

  # Some external preview proxies terminate TLS and rewrite origins in a way
  # that can trip Rails CSRF origin checks.
  config.action_controller.forgery_protection_origin_check = false
end
