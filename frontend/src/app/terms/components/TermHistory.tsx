"use client";

import { useEffect, useState } from "react";
import TermAccordion from "./TermAccordion";
import EditTermModal from "./EditTermModal";
import TermHeader from "./TermHeader";
import api from "@/lib/axios";
import { Term } from "@/lib/types";

const TermHistory = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTerms = async () => {
    try {
      const res = await api.get<Term[]>("/terms");
      const sortedTerms = res.data.sort((a, b) => a.id - b.id);
      setTerms(sortedTerms);
    } catch (error) {
      console.error("Error fetching terms:", error);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const handleEditClick = (termId: number) => {
    const term = terms.find((t) => t.id === termId);
    if (term) {
      setSelectedTerm(term);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTerm(null);
  };

  const handleTermUpdated = async () => {
    await fetchTerms();
    handleModalClose();
  };

  return (
    <div className="">
      <TermHeader title="Historial académico" />

      {terms.map((term) => (
        <TermAccordion
          key={term.id}
          termId={term.id}
          title={term.name}
          onEdit={handleEditClick}
        />
      ))}

      {selectedTerm && (
        <EditTermModal
          term={selectedTerm}
          isOpen={modalOpen}
          onClose={handleModalClose}
          onUpdated={handleTermUpdated} // ✅ refresca tras editar o eliminar
        />
      )}
    </div>
  );
};

export default TermHistory;
