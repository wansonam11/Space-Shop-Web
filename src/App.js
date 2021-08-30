import "./App.css";
import MainPageComponent from "./main/";
import UploadPage from "./upload";
import ProductPage from "./product";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <switch>
        <Route exact={true} path="/">
          <MainPageComponent />
        </Route>
        <Route exact={true} path="/products/:id">
          <ProductPage />
        </Route>
        <Route exact={true} path="/upload">
          <UploadPage />
        </Route>
      </switch>
    </div>
  );
}

export default App;
