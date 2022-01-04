import multer from "multer";

export let blogImagesPaths = "";

const imgExt = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const blogImgStorage = multer.diskStorage({
    filename:  (req, file, callback) => {
        const imgName = file.originalname.split('.')[0].toLowerCase().split(' ').join('-');
        const ext = imgExt[file.mimetype];
        blogImagesPaths = "b-" + imgName + '-' + Date.now() + '.' + ext;
        callback(null, blogImagesPaths);
    },
    destination: (req, file, callback) => {
        const validator = imgExt[file.mimetype];
        let err = new Error ("invalid image type");
        if (validator) {
            err = null;
        };
        callback(err, "images/blogImages");
    }
});

const blogImages = multer({storage: blogImgStorage}).single("image_url");

export default blogImages;
      