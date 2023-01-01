# image-processing-api

A Node.js Image Processing API

This api receives image filename, edits images based on dimensions parsed in the query parameters and saves them in thumbs folder. It uses [sharp](https://www.npmjs.com/package/sharp) module to process the image.

## Setup

First clone the project here on github

```bash
git clone https://github.com/educhinski/image-processing-api.git
```

Install the dependencies

```bash
npm install
```

Run the project locally

```bash
npm run start
```

Run the production

```bash
npm run start:prod
```

Run the tests

```bash
npm run test
```

For style enforcing and formatting

```bash
npm run prettier && npm run lint
```

## Usage

The server will run on `localhost:3000/` and the api will be at `/api/images`

### Example usage

The following are the available filename:

- encenadaport
- fjord
- icelandwaterfall
- palmtunnel
- santamonica

Example queries

`http://localhost:3000/api/images?filename=fjord`

`http://localhost:3000/api/images?filename=fjord&width=200`

`http://localhost:3000/api/images?filename=fjord&height=200`

`http://localhost:3000/api/images?filename=fjord&width=300&height=300`
