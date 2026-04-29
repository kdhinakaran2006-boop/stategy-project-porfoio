import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "@/components/ui/Sidebar";
import { Header } from "@/components/ui/Header";

// Pages
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Insights from "@/pages/Insights";
import Simulation from "@/pages/Simulation";
import Reports from "@/pages/Reports";
import Chat from "@/pages/Chat";

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-col min-h-screen ml-auto transition-all duration-300" style={{ width: 'calc(100% - 280px)' }}>
        <Header />
        <main className="flex-1 p-10 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <PageWrapper key={location.pathname}>
              {children}
            </PageWrapper>
          </AnimatePresence>
        </main>
        <footer className="px-10 py-8 border-t border-slate-100 bg-white text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            STRATOS AI &copy; 2026 &mdash; Enterprise Strategic Intelligence &mdash; v2.4.1
          </p>
        </footer>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/projects" element={<ProtectedLayout><Projects /></ProtectedLayout>} />
      <Route path="/projects/:id" element={<ProtectedLayout><ProjectDetail /></ProtectedLayout>} />
      <Route path="/insights" element={<ProtectedLayout><Insights /></ProtectedLayout>} />
      <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />
      <Route path="/simulation" element={<ProtectedLayout><Simulation /></ProtectedLayout>} />
      <Route path="/chat" element={<ProtectedLayout><Chat /></ProtectedLayout>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
