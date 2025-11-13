import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import ProblemStatement from "./pages/ProblemStatement";
import Solution from "./pages/Solution";
import ERModel from "./pages/ERModel";
import RelationalModel from "./pages/RelationalModel";
import IntegrityConstraints from "./pages/IntegrityConstraints";
import Normalization from "./pages/Normalization";
import Conclusion from "./pages/Conclusion";
import Bibliography from "./pages/Bibliography";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/problem-statement" element={<ProblemStatement />} />
              <Route path="/solution" element={<Solution />} />
              <Route path="/er-model" element={<ERModel />} />
              <Route path="/relational-model" element={<RelationalModel />} />
              <Route path="/integrity-constraints" element={<IntegrityConstraints />} />
              <Route path="/normalization" element={<Normalization />} />
              <Route path="/conclusion" element={<Conclusion />} />
              <Route path="/bibliography" element={<Bibliography />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
