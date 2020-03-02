# ensure-resolutions  

Updates package.json resolutions used by yarn

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