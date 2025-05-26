import { Assignment, Course } from "@/lib/types";
import AssignmentCard from "./AssignmentCard";

interface Props {
  assignments: Assignment[];
  courses: Course[];
  onSelect: (id: number) => void;
}

const UpcomingAssignments = ({ assignments, courses, onSelect }: Props) => {
  const enrichedAssignments = assignments.map((a) => {
    const course = courses?.find((c) => c.id === a.course_id);
    return {
      ...a,
      course_name: course?.name ?? undefined,
    };
  });

  const upcoming = enrichedAssignments
    .filter((a) => a.due_date && new Date(a.due_date) > new Date())
    .sort(
      (a, b) =>
        new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime()
    )
    .slice(0, 3);

  return (
    <section className="px-0 pt-6 pb-4 mt-4 lg:w-80">
      <h2 className="text-xl font-semibold text-[#4e4e4e] mb-4">
        Próximas entregas
      </h2>

      {upcoming.length > 0 ? (
        <div className="flex flex-col gap-4">
          {upcoming.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onClick={() => onSelect(assignment.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-none border border-dashed border-gray-300 rounded-2xl p-6 text-center text-gray-500 italic">
          No hay entregas próximas.
        </div>
      )}
    </section>
  );
};

export default UpcomingAssignments;
