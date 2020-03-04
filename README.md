# ensure-resolutions  

Syncs yarn's `resolutions` versions with `dependencies` and `devDependencies`.   
Useful for keeping yarn's resolutions up to date without using `yarn upgrade`.

```
// package.json
{
  "dependencies": {
    "react": "^16.8.2"
  },
  "resolutions": {
    "react": "16.2.0" // Will update React to dependencies version "16.8.2"
  }
}
```

## Installation  

Speeds up subsequent runs with npx

_using yarn_
```
yarn add -D ensure-resolutions  
```

_using npm_
```
npm i --dev ensure-resolutions  
```

## Usage

**package.json**
```json
{
  "name": "my-package",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "preinstall": "npx ensure-resolutions"
  }
}
```
