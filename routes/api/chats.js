'use strict';

const Router = require('express').Router;
const DB = require('../../lib/db');
const url = require('url');

let router = Router();
let db = new DB();

// todo: validation of input .
// todo: authentication and security .

/* GET chats listing.
* query string parameters: personid. for example 1 - Pazit , 2 - Moran.
* response:
* {
*       chats:[{
*               "id":1,
*               "name":"Moran Green",
*               "type":"person",
*               "image":"https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-1/p200x200/22228310_10155837578624577_8204812522299214248_n.jpg?_nc_cat=0&oh=0db7e72da8e6804dc878de993b6513a2&oe=5BB6A8DE",
*               "lastMessage":{
*                   "sender":{
*                       "id":2,
*                       "name":"Moran Green"},
*                       "text":"Hello pazit",
*                       "date":1530792060000}
*               },{
*                   "id":1,
*                   "name":"melchat",
*                   "type":"group",
*                   "image":"https://sistersdailyblog.files.wordpress.com/2017/05/sisters.jpg",
*                   "lastMessage":{
*                       "sender":{
*                           "id":3,
*                           "name":"melchat"},
*                       "text":"Lets call it melchat...",
*                       "date":1530689520000}
*                   }]
* */
router.get('/', (req, res, next) => {
    let query = url.parse(req.url, true).query;

    db.getChats(query.personid).then( chats => {
        res.json({chats});
    }).catch( err => {
        console.log(err);
        res.status(500).send({ error: err })
    });
});

/* chat details view
    list of messages with contact, group or person
    response:
    {
        messages: [{
            "sender":{
                "id":1,
                "name":"Pazit Flekman"},
            "text":"Hello moran, whats up?",
            "date":1530789300000},
         {
            "sender":{
                "id":2,
                "name":"Moran Green"},
            "text":"Hello pazit",
            "date":1530792060000
          }]
    }
*/

//todo: add contact data to response for example contact name .
router.get('/:contactid', (req, res, next) => {
    let contactid = req.params.contactid;
    let query = url.parse(req.url, true).query;

    db.getMessages(query.personid, contactid).then( messages => {
        res.json({messages});
    }).catch( err => {
        console.log(err);
        res.status(500).send({ error: err })
    });

});

module.exports = router;
