// components/Modals.tsx
import AssignmentModal from "./AssignmentModal";
import CourseModal from "./CourseModal";
import TermModal from "./TermModal";
import { Term } from "@/lib/types";
import { createCourse } from "@/lib/api/course";
import { createTerm } from "@/lib/api/term";
import { createAssignment } from "@/lib/api/assignment";

interface ModalsProps {
  term: Term | null;
  setTerm: (term: Term) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isCourseModalOpen: boolean;
  setIsCourseModalOpen: (open: boolean) => void;
  isAssignmentModalOpen: boolean;
  setIsAssignmentModalOpen: (open: boolean) => void;
  refreshCourses: () => Promise<void>;
  refreshCalendarEvents: () => Promise<void>;
  refreshAssignments: () => Promise<void>;
}

const Modals = ({
  term,
  setTerm,
  isModalOpen,
  setIsModalOpen,
  isCourseModalOpen,
  setIsCourseModalOpen,
  isAssignmentModalOpen,
  setIsAssignmentModalOpen,
  refreshCourses,
  refreshCalendarEvents,
  refreshAssignments,
}: ModalsProps) => {
  const handleCreateTerm = async (data: { name: string }) => {
    try {
      const response = await createTerm(data);
      setTerm({
        id: response.id,
        name: response.name,
        is_active: response.is_active,
        courses: [],
        progress: 0,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al crear el término:", error);
    }
  };

  const handleCreateCourse = async (data: any) => {
    if (!term) return;
    try {
      await createCourse(data);
      await refreshCourses();
      await refreshCalendarEvents();
      setIsCourseModalOpen(false);
    } catch (error) {
      console.error("Error al crear curso:", error);
    }
  };

  const handleCreateAssignment = async (data: {
    name: string;
    due_date: string;
    course_id: number;
  }) => {
    if (!term) return;
    try {
      await createAssignment({
        ...data,
        term_id: term.id,
      });
      await refreshAssignments();
      await refreshCalendarEvents();
      setIsAssignmentModalOpen(false);
    } catch (error) {
      console.error("Error al crear pendiente:", error);
    }
  };

  return (
    <>
      <AssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        onSubmit={handleCreateAssignment}
        courses={term?.courses ?? []}
      />

      {term && (
        <CourseModal
          termId={term.id}
          isOpen={isCourseModalOpen}
          onClose={() => setIsCourseModalOpen(false)}
          onSubmit={handleCreateCourse}
        />
      )}

      <TermModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTerm}
      />
    </>
  );
};

export default Modals;
