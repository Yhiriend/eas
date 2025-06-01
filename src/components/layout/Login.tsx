import { Mail, Lock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fbfd] relative overflow-hidden">
      {/* Animated SVG Background Shapes */}
      <svg className="absolute z-1 left-[-120px] top-[-80px] animate-float-slow" width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
          </radialGradient>
        </defs>
        <ellipse cx="250" cy="250" rx="220" ry="180" fill="url(#grad1)" />
      </svg>
      <svg className="absolute z-1 right-[-100px] bottom-[-80px] animate-float-medium" width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="170" fill="url(#grad2)" />
      </svg>
      <svg className="absolute z-1 left-1/2 top-0 -translate-x-1/2 animate-rotate-slow" width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect x="40" y="40" width="220" height="220" rx="110" fill="url(#grad3)" />
      </svg>
      {/* Custom Animations */}
      <style>{`
        .animate-float-slow {
          animation: floatY 8s ease-in-out infinite alternate;
        }
        .animate-float-medium {
          animation: floatX 10s ease-in-out infinite alternate;
        }
        .animate-rotate-slow {
          animation: rotate 18s linear infinite;
        }
        @keyframes floatY {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @keyframes floatX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        @keyframes rotate {
          0% { transform: translate(-50%, 0) rotate(0deg); }
          100% { transform: translate(-50%, 0) rotate(360deg); }
        }
      `}</style>
      <Card className="z-10 w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-md">
        <CardHeader className="flex flex-col items-center pt-8 pb-4">
          <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-2">
            <div className="w-6 h-6 bg-cyan-400 rounded-full" />
          </div>
          <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="username" className="text-sm font-medium">Usuario</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="usuario"
                  className="pl-10"
                  autoComplete="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="contraseña"
                  className="pl-10"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base mt-2" disabled={loading}>
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </Button>
          </form>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-gray-400 text-xs mt-2">Si olvidaste tu contraseña o no tienes una cuenta, contacta al administrador al correo <a href="mailto:admin@example.com" className="text-blue-600 hover:underline">admin@example.com</a></span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 