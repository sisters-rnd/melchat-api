'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const host = 'http://localhost:3000';

chai.use(chaiHttp);

describe('chats api tests', () => {
    describe('/chats', () => {
        it('get chats for person=1 pazit', (done) => {
            let personid = 1;
            chai.request(host)
                .get(`/api/chats?personid=${personid}`)
                .end((err, response) => {
                    expect(response.status).to.equal(200);
                    expect(response).to.have.status(200);
                    let chats = response.body.chats;
                    expect(chats).to.be.a('array');
                    expect(chats.length).to.be.above(0);
                    expect(chats).to.be.an('array').that.is.not.empty;
                    let chat = chats[0];
                    expect(chat).to.have.property('id');
                    expect(chat).to.have.property('name');
                    expect(chat).to.have.property('type');
                    expect(chat.type).to.equal('person');
                    expect(chat).to.have.property('image');
                    expect(chat).to.have.property('lastMessage');
                    let lastMessage = chat.lastMessage;
                    expect(lastMessage).to.have.property('text');
                    expect(lastMessage).to.have.property('date');
                    expect(lastMessage).to.have.property('sender');
                    let sender = lastMessage.sender;
                    expect(sender).to.have.property('id');
                    expect(sender).to.have.property('name');
                    done();
                });
        });
    });
    describe('/chats/{contact_id}', () => {
        it('get chat with specific contact (group/person) for person=1 pazit', (done) => {
            let personid = 1;
            let contactid = 2;
            chai.request(host)
                .get(`/api/chats/${contactid}?personid=${personid}`)
                .end((err, response) => {
                    expect(response.status).to.equal(200);
                    expect(response).to.have.status(200);
                    let messages = response.body.messages;
                    expect(messages).to.be.a('array');
                    expect(messages.length).to.be.above(0);
                    expect(messages).to.be.an('array').that.is.not.empty;
                    let message = messages[0];
                    expect(message).to.have.property('text');
                    expect(message).to.have.property('date');
                    expect(message).to.have.property('sender');
                    let sender = message.sender;
                    expect(sender).to.have.property('id');
                    expect(sender).to.have.property('name');
                    done();
                });
        });
    });
});

