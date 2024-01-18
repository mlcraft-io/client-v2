<p align="center"><a href="https://synmetrix.org"><img src="https://github.com/mlcraft-io/client-v2/blob/master/src/assets/logo_with_text.png" alt="Synmetrix" width="300px"></a></p>

[Website](https://synmetrix.org) • [Docs](https://docs.synmetrix.org/) • [Cube.js Models docs](https://cube.dev/docs/schema/getting-started) • [Docker Hub](https://hub.docker.com/u/mlcraft) • [Slack community](https://join.slack.com/t/mlcraft/shared_invite/zt-1x2gxwn37-J3tTvCR5xSFVfxwUU_YKtg)

# Synmetrix Client

This is a client-side of the Synmetrix project!

## Requirements

Before using the client-side of the project, ensure that you have the following components installed:

- **NodeJS:** Version 20.8.1 or higher.
- **Synmetrix Backend:** Ensure the [Synmetrix backend](https://github.com/mlcraft-io/mlcraft/) is properly set up and running.

## Installation

To install the client-side of the project, follow these steps:

```bash
# Clone the Synmetrix Client repository
git clone https://github.com/mlcraft-io/client-v2

# Navigate to the project directory
cd client-v2

# Install required packages using Yarn
yarn

# Start the client-side application
yarn start
```

After completing these steps, open your web browser and go to [](http://localhost:8000) to access the Synmetrix client.

## Usage

For detailed guidance on utilizing the Synmetrix client and exploring its features, please consult the [Synmetrix Documentation](https://docs.synmetrix.org/).

## Storybook Integration

Explore the interactive UI components and functionalities of the Synmetrix client using Storybook. Storybook provides a convenient environment to showcase and test UI components in isolation.

To launch Storybook, use the following command:

```bash
yarn storybook
```
Once the command is executed, navigate to [](http://localhost:6007)

## Code Linting

Maintain code consistency and quality in the Synmetrix client by implementing linting. Follow these steps to configure linting in Visual Studio Code (VS Code):

### Requirements:

- [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Configuration:

1. Install ESLint and Prettier VS Code extensions.
2. Open your VS Code settings (settings.json) and add the following configuration:
```json
{
  ...
  "eslint.enable": true,
  "eslint.format.enable": true,
  "editor.formatOnSave": true
}
```
This configures VS Code to run ESLint and Prettier on file save.

## Conventional Commits

We adhere to the Conventional Commits specification to ensure consistent and meaningful commit messages. The structure of our commits follows the pattern:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```


For a detailed understanding of Conventional Commits, refer to the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

## Testing

Ensure the reliability and correctness of the Synmetrix client by utilizing testing functionalities powered by Vitest. Vitest provides a robust testing framework to validate the behavior of your components and functionalities.

To run tests, use the following command:

```bash
yarn test
```
Executing this command will initiate the testing suite, allowing you to assess the client's performance and functionality. Any detected issues or failures will be highlighted, providing valuable insights for debugging and maintaining code quality.

## Build

Efficiently build and package the Synmetrix client with the following commands:

- **Build the Client:**
  ```bash
  yarn build
  ```
  This command utilizes Vite to build the Synmetrix client.

- **Post-Build Tasks:**
  ```bash
  yarn postbuild
  ```
  After the build, this command creates compressed archives (<b>dist.tar.gz</b> and <b>dist.zip</b>) of the generated distribution files.

- **Build Storybook:**
  ```bash
  yarn build-storybook
  ```
  Use this command to build the Storybook for the client.

- **Serve the Built Client Locally:**
  ```bash
  yarn serve
  ```
  This command previews the built client locally using Vite.

Incorporate these commands into your workflow to streamline the build process and prepare the Synmetrix client for deployment.

  