# ensure-resolutions  

Updates package.json resolutions used by yarn

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