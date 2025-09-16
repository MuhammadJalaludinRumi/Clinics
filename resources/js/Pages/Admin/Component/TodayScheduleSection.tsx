import {
    Calendar,
    Clock,
    User,
    CheckCircle,
    PlayCircle,
    Plus,
    MoreVertical
} from "lucide-react";

type ScheduleStatus = "waiting" | "in-progress" | "completed";

interface ScheduleItem {
    time: string;         // contoh "08:30"
    patient: string;      // nama pasien
    complaint: string;    // keluhan pasien
    status: ScheduleStatus;
}

interface TodayScheduleSectionProps {
    schedule: ScheduleItem[];
}

export default function TodayScheduleSection({ schedule }: TodayScheduleSectionProps) {
    const getStatusConfig = (status: ScheduleStatus) => {
        const configs: Record<ScheduleStatus, {
            color: string;
            icon: React.ComponentType<{ className?: string }>;
            label: string;
            bgColor: string;
        }> = {
            waiting: {
                color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                icon: Clock,
                label: "Menunggu",
                bgColor: "bg-yellow-50"
            },
            "in-progress": {
                color: "bg-blue-100 text-blue-800 border-blue-200",
                icon: PlayCircle,
                label: "Sedang Diperiksa",
                bgColor: "bg-blue-50"
            },
            completed: {
                color: "bg-green-100 text-green-800 border-green-200",
                icon: CheckCircle,
                label: "Selesai",
                bgColor: "bg-green-50"
            }
        };
        return configs[status];
    };

    const currentTime = new Date().getHours() * 100 + new Date().getMinutes();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Jadwal Hari Ini</h2>
                            <p className="text-sm text-gray-500">
                                {new Date().toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long"
                                })}
                            </p>
                        </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>

                {/* Schedule Overview */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-2xl font-bold text-yellow-800">
                            {schedule.filter(s => s.status === "waiting").length}
                        </p>
                        <p className="text-sm text-yellow-600">Menunggu</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-2xl font-bold text-blue-800">
                            {schedule.filter(s => s.status === "in-progress").length}
                        </p>
                        <p className="text-sm text-blue-600">Berlangsung</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-2xl font-bold text-green-800">
                            {schedule.filter(s => s.status === "completed").length}
                        </p>
                        <p className="text-sm text-green-600">Selesai</p>
                    </div>
                </div>
            </div>

            {/* Schedule List */}
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {schedule.map((appointment, index) => {
                    const statusConfig = getStatusConfig(appointment.status);
                    const StatusIcon = statusConfig.icon;
                    const appointmentTime = parseInt(appointment.time.replace(":", ""));
                    const isCurrentTime = Math.abs(appointmentTime - currentTime) <= 30;

                    return (
                        <div
                            key={index}
                            className={`p-4 hover:bg-gray-50 transition-colors ${
                                isCurrentTime ? "border-l-4 border-blue-500 bg-blue-50" : ""
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 flex-1">
                                    {/* Time */}
                                    <div className={`text-center min-w-0 ${
                                        isCurrentTime ? "text-blue-700 font-semibold" : "text-gray-600"
                                    }`}>
                                        <p className="text-lg font-bold">{appointment.time}</p>
                                        {isCurrentTime && (
                                            <p className="text-xs text-blue-600">Sekarang</p>
                                        )}
                                    </div>

                                    {/* Patient Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <h4 className="font-semibold text-gray-900 truncate">
                                                {appointment.patient}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate mb-2">
                                            {appointment.complaint}
                                        </p>
                                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            <span>{statusConfig.label}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col space-y-2">
                                    {appointment.status === "waiting" && (
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                                            Mulai
                                        </button>
                                    )}
                                    {appointment.status === "in-progress" && (
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                                            Selesai
                                        </button>
                                    )}
                                    <button className="border border-gray-300 hover:border-gray-400 text-gray-600 px-3 py-1 rounded text-xs transition-colors">
                                        Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Total: {schedule.length} jadwal hari ini
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Jadwal</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
