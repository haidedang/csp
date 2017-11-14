# csp

**Summary** 

API for storing and filtering Security Header Violations. 

## Overview

API for storing Security Header Violation Reports and rendering them in HTML page for visual overview. 

## Installation
This is a [Node.js](https://nodejs.org/en/) module. 
Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Download this repository into you local machine and unzip. 

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```
$ npm install 
```

API uses MongoDB in order to store Header Reports. make sure to install MongoDB under default path: data/db
Run an instance with command mongod: 

```
$ mongod
```

Everything is set up now! Start the server with: 

```
$ npm run start  
```

To send an example violation report in your terminal to the API, use this curl request: 

```
$ curl -H "Content-Type: application/json" -X POST -d '{
    "__v": 0,
    "domain": "youtube.com",
    "document-uri": "http://youtube.com/Anderson_Peter.html",
    "blocked-uri": "http://peterg.com/css/styles.css",
    "violated-directive": "style-src cdn.example.com",
    "date": "Tue Nov 14 2017 12:04:51",
    "_id": "5a0acdd3c29e28034474d364"
}' http://localhost:4000/csp

```
## Contributors

Hai Duc Dang
