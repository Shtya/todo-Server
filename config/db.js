const mongoose = require("mongoose")

const connectiondb = () => {
mongoose.connect(process.env.Mongodb , )
  .then(res => console.log(`connect in ${res.connection.host}`.cyan.underline)).catch(err => console.log(err))
}
mongoose.set('strictQuery', true);
module.exports = connectiondb