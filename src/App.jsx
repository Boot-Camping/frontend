import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import DetailPage from "./pages/DetailPage";
import BookPage from "./pages/BookPage";
import BookingPaymentPage from "./pages/BookingPaymentPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import UserInfoPage from "./pages/UserInfoPage";
import PaidPage from "./pages/PaidPage";
import SavePage from "./pages/SavePage";
import CashPage from "./pages/CashPage";
import NoticePage from "./pages/NoticePage";
import AdminMainPage from "./pages/AdminMainPage";
import AdminCampingRegisterPage from "./pages/AdminCampingRegisterPage";
import CategoryPage from "./pages/CategoryPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/categorypage" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/userinfo" element={<UserInfoPage />} />
          <Route path="/paid" element={<PaidPage />} />
          <Route path="/save" element={<SavePage />} />
          <Route path="/cash" element={<CashPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/book" element={<BookingPaymentPage />} />
          <Route path="/admin" element={<AdminMainPage />} />
          <Route path="/admin/camping" element={<AdminCampingRegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
