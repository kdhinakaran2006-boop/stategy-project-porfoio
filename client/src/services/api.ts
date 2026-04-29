const API_BASE = '/api';

export const projectService = {
  async getAll() {
    const res = await fetch(`${API_BASE}/projects`, { credentials: 'include' });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  },
  async getById(id: string) {
    const res = await fetch(`${API_BASE}/projects/${id}`, { credentials: 'include' });
    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
  },
  async create(data: any) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (!res.ok) throw new Error("Failed to create project");
    return res.json();
  }
};

export const insightsService = {
  async getInsights() {
    const res = await fetch(`${API_BASE}/insights`, { credentials: 'include' });
    if (!res.ok) throw new Error("Failed to fetch insights");
    return res.json();
  }
};

export const reportService = {
  async getReports() {
    const res = await fetch(`${API_BASE}/reports`, { credentials: 'include' });
    if (!res.ok) throw new Error("Failed to fetch reports");
    return res.json();
  }
};

export const simulationService = {
  async run(data: { budgetDelta: number; teamDelta: number }) {
    const res = await fetch(`${API_BASE}/projects/simulation`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (!res.ok) throw new Error("Failed to run simulation");
    return res.json();
  }
};
