# Simple-JWT-Claim-Server
Getting JWT claims via endpoint

Based off of: https://github.com/auth0/jwt-decode

## Motivation

Too many libraries and online decoder but no way to quickly see if they are taking your token for malicious purposes. This repo uses no npm packages with the exception of express and node.

## Setup
0. Have nodejs installed https://nodejs.org/en/
1. 
```javascript
npm install
```
2.
```javascript
npm start
```
### Alternative
Go into index.js, and copy from where it says "START COPYING HERE" and stop at "STOP COPYING HERE" and paste it into whatever javascript place you want.

## Usage
```
host:3000/jwt=<your jwt token here>
```
### Example:
```
localhost:3000/jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```
returns
```
[{"alg":"HS256","typ":"JWT"},{"sub":"1234567890","name":"John Doe","admin":true}]
```
### For Alternative Setup
```javascript
>>> getClaims("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ")
[{"alg":"HS256","typ":"JWT"},{"sub":"1234567890","name":"John Doe","admin":true}]
```
