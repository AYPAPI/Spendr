const pg = require('pg');
const express = require('express');
var app = express();
var username = 'backr@backr'
var password = 'cse110$$$'

const config = {
    host: 'backr.postgres.database.azure.com',
    user: username,     
    password: password,
    database: 'postgres',
    port: 5432,
    ssl: true
};
const client = new pg.Client(config);
var username = 'Brandon';
var tablename = 'groupmembers';

client.connect(err => {
    if (err) throw err;
    else {
      addUser(username,client,tablename);      
    }
});

function addUser(username,client,tablename){
  let query = 'INSERT INTO ' + tablename + ' (Name) values ($1)';
  client.query(query,[username], function(err,res) {
    if (err) throw err;
    else{
      console.log('inserted ' + username + ' into database')
    }
  })
}
             
