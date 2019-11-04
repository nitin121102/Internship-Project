var mongoose=require("mongoose");
// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    name: String,
    logo: String,
    image: String,
    address:String,
    link:String,
    contact: String,
    api:String,
    cutoff_1:String,
    cutoff_2:String,
    cutoff_3:String,
    cutoff_4:String,
    cutoff_5:String,
    cutoff_6:String,
    cutoff_7:String,
    cutoff_8:String,
     comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
   
});
var Blog = mongoose.model("Blog", blogSchema);
module.exports = mongoose.model("Blog", blogSchema);
