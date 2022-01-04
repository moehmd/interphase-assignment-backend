import asyncHandler from 'express-async-handler';
import Blog from '../models/blog.js';
import { blogImagesPaths }  from "../utils/blogImages.js";

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().sort({ post_date : -1});
    if (blogs) {
        res.status(200).send(blogs);
    } else {
        res.status(404);
        throw new Error('no blogs found');
    };
});

const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({_id: req.params.id});
        if (blog) {
              res.status(200).json(blog);
        } else {
            res.status(404).send([]);
            throw new Error('blog not found');
        }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne({_id:req.params.id})
    res.status(200).json({ message: 'Blog deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

const addBlog = asyncHandler(async (req, res) => {
    let URL = req.protocol + '://' + req.get("host") + '/';
    let blogImgPath = URL + 'blogImages/' + blogImagesPaths;

    const blog = new Blog({
        title: req.body.title,
        category: req.body.category,
        post_date: req.body.post_date,
        image_url: blogImgPath,
        banner: req.body.banner,
        body: req.body.body,
        footing: req.body.footing,
        authorName: req.body.authorName,
        author_title: req.body.author_title,
        authorImage: req.body.authorImage,
        authorFacebook: req.body.authorFacebook,
        authorTwitter: req.body.authorTwitter,
        authorLinkedIn: req.body.authorLinkedIn,
    });
    blog.save(); 

    if (blog) {
        res.status(201).json({
            message: "post added successfully"
        });
    } else {
        res.status(500).json({
            message: "could not add blog"
        });
    };
});

const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        let updatedBlog = {
            _id: req.params.id,
            title: req.body.title,
            category: req.body.category,
            image_url: req.body.image_url,
            post_date: req.body.post_date,
            banner: req.body.banner,
            body: req.body.body,
            footing: req.body.footing,
            authorName: req.body.authorName,
            author_title: req.body.author_title,
            authorImage: req.body.authorImage,
            authorFacebook: req.body.authorFacebook,
            authorTwitter: req.body.authorTwitter,
            authorLinkedIn: req.body.authorLinkedIn,
        };

        if (blogImagesPaths != "") {
            let URL = req.protocol + '://' + req.get("host") + '/';
            let blogImgPath = URL + 'blogImages/' + blogImagesPaths;
            updatedBlog.image_url= blogImgPath;
        };

        Blog.updateOne({_id: req.params.id}, updatedBlog).then(() => {
            res.status(200).json({message: "Updated successfully!"});
        });
    } else {
        res.status(404);
        throw new Error('Blog not found');
      };
});

export {
    getBlogs,
    deleteBlog,
    getBlogById,
    updateBlog,
    addBlog
};
