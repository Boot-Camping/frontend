import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage";
import BookPage from "./pages/BookPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <DetailPage />
        <BookPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
