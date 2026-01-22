// @ts-ignore - pdf-parse v2 includes its own types
import { PDFParse } from 'pdf-parse';
import path from 'path';
import { pathToFileURL } from 'url';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
        // Fix for Windows ESM loader: convert path to file:// URL
        const workerPath = path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.worker.mjs');
        const workerUrl = pathToFileURL(workerPath).href;
        PDFParse.setWorker(workerUrl);

        const parser = new PDFParse({ data: new Uint8Array(buffer) });
        const data = await parser.getText();
        await parser.destroy();

        const text = data.text?.trim() || '';

        if (text.length < 10) {
            console.error('Extraction failed: Text is too short.');
            throw new Error('ไม่พบข้อความในไฟล์ PDF นี้ กรุณาตรวจสอบว่าเป็นไฟล์สแกน (รูปภาพ) หรือไม่? หรือลองใช้ไฟล์ PDF อื่น');
        }

        return text;
    } catch (error: any) {
        console.error('PDF parse detailed error:', error);
        throw new Error(error.message || 'Failed to parse PDF');
    }
}