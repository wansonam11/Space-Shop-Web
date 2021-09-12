import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { Divider, message } from "antd";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";
import { Button } from "antd";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(function () {
    getProduct();
  }, []);

  if (product === null) {
    return <h1>商品情報を受けています。</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="information-box">
        <div id="profile-box">
          <span>{product.name}</span>
        </div>
        <div id="contents-box">
          <div id="seller-box">
            <img src="/images/logo/avatar.png" />
            <div id="name">{product.seller}</div>
          </div>
          <div id="contents-box2">
            <div id="price">{product.price}円</div>
            <div id="createdAt">
              {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
            </div>
            <Button
              id="purchase-button"
              size="large"
              type="primary"
              danger
              onClick={onClickPurchase}
              disabled={product.soldout === 1}
            >
              구매하기
            </Button>
            <Divider />
            <pre id="description">{product.description}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
