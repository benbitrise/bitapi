# BitAPI

CLI tool for interacting with [Bitrise  API](https://api-docs.bitrise.io/#/build-artifact/artifact-show).

## Usage

### CLI
`node cli/bit.js --help`

### As a node module

`npm install bitapi`

Example usage:
3
```javascript
const  = require('bitapi/core/builds');

builds.list("token", "appSlug").then( builds => {
    console.log(JSON.stringify(builds))
})
```

## CI

CI workflow is defined in [bitrise.yml](./bitrise.yml).
