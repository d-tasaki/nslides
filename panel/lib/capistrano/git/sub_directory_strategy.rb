# see: https://gist.github.com/mitukiii/c2e74b29190c828309ab

require 'capistrano/git'

class Capistrano::Git
  module SubDirectoryStrategy
    include DefaultStrategy

    def release
      git :archive, fetch(:branch), fetch(:project_root), '| tar -x -C', release_path, "--strip=#{fetch(:project_root).count('/')+1}"
    end
  end
end
