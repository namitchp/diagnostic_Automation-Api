
const multer=require("multer")
const path=require("path");
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, 'uploads');
    },
    // dest: './uploads/',
    filename: function(req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext == '.pdf') {
            var f_name = 'file';
        } else {
            var f_name = 'user';
        }
        cb(null, f_name + '-' + Date.now() + ext);
    },
});
// Define the maximum size for uploading
// picture i.e. 12 MB. it is optional
const maxSize = 12 * 1024 * 1024;
exports.upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function(req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|pdf/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(
            'Error: File upload only supports the ' +
            'following filetypes - ' +
            filetypes
        );
    },
});


