
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer"; 
import path from "path"; 
import fs from "fs"; 
import router from "./routes/indexRouter";
import { PostgresError } from "./interfaces/ErrorInterface";
import emailRouter from "./routes/emailRouter";

const server: Application = express();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
        const uploadPath = path.join(__dirname, "../../front/vite-project/src/assets/imgusers");
       
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        cb(null, `${req.body.photoName}${fileExtension}`); 
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Solo se permiten archivos JPG o PNG."));
        }
    },
});


server.use(express.json());
server.use(morgan("dev"));
server.use(cors());


server.post("/upload", upload.single("photo"), (req: Request, res: Response) => {
    res.status(200).json({
        message: "Foto subida exitosamente.",
        filePath: `/src/assets/imguser/${req.body.photoName}${path.extname(req.file?.originalname || "")}`,
    });
});



server.use(router);


server.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    const error = err as PostgresError;
    if (error.code === 404) {
        res.status(404).json({
            message: error.message,
            details: error.detail,
        });
    } else {
        res.status(400).json({
            message: error.message,
            details: error.detail,
        });
    }
});

server.use("/api", emailRouter);

export default server;
