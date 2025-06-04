"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { getCoursesByTerm } from "@/lib/api/course";
import { Course } from "@/lib/types";
import CourseCard from "@/shared/CourseCard";
import EditCourseModal from "@/shared/EditCourseModal";

interface TermAccordionProps {
  termId: number;
  title: string;
  onEdit: (termId: number) => void;
  courses: Course[];
}

const TermAccordion: React.FC<TermAccordionProps> = ({
  termId,
  title,
  onEdit,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const fetchCourses = async () => {
    try {
      const data = await getCoursesByTerm(termId);
      setCourses(data);
    } catch (err) {
      console.error("Error cargando cursos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [termId]);

  const handleCourseClick = (id: number) => {
    setSelectedCourseId(id);
    setIsEditOpen(true);
  };

  return (
    <div className="border rounded-xl my-6 mx-6 lg:mx-8 shadow-sm bg-[#e5e8fc]">
      <div
        className="flex justify-between items-center px-5 py-4 cursor-pointer border-b bg-white rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-[#2c3e50]">{title}</h2>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(termId);
          }}
          className="text-[#39439f] hover:text-[#2e336d]"
        >
          <Pencil size={18} />
        </button>
      </div>

      {isOpen && (
        <div className="px-6 lg:px-6 p-6">
          {loading ? (
            <p className="text-sm text-gray-500">Cargando cursos...</p>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  editable={true}
                  showDetails={false}
                  onClick={handleCourseClick}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No hay cursos registrados en este término.
            </p>
          )}
        </div>
      )}

      <EditCourseModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        courseId={selectedCourseId}
        termId={termId}
        onUpdated={fetchCourses}
      />
    </div>
  );
};

export default TermAccordion;
