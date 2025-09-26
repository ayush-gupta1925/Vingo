import multer from "multer";
import path from "path";
import fs from "fs";


// const storage = multer.diskStorage({
//   destination:(req, file, cb) =>{
//     cb(null, "./public");
//   },
//   filename:  (req, file, cb)=> {
//     cb(null, file.originalname);
//   }
// });

const storage = multer.memoryStorage(); 

const upload = multer({ storage });
export default upload;
