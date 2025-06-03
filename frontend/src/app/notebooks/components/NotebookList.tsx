import { Notebook } from "@/lib/types";
import NotebookCard from "./NotebookCard";

type Props = {
  notebooks: Notebook[];
};

export default function NotebookList({ notebooks }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-200 p-4 rounded-xl">
      {notebooks.map((notebook) => (
        <NotebookCard key={notebook.id} notebook={notebook} />
      ))}
    </div>
  );
}
