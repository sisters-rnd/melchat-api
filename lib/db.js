'use strict';

const promise = require('bluebird');
const config = require('./config');

const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);

class db {
    constructor () {
        this.db = pgp(config.db);
    }

    getChats (personid) {
        return this.db.any(`select chats.contact_id, contacts.name, contact_types.contact_type, contacts.image, messages.sender, messages.text, messages.date, c2.id as sender_id, c2.name as sender_name
                            from chats
                                inner join contacts on chats.contact_id = contacts.id
                                inner join contact_types on contacts.contact_type = contact_types.id
                                inner join messages on messages.message_id = chats.last_message_id
                                inner join contacts c2 on chats.contact_id = c2.id
                            where person_id = $1`, [personid])
            .then(data => {
                return data.map(item => {
                    return {
                        id: item.contact_id,
                        name: item.name,
                        type: item.contact_type,
                        image: item.image,
                        lastMessage: {
                            sender: {
                                id : item.sender_id,
                                name: item.sender_name
                            },
                            text: item.text,
                            date: new Date(item.date).getTime()
                        }}
                });
            });
    }

    getMessages (personid, contactid) {
        return this.db.any(`select sender.id as sender_id, sender.name as sender_name, messages.text, messages.date
                            from messages
                                inner join contacts sender on sender.id = messages.sender
                            where sender in ($1,$2) and recipient in ($1,$2)`, [personid, contactid])
            .then(data => {
               return data.map(item => {
                   return {
                       sender: {
                           id : item.sender_id,
                           name: item.sender_name
                       },
                       text: item.text,
                       date: new Date(item.date).getTime()
                   }
               });
                return data;
            });
    }
}

module.exports = db;