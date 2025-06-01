"use client";

import TermAccordion from "./TermAccordion";
import EditTermModal from "./EditTermModal";
import TermHeader from "./TermHeader";
import { useState } from "react";
import { Term } from "@/lib/types";
import { useTermHistory } from "@/hooks/useTermHistory";

const TermHistory = () => {
  const { terms, loading, error, refetch } = useTermHistory();
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    await refetch();
    handleModalClose();
  };

  return (
    <div className="pb-6">
      <TermHeader title="Historial académico" />

      {loading && <p className="text-gray-500 px-6">Cargando términos...</p>}
      {error && <p className="text-red-500 px-6">{error}</p>}

      {terms.map((term) => (
        <TermAccordion
          key={term.id}
          termId={term.id}
          title={term.name}
          courses={term.courses} // ✅ acceso directo sin llamadas extra
          onEdit={handleEditClick}
        />
      ))}

      {selectedTerm && (
        <EditTermModal
          term={selectedTerm}
          isOpen={modalOpen}
          onClose={handleModalClose}
          onUpdated={handleTermUpdated}
        />
      )}
    </div>
  );
};

export default TermHistory;
