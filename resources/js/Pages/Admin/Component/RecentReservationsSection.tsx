import {
    Clock,
    CheckCircle,
    XCircle,
    MoreHorizontal,
    Eye,
    Edit,
    Trash,
    AlertCircle,
    ArrowRight
} from "lucide-react";
import { useState } from "react";

type Reservation = {
    id: number;
    regNo: string;
    name: string;
    time: string;
    status: "pending" | "approved" | "rejected";
};

interface RecentReservationsSectionProps {
    reservations: Reservation[];
}

export default function RecentReservationsSection({ reservations }: RecentReservationsSectionProps) {
    const [selectedReservation, setSelectedReservation] = useState<number | null>(null);

    const getStatusConfig = (status: Reservation["status"]) => {
        const configs = {
            pending: {
                color: "bg-yellow-100 text-yellow-800",
                icon: Clock,
                label: "Menunggu"
            },
            approved: {
                color: "bg-green-100 text-green-800",
                icon: CheckCircle,
                label: "Disetujui"
            },
            rejected: {
                color: "bg-red-100 text-red-800",
                icon: XCircle,
                label: "Ditolak"
            }
        };
        return configs[status] || configs.pending;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-2 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Reservasi Terbaru</h2>
                            <p className="text-sm text-gray-500">Reservasi yang masuk hari ini</p>
                        </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                        <span>Lihat Semua</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                {reservations.map((reservation) => {
                    const statusConfig = getStatusConfig(reservation.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                        <div
                            key={reservation.id}
                            className="p-6 hover:bg-gray-50 transition-colors relative"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 flex-1">
                                    {/* Avatar/Initial */}
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                        {reservation.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </div>

                                    {/* Reservation Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3 mb-1">
                                            <h3 className="font-semibold text-gray-900 truncate">
                                                {reservation.name}
                                            </h3>
                                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                <span>{statusConfig.label}</span>
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            No. Registrasi: <span className="font-mono font-medium">{reservation.regNo}</span>
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{reservation.time}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center space-x-2">
                                    {reservation.status === "pending" && (
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                                            Approve
                                        </button>
                                    )}

                                    <div className="relative">
                                        <button
                                            onClick={() => setSelectedReservation(
                                                selectedReservation === reservation.id ? null : reservation.id
                                            )}
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {selectedReservation === reservation.id && (
                                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                                    <Eye className="w-4 h-4" />
                                                    <span>Lihat Detail</span>
                                                </button>
                                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                                    <Edit className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </button>
                                                <hr className="my-1" />
                                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                                                    <Trash className="w-4 h-4" />
                                                    <span>Hapus</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Menampilkan {reservations.length} dari total reservasi hari ini
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Approve Semua Pending
                        </button>
                        <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Export Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
