import "./index.css";
import {
  Form,
  Divider,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import { API_URL } from "../config/constants";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        history.replace("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">商品の写真</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/logo/camera.png" />
                <span>写真をアップロード</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          label={<div className="upload-label">販売者</div>}
          name="seller"
          rules={[{ required: true, message: "販売者を入力してください。" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="名前を入力してください。"
          />
        </Form.Item>

        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">商品名</div>}
          rules={[{ required: true, message: "商品名を入力してください。" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품 이름을 입력해주세요"
          />
        </Form.Item>
        <Divider />

        <Form.Item
          name="price"
          label={<div className="upload-label">商品物価</div>}
          rules={[{ required: true, message: "価格を入力してください。" }]}
        >
          <InputNumber
            defaultValue={0}
            className="upload-price"
            size="large"
          ></InputNumber>
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">商品紹介 </div>}
          rules={[{ required: true, message: "商品情報を登録してください。" }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount
            maxLength={300}
            placeholder="상商品情報を登録してください。"
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            商品を登録する
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
