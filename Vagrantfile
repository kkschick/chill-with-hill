Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise64"

  # Set up port forwarding
  config.vm.network :forwarded_port, guest: 5000, host: 5000
  config.vm.network :forwarded_port, guest: 3000, host: 3000

  # Host only network
  # config.vm.network "private_network"

  # Setup a synced folder from our working directory to /vagrant
  config.vm.provision "file", source:'./data.pgdump', destination:"/vagrant/data.pgdump"

  # Enable SSH agent forwarding so getting private dependencies works
  config.ssh.forward_agent = true


  # Load all our fragments here for any dependencies.
  


  # Set locale to en_US.UTF-8
  config.vm.provision "shell", inline: $script_locale

  # Install build environment
  config.vm.provision "shell", inline: $script_install, privileged: false

  config.vm.provider :parallels do |p, o|
    o.vm.box = "parallels/ubuntu-12.04"
  end
end

$script_locale = <<SCRIPT
  echo "Setting locale to en_US.UTF-8..."
  locale-gen en_US.UTF-8
  update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
SCRIPT

$script_install = <<SCRIPT
set -o nounset -o errexit -o pipefail -o errtrace


# Make it so that `vagrant ssh` goes directly to the correct dir
echo "cd /vagrant" >> /home/vagrant/.bashrc

# Configuring SSH for faster login
if ! grep "UseDNS no" /etc/ssh/sshd_config >/dev/null; then
  echo "UseDNS no" | sudo tee -a /etc/ssh/sshd_config >/dev/null
  sudo service ssh restart
fi

export DEBIAN_FRONTEND=noninteractive

echo "Adding apt repositories and updating..."
sudo apt-get update
sudo apt-get install -y python-software-properties software-properties-common apt-transport-https
sudo apt-get update
sudo apt-get install -y postgresql-9.1 postgresql-client-9.1 postgresql-contrib-9.1
sudo -u postgres createuser vagrant --superuser
sudo -u postgres createdb vagrant
cd /vagrant

SCRIPT
