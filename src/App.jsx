import { useState } from "react";
import "./App.css";
import AdminMainPage from "./pages/AdminMainPage";
import AdminCampingRegister from "./pages/AdminCampingRegister";

function App() {
  return (
    <>
      <main>
        <AdminMainPage />
        {/* <AdminCampingRegister /> */}
      </main>
    </>
  );
}

export default App;
