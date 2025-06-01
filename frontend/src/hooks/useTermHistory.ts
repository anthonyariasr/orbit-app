import { useEffect, useState } from "react";
import { getTermsWithCourses } from "@/lib/api/term";
import { Term } from "@/lib/types";

export const useTermHistory = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTerms = async () => {
    try {
      const data = await getTermsWithCourses();
      const sorted = data.sort((a, b) => a.id - b.id);
      setTerms(sorted);
    } catch (err) {
      console.error("Error fetching terms:", err);
      setError("Could not load term history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  return {
    terms,
    loading,
    error,
    refetch: fetchTerms,
  };
};
