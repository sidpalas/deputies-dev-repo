# Preview Environment

Use this project’s preview mode for temporary environments that do not keep
`config/master.key` or Rails encrypted credentials.

- Required runtime flags:
  - `RAILS_ENV=preview`
  - `PREVIEW_PLAIN_SECRETS=1`
- Recommended key env vars:
  - `SECRET_KEY_BASE`
  - `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY`
  - `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY`
  - `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT`
- Optional seed vars:
  - `SEED_ADMIN_USERNAME`
  - `SEED_ADMIN_PASSWORD`

## Preview environment profile

- Dedicated profile: `config/environments/preview.rb`
- Use this profile when running in ephemeral preview hosts like `*.deputies.localhost` or `*.daytonaproxy01.net`.
- Add host rule and disable Rails origin checks for that proxy path there:

```ruby
config.hosts << /\A([a-zA-Z0-9-]+\.)*deputies\.localhost\z/
config.hosts << /\Alocalhost(?::\d+)?\z/
config.hosts << "127.0.0.1"
config.hosts << /\A[a-zA-Z0-9-]+\.daytonaproxy01\.net\z/
config.action_controller.forgery_protection_origin_check = false
```

- Allow `127.0.0.1` as a host name, not as a port-specific host. Rails string
  hosts already match optional ports, so use `config.hosts << "127.0.0.1"`
  instead of `config.hosts << "127.0.0.1:3000"`.

## Start preview server

- Default shortcut:

```bash
mise run preview
```

- Direct command:

```bash
mise exec -- env PREVIEW_PLAIN_SECRETS=1 RAILS_ENV=preview bin/rails server
```

For production-like host/port binding, use your normal Rails options on the same
command:

```bash
mise exec -- env PREVIEW_PLAIN_SECRETS=1 RAILS_ENV=preview bin/rails server -b 0.0.0.0 -p 3000
```

## Prepare preview database

```bash
mise exec -- env RAILS_ENV=preview PREVIEW_PLAIN_SECRETS=1 bundle exec bin/rails db:prepare
mise exec -- env RAILS_ENV=preview PREVIEW_PLAIN_SECRETS=1 bundle exec bin/rails db:seed
```

## Login

- Visit `/login` and sign in with the seeded admin account (or create one from
  `/signup`).
- Seed defaults come from `SEED_ADMIN_USERNAME` and `SEED_ADMIN_PASSWORD` if
  provided; otherwise `admin` / `password` are used.

Important: the env-backed preview mode is intentionally disposable. For persistent
environments, configure normal Rails credentials instead of the fallback preview
defaults.
