import { Request, Response } from "express";
const pdfParse = require("pdf-parse");

export class PdfController {
  static async readPDF(req: Request, res: Response) {
    try {
      const { base64 } = req.body;

      const pdfBuffer = Buffer.from(base64, "base64");

      const data = await pdfParse(pdfBuffer);
      console.log(data.text);

      res.status(200).json({ texto: "PDF recebido com sucesso!" });
    } catch (error: any) {}
  }
}
