import { Link, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";
import { useState } from "react";

interface DaftarRegistrasi {
    id: number;
    no_rm: string;
    name: string;
    nik?: string;
}

interface Triage {
    id: number;
    systolic: number;
    diastolic: number;
    heart_rate: number;
    resp_rate?: number;
    temperature?: number;
    spo2?: number;
    level: string;
    daftar_registrasi: DaftarRegistrasi;
}

interface Props {
    triages: Triage[];
}

export default function Index({ triages }: Props) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;

    const [selectedTriage, setSelectedTriage] = useState<Triage | null>(null);

    const getLevelBadgeColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "emergency":
            case "merah":
                return "bg-red-100 text-red-800 border-red-200";
            case "urgent":
            case "kuning":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "less urgent":
            case "hijau":
                return "bg-green-100 text-green-800 border-green-200";
            case "non urgent":
            case "biru":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />

            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 mt-10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    Patient Triage Management
                                </h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Monitor and manage patient priorities based on medical conditions
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                                    <span className="text-sm font-medium text-blue-700">
                                        Active Patients: {triages.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile cards */}
                    <div className="block lg:hidden space-y-4 mb-6">
                        {triages.map((triage) => (
                            <div
                                key={triage.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-lg">
                                                {triage.daftar_registrasi.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Medical Record: {triage.daftar_registrasi.no_rm}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full border ${getLevelBadgeColor(
                                                triage.level
                                            )}`}
                                        >
                                            {triage.level}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Blood Pressure</p>
                                            <p className="font-semibold text-gray-900">
                                                {triage.systolic}/{triage.diastolic} mmHg
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Heart Rate</p>
                                            <p className="font-semibold text-gray-900">
                                                {triage.heart_rate} bpm
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedTriage(triage)}
                                            className="flex-1 min-w-0 bg-blue-600 hover:bg-blue-700 text-white text-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            View Details
                                        </button>
                                        <Link
                                            href={route("admin.cppt.create", triage.daftar_registrasi.id)}
                                            className="flex-1 min-w-0 bg-green-600 hover:bg-green-700 text-white text-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            CPPT
                                        </Link>
                                        <Link
                                            href={route("admin.penunjang.create", triage.daftar_registrasi.id)}
                                            className="flex-1 min-w-0 bg-purple-600 hover:bg-purple-700 text-white text-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                        >
                                            Support
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop table */}
                    <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Patient Information
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vital Signs
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Triage Level
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {triages.map((triage) => (
                                        <tr
                                            key={triage.id}
                                            className="hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">
                                                        {triage.daftar_registrasi.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        MR: {triage.daftar_registrasi.no_rm}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="space-y-1">
                                                    <div className="text-sm text-gray-900">
                                                        <span className="font-medium text-gray-600">BP:</span>{" "}
                                                        {triage.systolic}/{triage.diastolic} mmHg
                                                    </div>
                                                    <div className="text-sm text-gray-900">
                                                        <span className="font-medium text-gray-600">HR:</span>{" "}
                                                        {triage.heart_rate} bpm
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getLevelBadgeColor(
                                                        triage.level
                                                    )}`}
                                                >
                                                    {triage.level}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <button
                                                        onClick={() => setSelectedTriage(triage)}
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                                    >
                                                        Details
                                                    </button>
                                                    <Link
                                                        href={route("admin.cppt.create", triage.daftar_registrasi.id)}
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                                                    >
                                                        CPPT
                                                    </Link>
                                                    <Link
                                                        href={route("admin.penunjang.create", triage.daftar_registrasi.id)}
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                                                    >
                                                        Support
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Modal */}
                    {selectedTriage && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                                {/* Modal Header */}
                                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">Patient Triage Details</h2>
                                        <p className="text-sm text-gray-600 mt-1">Complete vital signs and patient information</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedTriage(null)}
                                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-6">
                                    {/* Patient Information Section */}
                                    <div className="mb-8">
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                        Full Name
                                                    </label>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {selectedTriage.daftar_registrasi.name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                        Medical Record
                                                    </label>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {selectedTriage.daftar_registrasi.no_rm}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                        National ID
                                                    </label>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {selectedTriage.daftar_registrasi.nik || "Not Available"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vital Signs Section */}
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">Vital Signs Assessment</h3>
                                                <p className="text-sm text-gray-600">Current patient vitals and measurements</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Blood Pressure
                                                    </label>
                                                    <span className="text-xs text-gray-400">mmHg</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {selectedTriage.systolic}/{selectedTriage.diastolic}
                                                </p>
                                            </div>
                                            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Heart Rate
                                                    </label>
                                                    <span className="text-xs text-gray-400">bpm</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {selectedTriage.heart_rate}
                                                </p>
                                            </div>
                                            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Respiratory Rate
                                                    </label>
                                                    <span className="text-xs text-gray-400">/min</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {selectedTriage.resp_rate || "N/A"}
                                                </p>
                                            </div>
                                            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Temperature
                                                    </label>
                                                    <span className="text-xs text-gray-400">°C</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {selectedTriage.temperature || "N/A"}
                                                </p>
                                            </div>
                                            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Oxygen Saturation
                                                    </label>
                                                    <span className="text-xs text-gray-400">%</span>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {selectedTriage.spo2 || "N/A"}
                                                </p>
                                            </div>
                                            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        Triage Level
                                                    </label>
                                                </div>
                                                <span
                                                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getLevelBadgeColor(
                                                        selectedTriage.level
                                                    )}`}
                                                >
                                                    {selectedTriage.level}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                                    <button
                                        onClick={() => setSelectedTriage(null)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                    >
                                        Close
                                    </button>
                                    <Link
                                        href={route("admin.cppt.create", selectedTriage.daftar_registrasi.id)}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                    >
                                        Create CPPT
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Empty state */}
                    {triages.length === 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No Triage Data Available
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Patient triage information will appear here after registration and initial assessment
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
