import RegisterForm from "./components/RegisterForm";
import LogoHeader from "../login/components/LogoHeader";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      {/* Wave decorativa solo en mobile */}
      <div className="absolute top-0 left-0 right-0 lg:hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-32"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
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

      {/* Imagen lateral en desktop */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-left filter brightness-90"
        style={{ backgroundImage: 'url("/images/login-side.jpg")' }}
      />

      {/* Formulario centrado y limpio */}
      <div className="flex flex-col justify-start lg:justify-center items-center w-full lg:w-1/2 px-8 sm:px-16 pt-32 pb-12 min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center gap-3 text-4xl lg:text-6xl font-bold text-[#39439f] justify-center mb-8">
            <LogoHeader />
          </div>

          <RegisterForm />

          <p className="text-sm text-center text-[#4B5563] mt-6">
            ¿Ya tenés cuenta?{" "}
            <a href="/login" className="text-[#39439f] hover:underline">
              Iniciá sesión aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
