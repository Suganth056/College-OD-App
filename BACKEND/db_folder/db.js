// const express = require('express');

const mysql = require('mysql');

const db=mysql.createConnection({
    host:"bsu4rvus5qbmd89ahfd8-mysql.services.clever-cloud.com",
    user:'un7gknu0mqisuj9r',
    password:'m9Z3OhlhE6KBZMeBEWmu',
    database:'bsu4rvus5qbmd89ahfd8'
})

module.exports = db;

