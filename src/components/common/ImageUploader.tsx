import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  X, 
  Check, 
  Sparkles, 
  AlertCircle,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

interface ImageUploaderProps {
  id?: string;
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  aspectRatio?: 'square' | 'video' | 'cert' | 'avatar' | 'auto';
  placeholder?: string;
  helperText?: string;
  presets?: { label: string; url: string }[];
}

/**
 * Utility to resize & compress image file to lightweight Base64 string
 */
async function compressImageFile(file: File, maxWidth = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Try WebP first, fallback to JPEG
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id = 'image-uploader',
  label,
  value,
  onChange,
  aspectRatio = 'auto',
  placeholder = 'https://...',
  helperText = 'Bisa unggah file manual (PNG/JPG/WebP) atau tempel link URL gambar',
  presets = []
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value || '');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize when value changes externally
  React.useEffect(() => {
    setUrlInput(value || '');
  }, [value]);

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('File harus berupa format gambar (JPG, PNG, WebP, GIF, dll)');
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);

    try {
      // Compress to optimal size for web & database storage
      const compressedDataUrl = await compressImageFile(file, 1200, 0.85);
      onChange(compressedDataUrl);
      setUrlInput(compressedDataUrl);
    } catch (err) {
      console.error('Error processing image:', err);
      setErrorMsg('Gagal memproses gambar. Silakan coba file lain atau gunakan link URL.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setErrorMsg(null);
    onChange(urlInput.trim());
  };

  const handleClearImage = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getAspectClasses = () => {
    switch (aspectRatio) {
      case 'square':
      case 'avatar':
        return 'aspect-square max-w-[140px]';
      case 'video':
        return 'aspect-video';
      case 'cert':
        return 'aspect-[4/3]';
      default:
        return 'h-40';
    }
  };

  return (
    <div className="space-y-2.5">
      {/* Label and Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{label}</span>
        </label>

        {/* Tab Toggle: Upload Manual vs Link URL */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            type="button"
            id={`${id}-tab-upload`}
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            id={`${id}-tab-url`}
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'url'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Tautan URL</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Upload File Manual */}
      {activeTab === 'upload' && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            id={`${id}-file-input`}
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 ${
              isDragging
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 bg-slate-50/70 dark:bg-slate-800/50 hover:bg-blue-50/20'
            }`}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2 py-3">
                <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Mengompres & memproses gambar...
                </span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    Klik untuk pilih gambar dari komputer / HP
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Atau tarik dan jatuhkan file (PNG, JPG, WebP otomatis dikompres)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: URL Link Input */}
      {activeTab === 'url' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                id={`${id}-url-input`}
                placeholder={placeholder}
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  onChange(e.target.value);
                }}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {urlInput !== value && (
              <button
                type="button"
                id={`${id}-apply-btn`}
                onClick={handleApplyUrl}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 shrink-0 transition"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Pakai</span>
              </button>
            )}
          </div>

          {/* Quick Presets if provided */}
          {presets.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Contoh Cepat:
              </span>
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  id={`${id}-preset-${idx}`}
                  onClick={() => {
                    setUrlInput(preset.url);
                    onChange(preset.url);
                  }}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 transition border border-slate-200 dark:border-slate-700"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Live Preview Box */}
      {value ? (
        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-800 group">
          <div className={`w-full overflow-hidden flex items-center justify-center ${getAspectClasses()}`}>
            <img
              src={value}
              alt="Preview Gambar"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
              }}
            />
          </div>

          {/* Overlay controls on hover/always accessible */}
          <div className="p-2.5 bg-slate-900/80 backdrop-blur-md flex items-center justify-between gap-2 text-white text-xs">
            <span className="truncate max-w-[220px] text-[11px] text-slate-300">
              {value.startsWith('data:image') ? 'Gambar File Lokal (Tersimpan)' : value}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                id={`${id}-change-btn`}
                onClick={() => {
                  if (activeTab === 'upload') {
                    fileInputRef.current?.click();
                  } else {
                    const inputEl = document.getElementById(`${id}-url-input`);
                    inputEl?.focus();
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-[11px] transition"
              >
                Ganti
              </button>
              <button
                type="button"
                id={`${id}-clear-btn`}
                onClick={handleClearImage}
                className="p-1 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition"
                title="Hapus gambar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
