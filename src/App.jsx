import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import DetailPage from "./pages/DetailPage";
import BookPage from "./pages/BookPage";
import BookingPaymentPage from "./pages/PaymentPage";
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
import AdminCampFixPage from "./pages/AdminCampFixPage";
import AdminNoticeRegiPage from "./pages/AdminNoticeRegisterPage";
import AdminNoticeList from "./pages/AdminNoticeListPage";
import AdminNoticeFixPage from "./pages/AdminNoticeFixPage";
import AdminBookListPage from "./pages/AdminBookListPage";
import AdminBookDetailPage from "./pages/AdminBookDetailPage";
import CategoryPage from "./pages/CategoryPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import ReviewWriter from "./components/review-page/ReviewWriter";

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
          <Route path="/user/delete" element={<DeleteAccountPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/review/" element={<ReviewWriter />} />
          <Route path="/userinfo" element={<UserInfoPage />} />
          <Route path="/paid" element={<PaidPage />} />
          <Route path="/save" element={<SavePage />} />
          <Route path="/cash" element={<CashPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/book" element={<BookingPaymentPage />} />
          <Route path="/admin" element={<AdminMainPage />} />
          <Route path="/SearchPage" element={<SearchPage />} />
          <Route path="/admin/camping" element={<AdminCampingRegisterPage />} />
          <Route path="/admin/camping-fix" element={<AdminCampFixPage />} />
          <Route path="/admin/notice-regi" element={<AdminNoticeRegiPage />} />
          <Route path="/admin/notice-list" element={<AdminNoticeList />} />
          <Route path="/admin/notice-fix" element={<AdminNoticeFixPage />} />
          <Route path="/admin/book-list" element={<AdminBookListPage />} />
          <Route path="/admin/book-detail" element={<AdminBookDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
