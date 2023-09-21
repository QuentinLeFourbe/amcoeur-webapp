import { BrowserRouter } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages";
import PageContainer from "./components/organisms/PageContainer/PageContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageContainer>
          <IndexPage />
        </PageContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
