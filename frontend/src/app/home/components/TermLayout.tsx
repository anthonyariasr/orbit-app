import UpcomingAssignments from "./UpcomingAssignments";
import { Assignment, Term, CalendarEvent } from "@/lib/types";
import TermHeader from "./TermHeader";
import CourseList from "./CourseList";
import TermCalendar from "./TermCalendar";

interface TermLayoutProps {
  term: Term;
  events: CalendarEvent[];
  assignments?: Assignment[];
  onSelectCourse: (courseId: number | null) => void;
  onSelectAssignment: (id: number) => void;
  onFinishTerm: () => Promise<void>; // ✅ nueva prop
}

const TermLayout = ({
  term,
  events,
  assignments = [],
  onSelectCourse,
  onSelectAssignment,
  onFinishTerm, // ✅ recibido desde el padre
}: TermLayoutProps) => {
  return (
    <>
      <TermHeader
        title={term.name}
        showFinishButton={term.is_active}
        onFinish={onFinishTerm} // ✅ se pasa la función
      />

      <div className="flex flex-col lg:flex-row px-8">
        <div className="lg:ml-8 mt-4">
          <UpcomingAssignments
            assignments={assignments}
            courses={term.courses}
            onSelect={onSelectAssignment}
          />
          <CourseList courses={term.courses} onSelect={onSelectCourse} />
        </div>

        <TermCalendar events={events} />
      </div>
    </>
  );
};

export default TermLayout;
