import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login" />
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

                {/* Card */}
                <div className="relative z-10 w-full max-w-md mx-auto">
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/60 px-8 py-10 sm:px-10 sm:py-12">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
                                <LogIn className="h-8 w-8 text-white" strokeWidth={1.5} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-1">
                                Welcome Back
                            </h1>
                            <p className="text-slate-600">Sign in to continue</p>
                        </div>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        required
                                        autoFocus
                                        className="pl-10 w-full h-12 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" strokeWidth={1.5} />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                        className="pl-10 pr-10 w-full h-12 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
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
                                {errors.password && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="ml-4 inline-flex items-center justify-center w-32 h-11 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                                >
                                    {processing ? "Loading..." : "Login"}
                                </button>
                            </div>
                        </form>

                        {/* Register link */}
                        <div className="mt-6 text-center text-sm">
                            <p className="text-slate-600">
                                Don’t have an account?{" "}
                                <Link
                                    href={route("register")}
                                    className="text-blue-600 hover:text-blue-700 font-semibold"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
