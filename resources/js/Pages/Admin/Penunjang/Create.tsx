import { useForm } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";
import { useState } from "react";

interface Pasien {
    id: number;
    no_rm: string;
    name: string;
}

interface Props {
    pasien: Pasien;
}

interface ExaminationType {
    value: string;
    label: string;
    description: string;
    iconPath: string;
    color: string;
}

export default function Create({ pasien }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const [selectedType, setSelectedType] = useState<string>("lab");

    const { data, setData, post, processing, errors } = useForm({
        daftar_registrasi_id: pasien.id,
        jenis: "lab",
        nama_pemeriksaan: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.penunjang.store"));
    };

    const jenisOptions: ExaminationType[] = [
        {
            value: "lab",
            label: "Laboratory",
            description: "Blood tests, urine analysis, biochemical studies",
            iconPath: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547A1.934 1.934 0 004 17.693V18a2 2 0 002 2h12a2 2 0 002-2v-.307c0-.884-.347-1.733-.972-2.365z",
            color: "bg-blue-100 text-blue-800 border-blue-200"
        },
        {
            value: "radiologi",
            label: "Radiology",
            description: "X-rays, CT scans, MRI, ultrasound imaging",
            iconPath: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z",
            color: "bg-purple-100 text-purple-800 border-purple-200"
        },
        {
            value: "spirometri",
            label: "Pulmonary Function",
            description: "Lung function tests and respiratory assessments",
            iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
            color: "bg-green-100 text-green-800 border-green-200"
        }
    ];

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getExampleTests = (jenis: string) => {
        switch (jenis) {
            case "lab":
                return [
                    "Complete Blood Count (CBC)",
                    "Random Blood Glucose",
                    "Urea/Creatinine",
                    "Liver Function Test (SGOT/SGPT)",
                    "Total Cholesterol",
                    "Uric Acid",
                    "HbA1c"
                ];
            case "radiologi":
                return [
                    "Chest X-Ray",
                    "Abdominal X-Ray",
                    "CT Scan Head",
                    "Abdominal Ultrasound",
                    "Mammography",
                    "Bone Survey"
                ];
            case "spirometri":
                return [
                    "Simple Spirometry",
                    "Spirometry with Bronchodilator",
                    "Peak Flow Measurement"
                ];
            default:
                return [];
        }
    };

    const selectedJenis = jenisOptions.find(option => option.value === data.jenis);

    const handleJenisChange = (value: string) => {
        setData("jenis", value);
        setSelectedType(value);
        setData("nama_pemeriksaan", ""); // Clear examination name when type changes
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 mt-10">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Diagnostic Order Request
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Create new laboratory, radiology, and diagnostic test orders
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 lg:mt-0">
                                <div className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
                                    <div className="flex items-center text-sm font-medium text-blue-700">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {getCurrentDateTime()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Patient Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Patient Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Patient Name
                                </label>
                                <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                    <p className="font-semibold text-gray-900">
                                        {pasien.name}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Medical Record Number
                                </label>
                                <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                    <p className="font-mono font-semibold text-gray-900">
                                        {pasien.no_rm}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Form */}
                    <form onSubmit={submit} className="space-y-6">
                        {/* Examination Type Selection */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Examination Type</h2>
                                        <p className="text-sm text-gray-600">Select the type of diagnostic examination</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {jenisOptions.map((option) => (
                                        <label key={option.value} className="relative flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 group">
                                            <input
                                                type="radio"
                                                name="jenis"
                                                value={option.value}
                                                checked={data.jenis === option.value}
                                                onChange={(e) => handleJenisChange(e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors duration-200">
                                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.iconPath} />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {option.label}
                                                        </span>
                                                        <p className="text-xs text-gray-500">
                                                            {option.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {data.jenis === option.value && (
                                                <div className="absolute top-3 right-3">
                                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </label>
                                    ))}
                                </div>
                                {errors.jenis && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.jenis}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Examination Details */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${selectedJenis?.color?.replace('text-', 'text-').replace('bg-', 'bg-').replace('border-', '')}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={selectedJenis?.iconPath || ""} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {selectedJenis?.label} Test Details
                                        </h2>
                                        <p className="text-sm text-gray-600">Specify the examination to be performed</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label htmlFor="nama_pemeriksaan" className="block text-sm font-medium text-gray-700 mb-2">
                                        Test Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="nama_pemeriksaan"
                                        type="text"
                                        value={data.nama_pemeriksaan}
                                        onChange={(e) => setData("nama_pemeriksaan", e.target.value)}
                                        placeholder={`Enter ${selectedJenis?.label.toLowerCase()} test name`}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                            errors.nama_pemeriksaan ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.nama_pemeriksaan && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.nama_pemeriksaan}
                                        </p>
                                    )}
                                </div>

                                {/* Quick Selection Tests */}
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Common {selectedJenis?.label} Tests:
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {getExampleTests(data.jenis).map((test, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setData("nama_pemeriksaan", test)}
                                                className="inline-flex items-center justify-center px-3 py-2 text-xs font-medium bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            >
                                                {test}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                                        <p className="text-sm text-gray-600">Review your diagnostic order details</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <span className="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                                                Patient
                                            </span>
                                            <p className="text-sm font-semibold text-gray-900">{pasien.name}</p>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                                                Examination Type
                                            </span>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${selectedJenis?.color || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                                                {selectedJenis?.label}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                                                Test Ordered
                                            </span>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {data.nama_pemeriksaan || "Not specified"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel Order
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || !data.nama_pemeriksaan.trim()}
                                    className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors duration-200 ${
                                        processing || !data.nama_pemeriksaan.trim()
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    }`}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing Order...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Submit Diagnostic Order
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
