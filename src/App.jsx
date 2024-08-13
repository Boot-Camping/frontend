import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import UserInfoPage from "./pages/UserInfoPage";
import PaidPage from "./pages/PaidPage";
import SavePage from "./pages/SavePage";
import CashPage from "./pages/CashPage";
import NoticePage from "./pages/NoticePage";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/userinfo" element={<UserInfoPage />} />
          <Route path="/paid" element={<PaidPage />} />
          <Route path="/save" element={<SavePage />} />
          <Route path="/cash" element={<CashPage />} />
          <Route path="/notice" element={<NoticePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
