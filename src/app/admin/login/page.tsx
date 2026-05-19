import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Adburd",
  description: "Login to the Adburd admin panel",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-black text-white relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold">
              A
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Adburd
            </h1>
          </div>

          {/* CONTENT */}
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Manage your digital agency from one powerful dashboard.
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed">
              Access leads, campaigns, SEO projects, analytics, 
              websites, and your entire business workflow in one place.
            </p>
          </div>

          {/* FOOTER */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Adburd. All rights reserved.
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        
        <div className="w-full max-w-md">
          
          {/* MOBILE LOGO */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold text-white">
              A
            </div>

            <h1 className="text-3xl font-bold">
              Adburd
            </h1>
          </div>

          {/* LOGIN CARD */}
          <div className="bg-white border border-gray-200 shadow-2xl rounded-3xl p-8">
            
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>

              <p className="text-gray-500">
                Login to access your admin dashboard
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}