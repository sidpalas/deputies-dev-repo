username = ENV.fetch("SEED_ADMIN_USERNAME", "admin")
password = ENV.fetch("SEED_ADMIN_PASSWORD", "password")

User.find_or_initialize_by(username: username).tap do |user|
  user.password = password
  user.password_confirmation = password
  user.save!
end
