const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://deepam:deepam12345@postapi.ihaqs.azure.mongodb.net/PostApi?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() =>{
  console.log('connected to database');
}).catch((err) =>{
  console.log('failed connected to database', err);
});
