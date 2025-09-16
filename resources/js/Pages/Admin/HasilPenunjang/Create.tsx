import React, { useState } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";

interface DaftarRegistrasi {
    id: number;
    no_rm: string;
    name: string;
}

interface Order {
    id: number;
    nama_pemeriksaan: string;
    jenis: string;
    daftar_registrasi: DaftarRegistrasi;
}

interface Props {
    order: Order;
}

export default function Create({ order }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        order_id: order.id,
        hasil: "",
        tanggal: new Date().toISOString().slice(0, 10),
    });

    const getExaminationType = (jenis: string) => {
        const types: { [key: string]: { label: string; color: string; icon: string } } = {
            'laboratorium': {
                label: 'Laboratory Test',
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547A1.934 1.934 0 004 17.693V18a2 2 0 002 2h12a2 2 0 002-2v-.307c0-.884-.347-1.733-.972-2.365zM6 10a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z'
            },
            'radiologi': {
                label: 'Radiology Imaging',
                color: 'bg-purple-100 text-purple-800 border-purple-200',
                icon: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z'
            },
            'patologi': {
                label: 'Pathology',
                color: 'bg-green-100 text-green-800 border-green-200',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            }
        };
        return types[jenis.toLowerCase()] || {
            label: 'Diagnostic Test',
            color: 'bg-gray-100 text-gray-800 border-gray-200',
            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        };
    };

    const examType = getExaminationType(order.jenis);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        post(route("admin.hasil-penunjang.store"), {
            onFinish: () => setIsSubmitting(false),
            onError: () => setIsSubmitting(false)
        });
    }

    const validateResults = () => {
        if (!data.hasil.trim()) {
            return "Diagnostic results are required";
        }
        if (data.hasil.trim().length < 10) {
            return "Results should be at least 10 characters long";
        }
        return null;
    };

    const resultError = validateResults();

    return (
        <>
            <AdminNavbar currentUser={currentUser} />
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={examType.icon} />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Diagnostic Results Entry</h1>
                                <p className="text-sm text-gray-600 mt-1">Enter and validate diagnostic test results</p>
                            </div>
                        </div>
                    </div>

                    {/* Patient Information Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Patient Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                    Patient Name
                                </label>
                                <p className="text-sm font-semibold text-gray-900">
                                    {order.daftar_registrasi.name}
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                    Medical Record
                                </label>
                                <p className="text-sm font-semibold text-gray-900">
                                    {order.daftar_registrasi.no_rm}
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                    Examination Type
                                </label>
                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${examType.color}`}>
                                    {examType.label}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">Examination Details</h3>
                                    <p className="text-sm text-blue-700 mt-1">
                                        <span className="font-semibold">Test:</span> {order.nama_pemeriksaan}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Form */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <form onSubmit={submit}>
                            {/* Form Header */}
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Test Results Documentation</h3>
                                        <p className="text-sm text-gray-600">Complete the diagnostic findings below</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="p-6 space-y-6">
                                {/* Date Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Examination Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={data.tanggal}
                                            onChange={e => setData("tanggal", e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                                errors.tanggal ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                            max={new Date().toISOString().slice(0, 10)}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.tanggal && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.tanggal}
                                        </p>
                                    )}
                                </div>

                                {/* Results Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Diagnostic Results <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={data.hasil}
                                            onChange={e => setData("hasil", e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none ${
                                                (errors.hasil || resultError) ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                            rows={8}
                                            placeholder="Enter detailed diagnostic results, findings, and interpretations..."
                                        />
                                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                            {data.hasil.length} characters
                                        </div>
                                    </div>
                                    {(errors.hasil || resultError) && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.hasil || resultError}
                                        </p>
                                    )}

                                    {/* Guidelines */}
                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Documentation Guidelines
                                        </h4>
                                        <ul className="text-xs text-gray-600 space-y-1 ml-6">
                                            <li>• Include all relevant findings and measurements</li>
                                            <li>• Note any abnormal values or observations</li>
                                            <li>• Provide clinical interpretation when applicable</li>
                                            <li>• Use standard medical terminology</li>
                                            <li>• Include recommendations for follow-up if needed</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                                <Link
                                    href={route("admin.penunjang.index")}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing || isSubmitting || !!resultError || !data.hasil.trim()}
                                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    {(processing || isSubmitting) ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving Results...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Save Diagnostic Results
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Help Section */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">Important Notes</h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>Please ensure all diagnostic results are accurate and complete before submission. These results will be used for patient care decisions and medical records.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
