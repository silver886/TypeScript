# TypeScript

This is Typescript template.

## Content

- Dockerfile
- GitHub Actions
- jest
- webpack
- express
- tsoa

## Getting Started

### Dev Container

System requirements:

- [WSL 2 (Windows only)][^1]
- [Docker CE/EE 18.06+][^2]
- [Visual Studio Code][^3] with [Dev Containers][^4]
  - We recommend to install [Remote Development][^5] instead.

This project provides a Visual Studio Code Dev Container with all dependencies and extensions pre-installed.
Please follow the [setup instructions][^6] to configure Visual Studio Code.

With Visual Studio Code setup, you will be prompted to open the repo in a Dev Container, or you can choose `Dev Containers: Reopen in Container` from the Visual Studio Code command palette.

[^1]: https://docs.microsoft.com/en-us/windows/wsl/install
[^2]: https://docs.docker.com/install/#supported-platforms
[^3]: https://code.visualstudio.com/
[^4]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
[^5]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
[^6]: https://code.visualstudio.com/docs/remote/containers-tutorial

### Local Development

System requirements:

- [Node.js][^7] >= 16.13.0
  - We recommend using a version in Active LTS.
- [pnpm][^8] >= 7.0.0

We recommend that you use [Visual Studio Code][^3] to work on the CDK.
We use `prettier` and `eslint` to keep our code consistent in terms of style and reducing defects.
We recommend installing the extensions for [prettier][^9] and [eslint][^10] as well.

[^7]: https://nodejs.org/
[^8]: https://pnpm.io/
[^9]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[^10]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
