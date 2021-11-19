# BitAPI

CLI tool for interacting with [Bitrise  API](https://api-docs.bitrise.io/#/build-artifact/artifact-show).

## Usage

### CLI
```
node cli/bit.js --help
node cli/bit.js init
node cli/bit.js config 
node cli/bit.js config app set <your_app_id>
node cli/bit.js config token set <your_personal_access_token>
```



### As a node module

`npm install bitapi`

Example usage:

```javascript
const  = require('bitapi/core/builds');

builds.list("token", "appSlug").then( builds => {
    console.log(JSON.stringify(builds))
})
```

## CI

CI workflow is defined in [bitrise.yml](./bitrise.yml).


sdsdsdsdssd
