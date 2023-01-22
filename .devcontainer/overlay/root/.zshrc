# Use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
HYPHEN_INSENSITIVE='true'

# Change the command execution time stamp shown in the history command output.
HIST_STAMPS='yyyy-mm-dd'

# History options
setopt EXTENDED_HISTORY
setopt APPEND_HISTORY
setopt HIST_REDUCE_BLANKS
setopt HIST_VERIFY
setopt INC_APPEND_HISTORY
setopt SHARE_HISTORY

# Expand history size
export HISTSIZE=0x7FFFFFFFFFFFFFFF
export SAVEHIST=0x7FFFFFFFFFFFFFFF

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Add wisely, as too many plugins slow down shell startup.
plugins=(
    zsh-autosuggestions
    zsh-syntax-highlighting

    vscode

    colored-man-pages
    colorize
    command-not-found
    dirhistory
    encode64
    genpass
    isodate
    nmap
    man
    perms
    ssh-agent
    thefuck
    transfer
    zsh-navigation-tools

    git
    git-auto-fetch
    git-prompt

    gh

    docker
    docker-compose
)

# Set preferred editor
export EDITOR='code --wait'

# Set git-auto-fetch interval
export GIT_AUTO_FETCH_INTERVAL=300

# Load Oh My Zsh
source $HOME/.oh-my-zsh/oh-my-zsh.sh

# Load Starship
eval "$(starship init zsh)"

clear
