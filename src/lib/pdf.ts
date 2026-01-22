import { extractText } from 'unpdf';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
        // ใช้ Uint8Array เพื่อให้ทำงานได้ทั้งบนเครื่องและ Vercel
        const uint8Array = new Uint8Array(buffer);
        const { text } = await extractText(uint8Array);

        const combinedText = Array.isArray(text) ? text.join(' ') : (text || '');
        const cleanedText = combinedText.trim();

        if (cleanedText.length < 10) {
            throw new Error('Does not contain text in PDF file');
        }

        return cleanedText;
    } catch (error: any) {
        console.error('PDF extraction error:', error);
        throw new Error(error.message || 'Failed to parse PDF');
    }
}