import LoginForm from "./components/LoginForm";
import LogoHeader from "./components/LogoHeader";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      {/* Wave decorativa solo en mobile */}
      <div className="absolute top-0 left-0 right-0 lg:hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-40"
        >
          <defs>
            <linearGradient id="waveGradient" x1="1" x2="0" y1="0" y2="0">
              <stop offset="0%" stopColor="#1c2a61" />
              <stop offset="100%" stopColor="#39439f" />
            </linearGradient>
          </defs>
          <path
            d="M0.00,49.98 C150.00,150.00 349.95,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      {/* Imagen lateral solo en desktop */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-left filter brightness-90"
        style={{ backgroundImage: 'url("/images/login-side.jpg")' }}
      />

      {/* Formulario centrado, con padding superior para que no se monte sobre la wave */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 sm:px-16 pb-12 pt-6 lg:pt-12 min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center gap-3 text-4xl lg:text-6xl font-bold text-[#39439f] justify-center mb-8">
            <LogoHeader />
          </div>

          <LoginForm />

          <p className="text-sm text-center text-[#4B5563] mt-6">
            ¿No tenés cuenta?{" "}
            <a href="/register" className="text-[#39439f] hover:underline">
              Registrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
