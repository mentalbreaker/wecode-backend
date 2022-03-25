const express = require('express');

//00.declare Error
class HTTPCustomError extends Error { 
    constructor(statusCode, message) { 
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

//구 문법
/*function customError(message = "",code) { 
    this.name = "customError";
    this.errorCode = code;
    this.message = message;
}
customError.prototype = new Error();*/

module.exports = { HTTPCustomError };