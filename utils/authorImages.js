import multer from "multer";

export let authorImagesPaths = "";

const imgExt = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const authorImgStorage = multer.diskStorage({
    filename:  (req, file, callback) => {
        const imgName = file.originalname.split('.')[0].toLowerCase().split(' ').join('-');
        const ext = imgExt[file.mimetype];
        authorImagesPaths = "a-" + imgName + '-' + Date.now() + '.' + ext;
        callback(null, authorImagesPaths);
    },
    destination: (req, file, callback) => {
        const validator = imgExt[file.mimetype];
        let err = new Error ("invalid image type");
        if (validator) {
            err = null;
        };
        callback(err, "images/authorImages");
    }
});

const authorImages = multer({storage: authorImgStorage}).single("authorImage");

export default authorImages;
      