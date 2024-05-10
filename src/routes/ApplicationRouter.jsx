import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PromptChat from "../components/PromptChat/PromptChat";
import SherwinAI from "../components/SherwinAI/SherwinAI";
import About from "../components/About/About";

function ApplicationRouter() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path='/' element={<PromptChat />} />
        <Route path='/about' element={<About />} />
        <Route path='/sherwin-ai' element={<SherwinAI />} />
        <Route path='*' element={<PromptChat />} />
      </Routes>
    </Suspense>
  );
}

export default ApplicationRouter;
