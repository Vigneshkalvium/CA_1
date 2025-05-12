const express = require('express');
const User = require('./schema');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/signup',async(req,res)=>{
    try{

        const {name,email,password,dob} = req.body;
        if(!email || !password || !name || !dob){
            return res.status(400).send('All fields are required');
        }
        if (password.length < 8 && password.length >16) {
            return res.status(400).send('Password must be at least 8 characters and maximum 16 characters');
        } 
        const user = new User({name,email,password,dob});
        await user.save();
        res.send(user);
    }catch(e){
        res.send(e);
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});