import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordMatch, setPasswordMatch] = useState(false);

    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    useEffect(() => {
        if (data.password) {
            checkPasswordStrength(data.password);
        }
        setPasswordMatch(data.password !== '' && data.password === data.password_confirmation);
    }, [data.password, data.password_confirmation]);

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0:
            case 1: return { text: 'Very Weak', color: 'text-red-600' };
            case 2: return { text: 'Weak', color: 'text-orange-600' };
            case 3: return { text: 'Good', color: 'text-yellow-600' };
            case 4: return { text: 'Strong', color: 'text-green-600' };
            case 5: return { text: 'Very Strong', color: 'text-green-700' };
            default: return { text: '', color: '' };
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 relative overflow-hidden">
                {/* Background klinik */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{
                        backgroundImage:
                            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwD-jZLgxjs3ozPi-Q288LeVgVyzU-VPUUpA&s')",
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-blue-50/80 backdrop-blur-sm"></div>

                {/* Form Card */}
                <div className="relative z-10 w-full max-w-lg mx-auto">
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/60 px-8 py-10 sm:px-10 sm:py-12">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
                                <UserPlus className="h-8 w-8 text-white" strokeWidth={1.5} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-1">Create Your Account</h1>
                            <p className="text-slate-600">Join our professional platform today</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Full Name" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                                    </div>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="pl-10 w-full h-12 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        autoComplete="name"
                                        isFocused
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email Address" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="pl-10 w-full h-12 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="pl-10 pr-10 w-full h-12 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-slate-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-slate-400" />
                                        )}
                                    </button>
                                </div>

                                {/* Password strength */}
                                {data.password && (
                                    <div className="mt-2">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Password Strength</span>
                                            <span className={getPasswordStrengthText().color}>
                                                {getPasswordStrengthText().text}
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                                            <div
                                                className={`h-1.5 rounded-full ${passwordStrength <= 1
                                                    ? 'bg-red-500'
                                                    : passwordStrength === 2
                                                        ? 'bg-orange-500'
                                                        : passwordStrength === 3
                                                            ? 'bg-yellow-500'
                                                            : passwordStrength === 4
                                                                ? 'bg-green-500'
                                                                : 'bg-green-600'
                                                    }`}
                                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Shield className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                                    </div>
                                    <TextInput
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="pl-10 pr-10 w-full h-12 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5 text-slate-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-slate-400" />
                                        )}
                                    </button>
                                    {data.password_confirmation && (
                                        <div className="absolute inset-y-0 right-10 flex items-center pr-2">
                                            {passwordMatch ? (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                            )}
                                        </div>
                                    )}
                                </div>
                                {!passwordMatch && data.password_confirmation && (
                                    <span className="text-xs text-red-600">Passwords do not match</span>
                                )}
                                <InputError message={errors.password_confirmation} className="mt-1" />
                            </div>

                            {/* Submit */}
                            <PrimaryButton
                                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                                disabled={processing}
                            >
                                {processing ? 'Creating Account...' : 'Create Account'}
                            </PrimaryButton>
                        </form>

                        {/* Login link */}
                        <div className="mt-6 text-center text-sm">
                            <p className="text-slate-600">
                                Already have an account?{' '}
                                <Link
                                    href={route('login')}
                                    className="text-blue-600 hover:text-blue-700 font-semibold"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Security notice */}
                    <div className="mt-6 text-center text-slate-500 text-xs flex items-center justify-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Your data is protected with enterprise-grade security</span>
                    </div>
                </div>
            </div>
    );
}
