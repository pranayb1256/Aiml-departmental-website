import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const Accordion = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

export const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="p-4 bg-white text-gray-700"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
