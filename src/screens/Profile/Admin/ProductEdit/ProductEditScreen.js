import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import {
  getProductDetail,
  getProducts,
  updateProduct,
} from "../../../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../../../constants/productConstants";
import DropNotif from "../../../../components/Modal/Modal";
import MarkdownEditor from "../../../../components/TextEditor/MarkdownEditor";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [idpackage, setidpackage] = useState(0);
  const [idcategory, setidcategory] = useState(0);
  const [is_main, setis_main] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  // useEffect(() => {
  //   if (!name || currentId !== productId) {
  //     dispatch(getProductDetail(productId));
  //   } else {
  //     setName(product[0].name);
  //     setPrice(product[0].price);
  //     setDescription(product[0].description);
  //   }
  // }, [dispatch, productId, currentId]);

  //cek
  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, [dispatch, productId]);

  const loadHandler = () => {
    setName(product[1].name);
    setDescription(product[1].description);
    setPrice(product[1].price);
    setidpackage(product[1].idpackage);
    setidcategory(product[1].idcategory);
    setis_main(product[1].is_main);
    setImage(product[1].url);
  };

  const submitHandler = (e) => {
    const updateFile = image;
    const formData = new FormData();

    const updObj = {
      name: name,
      description: description,
      price: parseInt(price),
      idpackage: parseInt(idpackage),
      // idcategory: parseInt(idcategory),
      // is_main: parseInt(is_main),
    };

    formData.append("data", JSON.stringify(updObj));
    formData.append("images", updateFile);

    dispatch(updateProduct(productId, formData));
  };

  const updImgHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
      console.log(image);
    }
  };

  if (product.length === 0) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Container className="mb-5">
        <Link to="/admin/product/list" className="btn btn-primary my-3">
          Go Back
        </Link>
        <h1>Edit Product</h1>
        <Button
          onClick={loadHandler}
          className="btn btn-warning btn-outline-danger btn-sm"
        >
          Load Current Product Data
        </Button>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {successUpdate && (
          <DropNotif
            heading="Update Product"
            text="Update Product Successfully"
            resetData={() => {
              dispatch({ type: PRODUCT_UPDATE_RESET });
            }}
          ></DropNotif>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          // MULAI DARI SINI =================================================================================================

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Edit Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* <h1>{product.length > 0 ? product[0].name : null} </h1>
            <Button onClick={() => console.log(product)}>Click</Button> */}

            <Form.Group controlId="description">
              <Form.Label>Edit Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="idpackage">
              <Form.Label>Package Type</Form.Label>
              <br />
              <Form.Check inline>
                <input
                  class="form-check-input"
                  type="radio"
                  name="idpackageRadio"
                  id="package1"
                  value={2}
                  checked={idpackage === 2 ? true : false}
                  onChange={(e) => setidpackage(e.target.value)}
                />
                <label class="form-check-label" for="package1">
                  250 gr
                </label>
              </Form.Check>

              <Form.Check inline>
                <input
                  class="form-check-input"
                  type="radio"
                  name="idpackageRadio"
                  id="package2"
                  value={3}
                  checked={idpackage === 3 ? true : false}
                  onChange={(e) => setidpackage(e.target.value)}
                />
                <label class="form-check-label" for="package2">
                  500 gr
                </label>
              </Form.Check>

              <Form.Check inline>
                <input
                  class="form-check-input"
                  type="radio"
                  name="idpackageRadio"
                  id="package3"
                  value={4}
                  checked={idpackage === 3 ? true : false}
                  onChange={(e) => setidpackage(e.target.value)}
                />
                <label class="form-check-label" for="package3">
                  1000 gr
                </label>
              </Form.Check>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>

              <Form.File
                id="image-file"
                custom
                onChange={updImgHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <div>
              Preview Image
              <br />
              <img
                id="imgpreview"
                src={"http://localhost:2001/" + image}
                alt="Currently No Image Uploaded"
                width="150px"
                height="150px"
              />
            </div>

            <Form.Group controlId="selection">
              <Form.Label>Is it Main Picture</Form.Label>
              <Form.Control
                as="select"
                placeholder="Main/Secondary Picture"
                value={is_main}
                onChange={(e) => setis_main(e.target.value)}
                disabled
              >
                <option value=""></option>
                <option value="1">Main Picture</option>
                <option value="2">Secondary Picture</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="selection">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter the category"
                value={idcategory}
                onChange={(e) => setidcategory(e.target.value)}
                disabled
              >
                <option value=""></option>
                <option value="2">Beverage</option>
                <option value="3">Roast Bean</option>
                <option value="4">Drip</option>
                <option value="5">Ready to Drink</option>
                <option value="6">Green Bean</option>
                <option value="7">Capsule</option>
                <option value="8">Syrup</option>
                <option value="9">Powder</option>
                <option value="10">Tea</option>
                <option value="11">Milk</option>
              </Form.Control>
            </Form.Group>

            <Button className="mt-3" type="submit" variant="primary">
              Update Product
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProductEditScreen;
