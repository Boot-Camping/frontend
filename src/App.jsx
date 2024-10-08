import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import DetailPage from "./pages/DetailPage";
import BookPage from "./pages/BookPage";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";
import LoginAccountPage from "./pages/LoginAccountPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import UserInfoPage from "./pages/UserInfoPage";
import PaidPage from "./pages/PaidPage";
import SavePage from "./pages/SavePage";
import CashPage from "./pages/CashPage";
import NoticePage from "./pages/NoticePage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import AdminMainPage from "./pages/AdminMainPage";
import AdminCampingRegisterPage from "./pages/AdminCampingRegisterPage";
import AdminCampingListPage from "./pages/AdminCampingListPage";
import AdminCampFixPage from "./pages/AdminCampFixPage";
import AdminNoticeRegiPage from "./pages/AdminNoticeRegisterPage";
import AdminNoticeList from "./pages/AdminNoticeListPage";
import AdminNoticeFixPage from "./pages/AdminNoticeFixPage";
import AdminBookListPage from "./pages/AdminBookListPage";
import CategoryPage from "./pages/CategoryPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import ReviewWriter from "./components/my-review-page/ReviewWriter";
import MyReviewPage from "./pages/MyReviewPage";
import { CampingDaysProvider } from "./context/campingDaysContext";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <CampingDaysProvider>
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/categorypage/:categories"
                element={<CategoryPage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/account" element={<LoginAccountPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/user/delete" element={<DeleteAccountPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/review" element={<ReviewWriter />} />

              <Route path="/mypage/myreview" element={<MyReviewPage />} />
              <Route path="/userinfo" element={<UserInfoPage />} />
              <Route path="/paid" element={<PaidPage />} />
              <Route path="/save" element={<SavePage />} />
              <Route path="/cash" element={<CashPage />} />
              <Route path="/notice" element={<NoticePage />} />
              <Route path="/notice/:id" element={<NoticeDetailPage />} />
              <Route path="/camping/detail/:campId" element={<DetailPage />} />
              <Route path="/camping/book/:campId" element={<BookPage />} />
              <Route path="/admin" element={<AdminMainPage />} />
              <Route path="/SearchPage" element={<SearchPage />} />
              <Route
                path="/admin/camping"
                element={<AdminCampingRegisterPage />}
              />
              <Route
                path="/admin/camping-list"
                element={<AdminCampingListPage />}
              />
              <Route
                path="/admin/camp-fix/:id"
                element={<AdminCampFixPage />}
              />
              <Route
                path="/admin/notice-regi"
                element={<AdminNoticeRegiPage />}
              />
              <Route path="/admin/notice-list" element={<AdminNoticeList />} />
              <Route
                path="/admin/notice-fix/:id"
                element={<AdminNoticeFixPage />}
              />
              <Route path="/admin/book-list" element={<AdminBookListPage />} />
            </Routes>
          </main>
        </CampingDaysProvider>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
