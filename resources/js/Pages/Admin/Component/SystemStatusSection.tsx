import {
    Server,
    Database,
    Wifi,
    Shield,
    HardDrive,
    Activity,
    AlertTriangle,
    CheckCircle,
    Clock,
    RefreshCw,
    LucideIcon
} from "lucide-react";

type SystemStatusType = "operational" | "warning" | "error";

interface SystemStatusItem {
    name: string;
    status: SystemStatusType;
    icon: LucideIcon;
    value: string;
    lastCheck: string;
}

interface StatusConfig {
    color: string;
    bgColor: string;
    icon: LucideIcon;
    label: string;
}

export default function SystemStatusSection() {
    const systemStatus: SystemStatusItem[] = [
        {
            name: "Server Status",
            status: "operational",
            icon: Server,
            value: "99.9% Uptime",
            lastCheck: "2 menit lalu"
        },
        {
            name: "Database",
            status: "operational",
            icon: Database,
            value: "Connected",
            lastCheck: "1 menit lalu"
        },
        {
            name: "Internet Connection",
            status: "operational",
            icon: Wifi,
            value: "Stable",
            lastCheck: "30 detik lalu"
        },
        {
            name: "Security",
            status: "operational",
            icon: Shield,
            value: "Protected",
            lastCheck: "5 menit lalu"
        },
        {
            name: "Storage",
            status: "warning",
            icon: HardDrive,
            value: "85% Used",
            lastCheck: "1 menit lalu"
        }
    ];

    const getStatusConfig = (status: SystemStatusType): StatusConfig => {
        const configs: Record<SystemStatusType, StatusConfig> = {
            operational: {
                color: "text-green-600",
                bgColor: "bg-green-100",
                icon: CheckCircle,
                label: "Operational"
            },
            warning: {
                color: "text-yellow-600",
                bgColor: "bg-yellow-100",
                icon: AlertTriangle,
                label: "Warning"
            },
            error: {
                color: "text-red-600",
                bgColor: "bg-red-100",
                icon: AlertTriangle,
                label: "Error"
            }
        };
        return configs[status] ?? configs.operational;
    };

    const overallStatus: SystemStatusType =
        systemStatus.every(s => s.status === "operational")
            ? "operational"
            : systemStatus.some(s => s.status === "error")
                ? "error"
                : "warning";

    const overallConfig = getStatusConfig(overallStatus);

    const OverallIcon = overallConfig.icon;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-2 rounded-lg">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Status Sistem</h2>
                            <p className="text-sm text-gray-500">Monitoring real-time</p>
                        </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>

                {/* Overall Status */}
                <div className={`${overallConfig.bgColor} rounded-lg p-4 border border-opacity-20`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <OverallIcon className={`w-6 h-6 ${overallConfig.color}`} />
                            <div>
                                <h3 className={`font-semibold ${overallConfig.color}`}>
                                    Sistem {overallConfig.label}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Semua layanan berjalan normal
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-2xl font-bold ${overallConfig.color}`}>
                                {overallStatus === "operational" ? "✓" : overallStatus === "warning" ? "⚠" : "✗"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Individual Status */}
            <div className="divide-y divide-gray-100">
                {systemStatus.map((item, index) => {
                    const statusConfig = getStatusConfig(item.status);
                    const ItemIcon = item.icon;
                    const StatusIcon = statusConfig.icon;

                    return (
                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <ItemIcon className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 truncate">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="text-right">
                                        <div className="flex items-center space-x-2">
                                            <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                                            <span className={`text-sm font-medium ${statusConfig.color}`}>
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{item.lastCheck}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* System Info */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Server Time</p>
                        <p className="font-medium text-gray-900">
                            {new Date().toLocaleTimeString("id-ID")}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500">Last Backup</p>
                        <p className="font-medium text-gray-900">02:00 WIB</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Active Users</p>
                        <p className="font-medium text-gray-900">12 Online</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Version</p>
                        <p className="font-medium text-gray-900">v2.1.4</p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                        Lihat Detail System Log
                    </button>
                </div>
            </div>
        </div>
    );
}
