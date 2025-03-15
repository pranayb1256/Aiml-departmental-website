import { useEffect, useState } from "react";
import axios from "axios";

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("http://localhost:8001/api/audit");
                console.log("✅ API Response:", response.data);
                setLogs(response.data);
            } catch (err) {
                console.error("❌ Error fetching logs:", err);
                setError("Failed to fetch audit logs.");
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
             Audit Logs
            </h2>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center">
                    <p className="text-lg text-gray-600 animate-pulse">Fetching logs...</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-red-600 text-center font-semibold">{error}</p>
            )}

            {/* Logs Table */}
            {!loading && logs.length > 0 ? (
                <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="border px-4 py-3 text-left">Admin</th>
                                <th className="border px-4 py-3 text-left">Action</th>
                                <th className="border px-4 py-3 text-left">Club</th>
                                <th className="border px-4 py-3 text-left">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, index) => (
                                <tr key={log._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                    <td className="border px-4 py-2">{log.adminEmail || "N/A"}</td>
                                    <td className="border px-4 py-2">{log.action || "N/A"}</td>
                                    <td className="border px-4 py-2">{log.eventId?.clubName || "Unknown"}</td>
                                    <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !loading && !error && (
                    <p className="text-gray-600 text-center text-lg mt-4">
                        No logs found.
                    </p>
                )
            )}
        </div>
    );
};

export default AuditLogs;
