import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, Download, Award, Calendar, User } from "lucide-react";
import jsPDF from "jspdf";

const mockCertificates = {
  "AIML-2025-HACK-001": {
    id: "AIML-2025-HACK-001",
    name: "Alice Johnson",
    event: "AIML National Hackathon 2025",
    date: "March 15, 2025",
    role: "1st Runner Up",
    issuedBy: "Dr. Smith (HOD AIML)"
  },
  "AIML-2025-WKS-012": {
    id: "AIML-2025-WKS-012",
    name: "Bob Smith",
    event: "Generative AI Masterclass",
    date: "January 20, 2025",
    role: "Participant",
    issuedBy: "AI Student Club"
  },
  "AIML-2024-AI-005": {
    id: "AIML-2024-AI-005",
    name: "Charlie Davis",
    event: "AI Symposium 2024",
    date: "November 10, 2024",
    role: "Winner",
    issuedBy: "Dr. Smith (HOD AIML)"
  }
};

export default function CertificateVerifier() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null); // null = not searched, object = valid, false = invalid
  const [isSearching, setIsSearching] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setIsSearching(true);
    setResult(null);

    // Simulate network delay
    setTimeout(() => {
      const found = mockCertificates[certId.trim().toUpperCase()];
      setResult(found || false);
      setIsSearching(false);
    }, 800);
  };

  const downloadPDF = () => {
    if (!result || result === false) return;
    
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    // Simple Certificate Design
    doc.setFillColor(240, 248, 255); // Light blue bg
    doc.rect(0, 0, 297, 210, "F");
    
    // Border
    doc.setDrawColor(37, 99, 235); // Blue border
    doc.setLineWidth(3);
    doc.rect(10, 10, 277, 190);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.setTextColor(31, 41, 55);
    doc.text("Certificate of Achievement", 148.5, 50, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.text("This is proudly presented to", 148.5, 80, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(37, 99, 235);
    doc.text(result.name, 148.5, 100, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(75, 85, 99);
    doc.text(`For being a ${result.role} at the`, 148.5, 120, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(31, 41, 55);
    doc.text(result.event, 148.5, 140, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Date: ${result.date}`, 148.5, 160, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`Certificate ID: ${result.id}`, 20, 190);
    doc.text(`Issued by: ${result.issuedBy}`, 220, 190);

    doc.save(`${result.id}_Certificate.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Certificate Verifier
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Enter a Certificate ID to verify its authenticity and download a digital copy.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto mb-12"
        >
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors uppercase"
                placeholder="e.g. AIML-2025-HACK-001"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex justify-center items-center disabled:opacity-70"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify"
              )}
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-500 text-center">
            Try: <span className="font-mono bg-gray-100 px-2 py-1 rounded">AIML-2025-HACK-001</span> or <span className="font-mono bg-gray-100 px-2 py-1 rounded">AIML-2024-AI-005</span>
          </div>
        </motion.div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {result !== null && (
            <motion.div
              key={result === false ? "invalid" : "valid"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-6 md:p-10 rounded-2xl shadow-sm border-2 ${
                result === false ? "bg-red-50 border-red-200" : "bg-white border-green-200"
              }`}
            >
              {result === false ? (
                <div className="text-center">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Invalid Certificate ID</h3>
                  <p className="text-gray-600">
                    We couldn't find any certificate matching "{certId.toUpperCase()}". Please check the ID and try again.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto md:mx-0">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-2">
                        ✓ Officially Verified
                      </span>
                      <h3 className="text-3xl font-bold text-gray-900">{result.event}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-gray-700">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Recipient</p>
                          <p className="font-semibold">{result.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Award className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Role</p>
                          <p className="font-semibold">{result.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                          <p className="font-semibold">{result.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">Issued By</p>
                          <p className="font-semibold">{result.issuedBy}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button 
                        onClick={downloadPDF}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        <Download className="w-5 h-5" />
                        Download Certificate (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
