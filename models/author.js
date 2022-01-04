import mongoose from "mongoose";

let authorSchema = mongoose.Schema;

const author_Schema = new authorSchema ({
    authorName: {type: String, required: true},
    author_title: {type: String, required: true},
    authorImage: {type: String, required: true},
    authorFacebook: {type: String},
    authorTwitter: {type: String},
    authorLinkedIn: {type: String}
});

const Author = mongoose.model('Author', author_Schema);

export default Author;
