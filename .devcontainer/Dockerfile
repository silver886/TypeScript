FROM node:18-slim

SHELL ["/usr/bin/env", "DEBIAN_FRONTEND=noninteractive", "bash", "-o", "pipefail", "-c"]
RUN apt-get update -y

# Set locale
RUN apt-get -y install --no-install-recommends \
        locales \
    && perl -pi -e 's|^# (en_US.UTF-8.*)$|\1|g' /etc/locale.gen \
    && locale-gen

# zsh
RUN apt-get -y install --no-install-recommends \
        zsh \
    && chsh -s $(which zsh) $(whoami)

# Oh My Zsh
RUN apt-get -y install --no-install-recommends \
        ca-certificates \
        curl \
        git \
    && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" '' --unattended \
    && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-/root/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-/root/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Starship
RUN apt-get -y install --no-install-recommends \
        ca-certificates \
        curl \
    && curl -sS https://starship.rs/install.sh | sh -s -- --force

# bat and less
RUN apt-get -y install --no-install-recommends \
        bat \
        less \
    && ln -s /usr/bin/batcat /usr/local/bin/bat

# Overlay
COPY overlay /

# Clean up
RUN rm -rf /var/lib/apt/lists/*
ENTRYPOINT []
CMD ["/usr/bin/env", "zsh"]
