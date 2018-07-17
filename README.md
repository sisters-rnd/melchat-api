*Get chats*
---
get chats for person
return array of chat for person. with (persons/groups).

* **URL:**   ```GET /chats```
  
*  **URL Params**

   **Required:**
 
   `personid=[integer]`

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
    ```json
              {
                    chats: [{
                      "id":1,
                      "name":"Moran Green",
                      "type":"person",
                      "image":"https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.0-1/p200x200/22228310_10155837578624577_8204812522299214248_n.jpg?_nc_cat=0&oh=0db7e72da8e6804dc878de993b6513a2&oe=5BB6A8DE",
                      "lastMessage":{
                          "sender":{
                              "id":2,
                              "name":"Moran Green"},
                              "text":"Hello pazit",
                              "date":1530792060000}
                      },{
                          "id":1,
                          "name":"melchat",
                          "type":"group",
                          "image":"https://sistersdailyblog.files.wordpress.com/2017/05/sisters.jpg",
                          "lastMessage":{
                              "sender":{
                                  "id":3,
                                  "name":"melchat"},
                              "text":"Lets call it melchat...",
                              "date":1530689520000}
                          }]
                  }
 
* **Sample Call:**
```js
    const axios = require('axios');


    axios.get('http://localhost:3000/api/chats?personid=1')
    .then(response => {
        console.log(response.status);
        let chats = response.data.chats;
        for (let chat of chats) {
            console.log(`chat with ${chat.name}: ${JSON.stringify(chat)}`);
        }
    });    

```

*Get chat*
---
get chat messages for person
return array of messages with contact.

* **URL:**   ```GET /chats```
  
*  **URL Params**

   **Required:**
 
   `personid=[integer]`

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** 
    ```json
              {
                    messages: []
              }
 
* **Sample Call:**
```js
    const axios = require('axios');


    axios.get('http://localhost:3000/api/chats/2?personid=1')
    .then(response => {
        console.log(response.status);
        let messages = response.data.messages;
        for (let message of messages) {
            console.log(`message with ${message.sender.name}: ${JSON.stringify(message)}`);
        }
    });    

```

