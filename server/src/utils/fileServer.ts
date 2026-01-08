import multer from "multer";
import path from "path";
import userUtils from "./userUtils";
import fs from "fs";

const fileServer = (options: Parameters<typeof multer>[0]) => {
  return multer(options);
};

const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const backgroundImageLimit = {
  fields: 5,
  fieldNameSize: 50, // TODO: Check if this size is enough
  fieldSize: 20000, //TODO: Check if this size is enough
  // TODO: Change this line after compression
  fileSize: 400000,
};

const imageFilter = () => {
  return (_req: any, file: any, cb: any) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error("invalid file extension"), false);
    }
  };
};

export const uploadUserFiles = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let uploadPath: string | undefined = undefined;
      if (file.fieldname === "icon") {
        uploadPath = path.join(__dirname, "../uploads/avatars");
      }
      if (file.fieldname === "background") {
        uploadPath = path.join(__dirname, "../uploads/backgrounds");
      }
      if (!uploadPath) return;
      ensureDirExists(uploadPath); // <-- Создаем папку, если её нет
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${req.user.login}${userUtils.generateId()}${path.extname(
          file.originalname
        )}`
      );
    },
  });

  return fileServer({
    storage,
    fileFilter: imageFilter(),
    limits: backgroundImageLimit,
  }).fields([
    { name: "icon", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]);
};

export const uploadCommunityFiles = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let uploadPath: string | undefined = undefined;
      if (file.fieldname === "icon") {
        uploadPath = path.join(__dirname, "../uploads/avatars");
      }
      if (file.fieldname === "background") {
        uploadPath = path.join(__dirname, "../uploads/backgrounds");
      }
      if (!uploadPath) return;
      ensureDirExists(uploadPath); // <-- Создаем папку, если её нет
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${req.user.id}${userUtils.generateId()}${path.extname(
          file.originalname
        )}`
      );
    },
  });

  return fileServer({
    storage,
    fileFilter: imageFilter(),
    limits: backgroundImageLimit,
  }).fields([
    { name: "icon", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]);
};

export default fileServer;
