import {
    Calendar,
    Clock,
    Users,
    FileText,
    ArrowUp,
    ArrowDown
} from "lucide-react";

type Stats = {
    totalReservations: number;
    pendingReservations: number;
    todayPatients: number;
    totalPatients: number;
};

type StatCard = {
    title: string;
    value: number;
    change: string;
    trend: "up" | "down";
    icon: React.ElementType;
    color: "blue" | "yellow" | "green" | "purple";
    description: string;
};

interface StatsSectionProps {
    stats: Stats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
    const statCards: StatCard[] = [
        {
            title: "Total Reservasi",
            value: stats.totalReservations,
            change: "+12%",
            trend: "up",
            icon: Calendar,
            color: "blue",
            description: "Dibanding bulan lalu"
        },
        {
            title: "Menunggu Approval",
            value: stats.pendingReservations,
            change: "+3",
            trend: "up",
            icon: Clock,
            color: "yellow",
            description: "Reservasi baru hari ini"
        },
        {
            title: "Pasien Hari Ini",
            value: stats.todayPatients,
            change: "-2",
            trend: "down",
            icon: Users,
            color: "green",
            description: "Dari target 10 pasien"
        },
        {
            title: "Total Pasien",
            value: stats.totalPatients,
            change: "+8%",
            trend: "up",
            icon: FileText,
            color: "purple",
            description: "Database pasien"
        }
    ];

    const getColorClasses = (color: StatCard["color"]) => {
        const colors = {
            blue: {
                bg: "bg-blue-50",
                icon: "bg-blue-500",
                text: "text-blue-600"
            },
            yellow: {
                bg: "bg-yellow-50",
                icon: "bg-yellow-500",
                text: "text-yellow-600"
            },
            green: {
                bg: "bg-green-50",
                icon: "bg-green-500",
                text: "text-green-600"
            },
            purple: {
                bg: "bg-purple-50",
                icon: "bg-purple-500",
                text: "text-purple-600"
            }
        };
        return colors[color];
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => {
                const colors = getColorClasses(stat.color);
                const IconComponent = stat.icon;
                const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown;

                return (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className={`${colors.icon} p-2 rounded-lg`}>
                                        <IconComponent className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-600">
                                        {stat.title}
                                    </h3>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stat.value.toLocaleString()}
                                    </p>

                                    <div className="flex items-center space-x-2">
                                        <div
                                            className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                                                stat.trend === "up"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            <TrendIcon className="w-3 h-3" />
                                            <span className="text-xs font-medium">
                                                {stat.change}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mini Chart Placeholder */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-end space-x-1 h-8">
                                {[...Array(7)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`${colors.bg} rounded-t flex-1`}
                                        style={{
                                            height: `${Math.random() * 100 + 20}%`
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
