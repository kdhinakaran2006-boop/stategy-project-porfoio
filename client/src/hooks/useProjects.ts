import { useState, useEffect } from 'react';
import { projectService } from '@/services/api';

export function useProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    projectService.getAll()
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { projects, loading, error, refresh: () => setLoading(true) };
}
