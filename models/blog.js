import mongoose from "mongoose";

let blogSchema = mongoose.Schema;

const blog_Schema = new blogSchema ({

    title: {type: String, required: true},
    category: {type: String, required: true},
    post_date: {type: String, required: true},
    image_url: {type: String, required: true},
    banner: {type: String, required: true},
    body: {type: String, required: true},
    footing: {type: String},
    authorName: {type: String, required: true},
    author_title: {type: String, required: true},
    authorImage: {type: String, required: true},
    authorFacebook: {type: String},
    authorTwitter: {type: String},
    authorLinkedIn: {type: String}
    
});

const Blog = mongoose.model('Blog', blog_Schema);

export default Blog;
