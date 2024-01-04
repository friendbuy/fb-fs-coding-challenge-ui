# Full Stack Coding Challenge (Front-end)

We have provided this project as a starting point for you to complete the front-end part of our full stack coding challenge.

Before starting, _**<ins>please fork this repo</ins>**_ where you will implement all of your work. When complete, you will submit a link to your forked repo.

## Installing node / yarn

You should use `nvm` to install node. This project requires node v20.

Go [here](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating) to install `nvm`.

Then run:

```
nvm install 20
npm install -g yarn
```

This installs node v20 and yarn as a global command.

## Installing dependencies

You shouldn't need any dependencies to complete the challenge other than the ones we have already provided. Install dependencies with the following command:

```
yarn install
```

## Running the project

We have provided an example server that implements enough functionality for you to display points balances for a given user. You must implement all functionality in your own server, in your preferred language/framework. The example server is simply provided so you can work on the front-end first if you prefer to work that way.

You can run the server with the following command:

```
yarn exampleServer
```

The example server runs on port `8080`. You can feel free to use another port in your server implementation, but note that you will need to update the existing API call in the front-end code that retrieves point balances if you do so. Also note that your server will need to allow cross-origin requests.

You can run the front-end with the following command:

```
yarn dev
```

The front-end will be served on port `5173` by default. Make sure to check the terminal output for the exact port as it may differ if something else is already using `5173`.

The page will automatically update as you save your code.

## Requirements

Please refer to the coding challenge prompt we provided you with for the requirements that you need to implement.
