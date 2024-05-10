import React from "react";
import { Box } from '@mui/material';
import Sidebar from "./components/Sidebar/Sidebar";
import ApplicationRouter from "./routes/ApplicationRouter";

function App() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <ApplicationRouter />
      </Box>
    </>
  );
}

export default App;
