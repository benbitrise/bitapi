# BitAPI

CLI tool for interacting with Bitrise API.

## Usage

### CLI
`node cli/bit.js --help`

### As a node module

`npm install bitapi`

Example usage:

```javascript
const  = require('bitapi/core/builds');

builds.list("token", "appSlug").then( builds => {
    console.log(JSON.stringify(builds))
})
```