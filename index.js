const express = require('express');
const app = express();
const socket = require('socket.io');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 5000


app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

//build version will appear here
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get("/test", (req, res) => {
    res.send("App is Running");
})

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = socket(server, {
    cors : true,
    origin : ['http://localhost:5000']
});


io.on('connection', (client)=>{

    client.on('join', (roomid)=>{
        client.join(roomid);
    })

    client.on('codeChange', (e)=>{
        client.broadcast.to(e.roomid).emit('codeChange', e.data);
    })

    client.on('changeLanguage', (e)=>{
        client.broadcast.to(e.roomid).emit('changeLanguage', e.data);
    })
    
    client.on('changeInput', (e)=>{
        client.broadcast.to(e.roomid).emit('changeInput', e.data);
    })

    client.on('changeOutput', (e)=>{
        client.broadcast.to(e.roomid).emit('changeOutput', e.data);
    })
})