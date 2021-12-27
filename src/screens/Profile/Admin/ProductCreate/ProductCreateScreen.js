import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import { createProduct } from "../../../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../../constants/productConstants";
import DropNotif from "../../../../components/Modal/Modal";
import MarkdownEditor from "../../../../components/TextEditor/MarkdownEditor";

const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [idpackage, setidpackage] = useState(0);
  const [idcategory, setidcategory] = useState(0);
  const [is_main, setis_main] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product, success } = productCreate;

  const submitHandler = (e) => {
    const file = image;
    const formData = new FormData();
    // console.log(file.name);
    const obj = {
      name: name,
      description: description,
      price: parseInt(price),
      idpackage: parseInt(idpackage),
      idcategory: parseInt(idcategory),
      is_main: parseInt(is_main),
    };

    // console.log(obj);
    formData.append("data", JSON.stringify(obj));
    formData.append("images", file);
    // setUploading(true);

    // console.log(formData.getAll(`images`));
    dispatch(createProduct(formData));
  };

  const uplImgHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  return (
    <>
      <Container className="mb-5">
        <Link to="/admin/product/list" className="btn btn-primary my-3">
          Go Back
        </Link>

        <h1>Create Product</h1>

        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <DropNotif
            heading="Create Product"
            text="Create Product Successfully"
            resetData={() => {
              history.push(`/admin/product/${product.idproducts}/edit`);
              dispatch({ type: PRODUCT_CREATE_RESET });
            }}
          ></DropNotif>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          // MULAI DARI SINI ==================================================================================================
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>New Product Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Product Name.."
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Product Description</Form.Label>
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
                onChange={uplImgHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <div>
              Preview Image
              <br />
              <img id="imgpreview" width="150px" height="150px" />
            </div>

            <Form.Group controlId="selection">
              <Form.Label>Is it Main Picture</Form.Label>
              <Form.Control
                as="select"
                placeholder="Main/Secondary Picture"
                value={is_main}
                onChange={(e) => setis_main(e.target.value)}
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
              Create product
            </Button>

            <Button className="mt-3" type="reset" variant="secondary">
              Reset
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProductCreateScreen;
