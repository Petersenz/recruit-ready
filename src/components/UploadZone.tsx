'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function UploadZone() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [jobPosition, setJobPosition] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleUpload = async () => {
        if (!file) return;

        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            if (jobPosition) {
                formData.append('jobPosition', jobPosition);
            }

            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error);

            // Save PDF preview to sessionStorage
            const reader = new FileReader();
            reader.onload = () => {
                sessionStorage.setItem(`pdf-preview-${data.id}`, reader.result as string);
                router.push(`/result/${data.id}`);
            };
            reader.readAsDataURL(file);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setIsLoading(false);
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0] || null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024,
    });

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-3xl p-1 overflow-hidden"
            >
                <div className="p-8 space-y-6">
                    {/* Job Position Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground ml-1">
                            <Briefcase className="w-4 h-4" />
                            Target Job Position (Optional)
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Senior Frontend Developer, Marketing Intern..."
                            value={jobPosition}
                            onChange={(e) => setJobPosition(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
                        />
                    </div>

                    {/* Dropzone */}
                    <div
                        {...getRootProps()}
                        className={`
                            border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
                            transition-all duration-300 relative group
                            ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                            ${isLoading ? 'pointer-events-none opacity-50' : ''}
                            ${file ? 'border-green-500/50 bg-green-500/5' : ''}
                        `}
                    >
                        <input {...getInputProps()} />

                        <div className="flex flex-col items-center gap-4">
                            {file ? (
                                <div className="text-green-500 flex flex-col items-center">
                                    <FileText className="w-16 h-16 animate-bounce" />
                                    <p className="mt-2 font-semibold">{file.name}</p>
                                </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold">
                                            {isDragActive ? 'Drop it here!' : 'Select Resume PDF'}
                                        </p>
                                        <p className="text-muted-foreground mt-1 text-sm">Drag & drop or click to browse</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleUpload}
                        disabled={!file || isLoading}
                        className={`
                            w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all
                            flex items-center justify-center gap-2
                            ${!file || isLoading
                                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                : 'bg-primary text-white hover:scale-[1.02] active:scale-[0.98] shadow-primary/20'}
                        `}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing Professional Profile...
                            </>
                        ) : (
                            'Start AI Analysis'
                        )}
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center text-red-500 font-medium"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}