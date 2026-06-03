class User < ApplicationRecord
  has_secure_password

  normalizes :username, with: ->(username) { username.strip.downcase }

  validates :username, presence: true, length: { minimum: 3, maximum: 40 },
    uniqueness: { case_sensitive: false }
end
