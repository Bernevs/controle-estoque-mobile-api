import { Router } from "express";
import { PdfController } from "../controller/PdfController";

const PdfRouter = Router();

PdfRouter.post("/pdf", PdfController.readPDF);

export default PdfRouter;
