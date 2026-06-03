if ENV["PREVIEW_PLAIN_SECRETS"] == "1"
  app = Rails.application

  fallback_secret_key = "preview-insecure-secret-key-base"
  fallback_ar_key = "preview-ar-primary-key-please-change"
  fallback_ar_deterministic = "preview-ar-deterministic-key-please"
  fallback_ar_salt = "preview-ar-salt-please-change"

  preview_credentials = ActiveSupport::HashWithIndifferentAccess.new(
    active_record_encryption: {
      primary_key: ENV.fetch("ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY", fallback_ar_key),
      deterministic_key: ENV.fetch("ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY", fallback_ar_deterministic),
      key_derivation_salt: ENV.fetch("ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT", fallback_ar_salt)
    }
  )

  app.config.secret_key_base = ENV.fetch("SECRET_KEY_BASE", fallback_secret_key)

  app.config.active_record.encryption.primary_key = preview_credentials.dig(:active_record_encryption, :primary_key)
  app.config.active_record.encryption.deterministic_key = preview_credentials.dig(:active_record_encryption, :deterministic_key)
  app.config.active_record.encryption.key_derivation_salt = preview_credentials.dig(:active_record_encryption, :key_derivation_salt)

  app.singleton_class.prepend(Module.new do
    define_method(:credentials) do
      preview_credentials
    end
  end)
end
