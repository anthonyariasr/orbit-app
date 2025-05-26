import { useState } from "react";

export const useHomeModals = () => {
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  return {
    isTermModalOpen,
    setIsTermModalOpen,
    isCourseModalOpen,
    setIsCourseModalOpen,
    isAssignmentModalOpen,
    setIsAssignmentModalOpen,
  };
};
