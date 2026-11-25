import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { User, Stethoscope, HeartPulse, Shield, ArrowRight, Eye } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await api.post('/login', {
        email: email,
        password: password,
        role: role
      });

      // Token එක සහ User ව save කරගන්න
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Role එක අනුව අදාළ Dashboard එකට යවන්න
      if (role === 'patient') navigate('/patient-dashboard');
      if (role === 'doctor') navigate('/doctor-dashboard');
      if (role === 'nurse') navigate('/nurse-dashboard');
      if (role === 'admin') navigate('/admin-dashboard');

    } catch (error) {
      alert(error.response?.data?.message || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      {/* වම් පැත්ත (Green Section) */}
      <div className="w-1/3 bg-[#0F4C3A] text-white p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-white p-1.5 rounded-lg">
              <HeartPulse className="text-[#0F4C3A]" size={24} />
            </div>
            <h1 className="text-xl font-semibold tracking-wide">St. Mary's Care Portal</h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight mb-6">
            One record for every patient, from front desk to discharge.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Patients, doctors, nurses and administrators each see what their role needs — nothing more.
          </p>
        </div>

        <div className="text-sm text-gray-400 mt-10">
          <p>St. Mary's General Hospital · Emergency line 911 · Front desk (555) 014-2200</p>
        </div>
      </div>

      {/* දකුණු පැත්ත (Form Section) */}
      <div className="w-2/3 bg-[#F8F9FA] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-2 text-[#1F2937]">Sign in</h2>
          <p className="text-[#6B7280] mb-8 text-lg">Appointments, prescriptions and test results.</p>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#374151] mb-2">I am a</label>
            <div className="flex bg-gray-200 rounded-xl p-1">
              {[
                { id: 'patient', label: 'Patient', icon: <User size={18} /> },
                { id: 'doctor', label: 'Doctor', icon: <Stethoscope size={18} /> },
                { id: 'nurse', label: 'Nurse', icon: <HeartPulse size={18} /> },
                { id: 'admin', label: 'Admin', icon: <Shield size={18} /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  type="button" // මේක add කරන්න ඕන, නැත්නම් form submit වෙනවා
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg capitalize text-sm font-medium transition-all ${
                    role === item.id
                      ? 'bg-white shadow-sm text-[#1F2937]'
                      : 'text-[#6B7280] hover:text-[#1F2937]'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-[#374151] mb-1.5">
                Email or patient ID
              </label>
              <input
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F4C3A] focus:border-transparent outline-none transition-all bg-white"
                placeholder="Enter your email or patient ID"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-[#374151]">Password</label>
                <a href="#" className="text-sm font-medium text-[#0F4C3A] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F4C3A] focus:border-transparent outline-none transition-all bg-white pr-12"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="keepSignedIn"
                className="w-4 h-4 text-[#0F4C3A] bg-gray-100 border-gray-300 rounded focus:ring-[#0F4C3A] cursor-pointer"
              />
              <label htmlFor="keepSignedIn" className="text-sm text-[#374151] cursor-pointer">
                Keep me signed in
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#0F4C3A] hover:bg-[#0b3a2c] text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all mt-4"
            >
              Sign in as {role} <ArrowRight size={18} />
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {role === 'patient' && (
              <p className="text-[#6B7280] text-sm">
                New to St. Mary's?{' '}
                <a href="#" className="font-semibold text-[#0F4C3A] hover:underline">
                  Create a patient account
                </a>
              </p>
            )}

            {(role === 'doctor' || role === 'nurse') && (
              <p className="text-[#6B7280] text-sm">
                Joining the clinical staff?{' '}
                <a href="#" className="font-semibold text-[#0F4C3A] hover:underline">
                  Request access
                </a>
              </p>
            )}

            {role === 'admin' && (
              <p className="text-[#6B7280] text-sm">
                Have an admin invite code?{' '}
                <a href="#" className="font-semibold text-[#0F4C3A] hover:underline">
                  Request access
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}