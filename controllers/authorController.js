import asyncHandler from 'express-async-handler';
import Author from '../models/author.js';
import { authorImagesPaths }  from "../utils/authorImages.js";

const getAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find();
    if (authors) {
        res.status(200).send(authors);
    } else {
        res.status(404);
        throw new Error('no authors found');
    };
});

const deleteAuthor = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        await Author.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Author deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Author not found');
    }
});

const getAuthorById = asyncHandler(async (req, res) => {
    const author = await Author.findOne({ _id: req.params.id });
    if (author) {
        res.status(200).json(author);
    } else {
        res.status(404);
        throw new Error('author not found');
    }
});

const addAuthor = asyncHandler(async (req, res) => {
    let URL = req.protocol + '://' + req.get("host") + '/';
    let authorImgPath = URL + 'authorImages/' + authorImagesPaths;

    const author = new Author({
        authorName: req.body.authorName,
        author_title: req.body.author_title,
        authorImage: authorImgPath,
        authorFacebook: req.body.authorFacebook,
        authorTwitter: req.body.authorTwitter,
        authorLinkedIn: req.body.authorLinkedIn
    })
    author.save();
    res.status(201).json({
        message: "Author added successfully"
    });
});

const updateAuthor = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        let updatedAuthor = new Author({
            _id: req.params.id,
            authorName: req.body.authorName,
            author_title: req.body.author_title,
            authorImage: req.body.authorImage,
            authorFacebook: req.body.authorFacebook,
            authorTwitter: req.body.authorTwitter,
            authorLinkedIn: req.body.authorLinkedIn
        });
        if (authorImagesPaths != "") {
            let URL = req.protocol + '://' + req.get("host") + '/';
            let authorImgPath = URL + 'authorImages/' + authorImagesPaths;
            updatedAuthor.authorImage = authorImgPath;
        };
        Author.updateOne({ _id: req.params.id }, updatedAuthor).then(() => {
            res.status(200).json({ message: "Updated successfully!" });
        });
    } else {
        res.status(404);
        throw new Error('Author not found');
    }
});

export {
    getAuthors,
    deleteAuthor,
    getAuthorById,
    updateAuthor,
    addAuthor
};
