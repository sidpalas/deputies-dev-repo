# README

## Preview setup (disposable)

- Use `mise run preview` to run a preview-style instance without `master.key`:
  `mise run preview`
- This enables plain env var secrets with `PREVIEW_PLAIN_SECRETS=1` using
  the dedicated `preview` Rails environment.
- Set these environment variables for preview:

  - `SECRET_KEY_BASE`
  - `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY`
  - `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY`
  - `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT`
  - `SEED_ADMIN_USERNAME` (optional)
  - `SEED_ADMIN_PASSWORD` (optional)

- The app runs in a dedicated `preview` environment profile that is loaded from
  `config/environments/preview.rb`.
