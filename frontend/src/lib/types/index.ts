/**Auth */

export interface RegisterPayload {
  username: string;
  email: string;
  career: string;
  gender: "m" | "f" | "o";
  university?: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

/**Assignment */

export interface Assignment {
  id: number;
  name: string;
  due_date: string;
  course_id?: number | null;
  term_id: number;
}

export interface AssignmentPayload {
  name: string;
  due_date: string;
  course_id?: number | null;
  term_id: number;
}

/**Calendar */

export interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  type: "assignment" | "class";
  color: string;
}

/**Course*/

export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  professor_name?: string;
  room?: string;
  status: "in_progress" | "approved" | "failed";
  grade?: number;
  term_id: number;
}

export interface CoursePayload {
  code?: string;
  name: string;
  credits: number;
  professor_name?: string;
  room?: string;
  status?: "in_progress" | "approved" | "failed";
  term_id: number;
  grade?: number;
}

export interface CourseFinalizePayload {
  status: "approved" | "failed";
  grade?: number;
}

/**Schedule Slot */

export interface ScheduleSlot {
  id: number;
  day_of_week: string; // e.g. "Monday"
  start_time: string; // e.g. "08:00:00"
  end_time: string; // e.g. "10:30:00"
  course_id: number;
}

export interface ScheduleSlotPayload {
  day_of_week: string;
  start_time: string;
  end_time: string;
  course_id: number;
}

/**Term */

export interface TermPayload {
  name: string;
  is_active?: boolean;
}

export interface TermResponse {
  id: number;
  name: string;
  is_active: boolean;
  created_at?: string;
}

export interface Term {
  id: number;
  name: string;
  is_active: boolean;
  courses: Course[]; // Asegurate que esto esté definido
  progress: number; // Este campo es tuyo local
}

/**User */

export interface User {
  id: number;
  username: string;
  email: string;
  career: string;
  gender: "m" | "f" | "o";
  university?: string;
}

export type UserPayload = Omit<User, "id">;
