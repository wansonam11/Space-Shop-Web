import "antd/dist/antd.css";
import "./App.css";
import MainPageComponent from "./main/";
import UploadPage from "./upload";
import ProductPage from "./product";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function App() {
  const history = useHistory();
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/logo/logo.png" />
          </Link>
          <Button
            size="large"
            onClick={function () {
              history.push("/upload");
            }}
            icon={<UploadOutlined />}
          >
            商品を登録する
          </Button>
        </div>
      </div>

      <div id="body">
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
      <div id="footer"></div>
    </div>
  );
}

export default App;
