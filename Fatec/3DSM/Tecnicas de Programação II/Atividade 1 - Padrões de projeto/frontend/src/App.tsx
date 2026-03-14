import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { LeadList } from "@/pages/LeadList";
import { NovaLead } from "@/pages/NovaLead";
import { LeadDetail } from "@/pages/LeadDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LeadList />} />
          <Route path="nova" element={<NovaLead />} />
          <Route path="leads/:id" element={<LeadDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
