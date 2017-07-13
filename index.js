const express = require('express');
const app = express();


const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
    this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function atob (input) {
    const str = String(input).replace(/=+$/, '');
    if (str.length % 4 === 1) {
        throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    // initialize result and counters
    let bc = 0, bs, buffer, idx = 0;
    let output = '';
    for (
        ;
        // get next character
        buffer = str.charAt(idx++);
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
    }
    return output;
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
            code = '0' + code;
        }
        return '%' + code;
    }));
}
function decodeJwt(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += "==";
            break;
        case 3:
            output += "=";
            break;
        default:
            throw "Illegal base64url string!";
    }

    try {
        return b64DecodeUnicode(output);
    } catch (err) {
        return atob(output);
    }
}
app.get('/', function (req, res, next) {
    let currentString = req.query["jwt"];
    if (req.query["jwt"].includes("Bearer ")){

        currentString = currentString.substring("Bearer ".length,currentString.length)
    }
    let strToReturn = [];
    let currentSplit = currentString.split('.');
    for (let split of currentSplit){
        try{
            strToReturn.push(JSON.parse(decodeJwt(split)));
        }catch(err){
        }
    }
    res.send(strToReturn);

});

app.listen(3000, function () {
    console.log('Listen on port 3000')
});
