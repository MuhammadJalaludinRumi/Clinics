import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AdminNavbar from "../Component/AdminNavbar";

interface TriageFormProps {
    patientId: number;
}

interface FormData {
    daftar_registrasi_id: number;
    systolic: string;
    diastolic: string;
    heart_rate: string;
    resp_rate: string;
    temperature: string;
    spo2: string;
    level: string;
}

interface FormErrors {
    [key: string]: string;
}

export default function Create({ patientId }: TriageFormProps) {
    const { props } = usePage<PageProps>();
    const currentUser = props.auth.user;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const [form, setForm] = useState<FormData>({
        daftar_registrasi_id: patientId,
        systolic: "",
        diastolic: "",
        heart_rate: "",
        resp_rate: "",
        temperature: "",
        spo2: "",
        level: "Hijau",
    });

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Required fields validation
        if (!form.systolic) newErrors.systolic = "Systolic pressure is required";
        if (!form.diastolic) newErrors.diastolic = "Diastolic pressure is required";
        if (!form.heart_rate) newErrors.heart_rate = "Heart rate is required";

        // Range validations
        const systolic = parseInt(form.systolic);
        const diastolic = parseInt(form.diastolic);
        const heartRate = parseInt(form.heart_rate);
        const respRate = form.resp_rate ? parseInt(form.resp_rate) : null;
        const temperature = form.temperature ? parseFloat(form.temperature) : null;
        const spo2 = form.spo2 ? parseInt(form.spo2) : null;

        if (systolic && (systolic < 60 || systolic > 250)) {
            newErrors.systolic = "Systolic must be between 60-250 mmHg";
        }
        if (diastolic && (diastolic < 30 || diastolic > 150)) {
            newErrors.diastolic = "Diastolic must be between 30-150 mmHg";
        }
        if (heartRate && (heartRate < 30 || heartRate > 200)) {
            newErrors.heart_rate = "Heart rate must be between 30-200 bpm";
        }
        if (respRate && (respRate < 8 || respRate > 60)) {
            newErrors.resp_rate = "Respiratory rate must be between 8-60 /min";
        }
        if (temperature && (temperature < 32 || temperature > 45)) {
            newErrors.temperature = "Temperature must be between 32-45°C";
        }
        if (spo2 && (spo2 < 70 || spo2 > 100)) {
            newErrors.spo2 = "SpO₂ must be between 70-100%";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            router.post(route("admin.triage.store"), form);
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTriageLevelColor = (level: string) => {
        switch (level) {
            case "Merah": return "text-red-600 bg-red-50 border-red-200";
            case "Kuning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "Hijau": return "text-green-600 bg-green-50 border-green-200";
            default: return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    return (
        <>
            <AdminNavbar currentUser={currentUser} />
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 mt-10">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Patient Triage Assessment</h1>
                                <p className="text-sm text-gray-600 mt-1">Complete vital signs and priority assessment</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                            {/* Vital Signs Section */}
                            <div className="p-6">
                                <div className="flex items-center mb-6">
                                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Vital Signs</h2>
                                        <p className="text-sm text-gray-600">Enter patient's current vital measurements</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Blood Pressure */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Blood Pressure <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <input
                                                    type="number"
                                                    name="systolic"
                                                    placeholder="Systolic"
                                                    value={form.systolic}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                                        errors.systolic ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                    }`}
                                                    min="60"
                                                    max="250"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Systolic (mmHg)</p>
                                                {errors.systolic && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.systolic}</p>
                                                )}
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    name="diastolic"
                                                    placeholder="Diastolic"
                                                    value={form.diastolic}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                                        errors.diastolic ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                    }`}
                                                    min="30"
                                                    max="150"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Diastolic (mmHg)</p>
                                                {errors.diastolic && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.diastolic}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Heart Rate */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Heart Rate <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="heart_rate"
                                            placeholder="Enter heart rate"
                                            value={form.heart_rate}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                                errors.heart_rate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                            min="30"
                                            max="200"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Beats per minute (bpm)</p>
                                        {errors.heart_rate && (
                                            <p className="text-red-500 text-xs mt-1">{errors.heart_rate}</p>
                                        )}
                                    </div>

                                    {/* Respiratory Rate */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Respiratory Rate
                                        </label>
                                        <input
                                            type="number"
                                            name="resp_rate"
                                            placeholder="Enter respiratory rate"
                                            value={form.resp_rate}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                                errors.resp_rate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                            min="8"
                                            max="60"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Breaths per minute</p>
                                        {errors.resp_rate && (
                                            <p className="text-red-500 text-xs mt-1">{errors.resp_rate}</p>
                                        )}
                                    </div>

                                    {/* Temperature */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Body Temperature
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="temperature"
                                            placeholder="Enter temperature"
                                            value={form.temperature}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                                errors.temperature ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                            min="32"
                                            max="45"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Degrees Celsius (°C)</p>
                                        {errors.temperature && (
                                            <p className="text-red-500 text-xs mt-1">{errors.temperature}</p>
                                        )}
                                    </div>

                                    {/* Oxygen Saturation */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Oxygen Saturation (SpO₂)
                                        </label>
                                        <input
                                            type="number"
                                            name="spo2"
                                            placeholder="Enter oxygen saturation"
                                            value={form.spo2}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                                errors.spo2 ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                            min="70"
                                            max="100"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Percentage (%)</p>
                                        {errors.spo2 && (
                                            <p className="text-red-500 text-xs mt-1">{errors.spo2}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Triage Level Section */}
                            <div className="p-6">
                                <div className="flex items-center mb-6">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.19 2.5 1.732 2.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Triage Priority Level</h2>
                                        <p className="text-sm text-gray-600">Select the appropriate priority level based on assessment</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Priority Level <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="level"
                                        value={form.level}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${getTriageLevelColor(form.level)}`}
                                    >
                                        <option value="Hijau">Green - Non-Urgent (Stable condition)</option>
                                        <option value="Kuning">Yellow - Urgent (Requires prompt attention)</option>
                                        <option value="Merah">Red - Emergency (Immediate attention required)</option>
                                    </select>

                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Triage Level Guidelines:</h4>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                            <li><strong className="text-red-600">Red (Emergency):</strong> Life-threatening conditions requiring immediate intervention</li>
                                            <li><strong className="text-yellow-600">Yellow (Urgent):</strong> Serious conditions that need prompt medical attention</li>
                                            <li><strong className="text-green-600">Green (Non-Urgent):</strong> Stable patients who can wait for treatment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Save Triage Assessment
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
