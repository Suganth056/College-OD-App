// const express = require('express');

const mysql = require('mysql');

const db=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'lionel30',
    database:'odDatabase'
})

module.exports = db;

