const {Schema, model} = require("mongoose")

const esquemaubi = Schema({
    title: {
        type: String,
        
    },
    direccion : {
        type: String,
    }
},
{
    versionKey: false
  }
);

module.exports = model('lat', esquemaubi)