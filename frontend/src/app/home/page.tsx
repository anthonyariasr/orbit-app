"use client";

import { useState } from "react";
import FloatingAddButton from "./components/FloatingAddButton ";
import EmptyTermView from "./components/EmptyTermView";
import TermLayout from "./components/TermLayout";
import Modals from "./components/Modals";
import EditCourseModal from "./components/EditCourseModal";
import EditAssignmentModal from "./components/EditAssignmentModal";
import { useActiveTerm } from "@/hooks/useActiveTerm";
import { useHomeModals } from "@/hooks/useHomeModals";

const HomePage = () => {
  const {
    term,
    events,
    assignments,
    setTerm,
    refreshCourses,
    refreshCalendarEvents,
    refreshAssignments,
    finishTerm
  } = useActiveTerm();

  const {
    isTermModalOpen,
    setIsTermModalOpen,
    isCourseModalOpen,
    setIsCourseModalOpen,
    isAssignmentModalOpen,
    setIsAssignmentModalOpen,
  } = useHomeModals();

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    number | null
  >(null);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [isEditAssignmentModalOpen, setIsEditAssignmentModalOpen] =
    useState(false);

  return (
    <main className="flex-1 min-h-screen bg-[#F3F4F6] flex flex-col relative">
      {term ? (
        <TermLayout
          term={term}
          events={events}
          assignments={assignments}
          onSelectCourse={(id) => {
            setSelectedCourse(id);
            setIsEditCourseModalOpen(true);
          }}
          onSelectAssignment={(id) => {
            setSelectedAssignmentId(id);
            setIsEditAssignmentModalOpen(true);
          }}
          onFinishTerm={finishTerm} 
        />
      ) : (
        <EmptyTermView onCreate={() => setIsTermModalOpen(true)} />
      )}

      <FloatingAddButton
        onAddCourse={() => setIsCourseModalOpen(true)}
        onAddAssignment={() => setIsAssignmentModalOpen(true)}
      />

      <Modals
        term={term}
        setTerm={setTerm}
        isModalOpen={isTermModalOpen}
        setIsModalOpen={setIsTermModalOpen}
        isCourseModalOpen={isCourseModalOpen}
        setIsCourseModalOpen={setIsCourseModalOpen}
        isAssignmentModalOpen={isAssignmentModalOpen}
        setIsAssignmentModalOpen={setIsAssignmentModalOpen}
        refreshCourses={refreshCourses}
        refreshCalendarEvents={refreshCalendarEvents}
        refreshAssignments={refreshAssignments}
      />

      <EditCourseModal
        isOpen={isEditCourseModalOpen}
        courseId={selectedCourse}
        termId={term?.id!}
        onClose={() => setIsEditCourseModalOpen(false)}
        onUpdated={async () => {
          await refreshCourses();
          await refreshCalendarEvents();
        }}
      />

      <EditAssignmentModal
        isOpen={isEditAssignmentModalOpen}
        assignmentId={selectedAssignmentId}
        courses={term?.courses ?? []}
        termId={term?.id!}
        onClose={() => setIsEditAssignmentModalOpen(false)}
        onUpdated={async () => {
          await refreshAssignments();
          await refreshCalendarEvents();
        }}
      />
    </main>
  );
};

export default HomePage;
