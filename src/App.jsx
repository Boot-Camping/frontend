import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <DetailPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
