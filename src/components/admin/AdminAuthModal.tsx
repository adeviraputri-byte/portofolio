import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onSuccessLogin: () => void;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onSuccessLogin,
  onClose,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Retrieve saved admin credentials or fallback to default
    const savedCredsRaw = localStorage.getItem('smk_admin_credentials');
    let validUser = 'admin';
    let validPass = 'admin123';

    if (savedCredsRaw) {
      try {
        const parsed = JSON.parse(savedCredsRaw);
        if (parsed.username) validUser = parsed.username;
        if (parsed.password) validPass = parsed.password;
      } catch (err) {
        // use default
      }
    }

    if (username.trim().toLowerCase() === validUser.toLowerCase() && password === validPass) {
      setSuccess(true);
      // Save authenticated session token
      localStorage.setItem('smk_admin_auth', JSON.stringify({
        authenticated: true,
        user: validUser,
        timestamp: new Date().toISOString()
      }));

      setTimeout(() => {
        setSuccess(false);
        onSuccessLogin();
      }, 700);
    } else {
      setErrorMsg('Username atau kata sandi admin tidak cocok. Silakan periksa kembali.');
    }
  };

  const handleUseDemo = () => {
    // Get actual stored credentials or default
    const savedCredsRaw = localStorage.getItem('smk_admin_credentials');
    let validUser = 'admin';
    let validPass = 'admin123';

    if (savedCredsRaw) {
      try {
        const parsed = JSON.parse(savedCredsRaw);
        if (parsed.username) validUser = parsed.username;
        if (parsed.password) validPass = parsed.password;
      } catch (err) {}
    }

    setUsername(validUser);
    setPassword(validPass);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with gradient banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-extrabold tracking-tight">
            Autentikasi Admin Panel
          </h3>
          <p className="text-blue-100 text-xs mt-1">
            Masuk untuk mengedit, menambah, dan menghapus seluruh konten portofolio
          </p>
        </div>

        {/* Modal Form */}
        <div className="p-6 sm:p-7 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>Login berhasil! Membuka dashboard admin...</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Username Admin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Masukkan username (contoh: admin)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="admin-login-submit-btn"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Masuk ke Admin Panel</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </form>

          {/* Quick Demo Helper Card */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Kredensial Default
                </div>
                <div className="text-xs text-slate-800 dark:text-slate-200 font-mono mt-0.5">
                  User: <span className="font-bold text-blue-600 dark:text-blue-400">admin</span> | Pass: <span className="font-bold text-blue-600 dark:text-blue-400">admin123</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleUseDemo}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition cursor-pointer shrink-0"
              >
                Isi Otomatis
              </button>
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-2.5">
              Anda dapat mengubah username & password kapan saja di tab Pengaturan Admin.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
