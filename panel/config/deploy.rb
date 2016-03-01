# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'panel'
set :repo_url, 'git@github.com:devchick/nslides.git'

# Default branch is :master
ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/app/nslides/panel'

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml', 'config/cable.yml', '.env')

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'tmp/sessions', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
set :default_env, { path: "/usr/local/rbenv/shims:/usr/local/rbenv/bin:/usr/local/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 5

# capistrano/rbenv
set :rbenv_type, :system
set :rbenv_ruby, '2.3.0'

# capistrano/bundler
set :bundle_path, -> { shared_path.join('vendor', 'bundle') }
set :bundle_binstubs, nil
#set :bundle_without, %w{development test deployment}.join(' ')
set :bundle_without, %w{test deployment}.join(' ')
set :bundle_flags, '--deployment --quiet'

# capistrano/git/sub_directory_strategy
set :git_strategy, Capistrano::Git::SubDirectoryStrategy
set :project_root, 'panel'

# capistrano3-puma
set :nginx_use_ssl, false

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
