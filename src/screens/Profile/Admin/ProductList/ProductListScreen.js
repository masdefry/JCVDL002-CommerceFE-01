import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../../components/Message";
import Loader from "../../../../components/Loader";
import { Pagination } from "@mui/material";
import {
  getProducts,
  getProductsForSeller,
} from "../../../../actions/productActions";
import {
  deleteProduct,
  getProductDetail,
} from "../../../../actions/productActions";
import DropNotif from "../../../../components/Modal/Modal";
import { PRODUCT_DELETE_RESET } from "../../../../constants/productConstants";

const ProductListScreen = () => {
  var [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const productAll = useSelector((state) => state.productAll);
  const { loading, error, products } = productAll;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
    dispatch(getProducts(page));
  });

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const prevPageHandler = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPageHandler = () => {
    setPage(page + 1);
  };

  let productsFinal;
  productsFinal = products;

  const renderProducts = () => {
    return productsFinal.map((product) => (
      <>
        <tr key={product.idproducts}>
          <td>{product.idproducts}</td>
          <td>{product.name}</td>
          <td style={{ fontSize: "10px" }}>{product.description}</td>
          <td>{product.price}</td>
          <td>{product.idpackage}</td>
          <td>{product.idpicture_by_product}</td>
          <td>{product.idcategory}</td>
          <td>
            <img
              src={"http://localhost:2001/" + product.url}
              style={{ width: 150, height: 150 }}
            />
          </td>
          <td>
            <LinkContainer to={`/admin/product/${product.idproducts}/edit`}>
              <Button variant="light" className="btn-sm">
                <i className="fas fa-edit"></i>
              </Button>
            </LinkContainer>
            <Button
              variant="danger"
              className="btn-sm"
              onClick={() => deleteHandler(product.idproducts)}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </td>
        </tr>
      </>
    ));
  };

  return (
    <Container className="mb-5">
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Link
            className="my-3 btn btn-primary"
            to="/admin/product/create"
            style={{ marginLeft: "auto" }}
          >
            <i className="fas fa-plus"></i> Create Product
          </Link>
        </Col>
      </Row>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {successDelete && (
            <DropNotif
              heading="Delete Product"
              text="Delete product successfully"
              resetData={() => {
                dispatch(getProducts(page));

                // if (userInfo.isAdmin) {
                //   dispatch(getProducts("", "", "", "", "", page));
                // } else if (userInfo.isSeller && !userInfo.isAdmin) {
                //   dispatch(getProductsForSeller());
                // }
                // dispatch({ type: PRODUCT_DELETE_RESET });
              }}
            />
          )}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>ID_PACK</th>
                <th>ID_IMG</th>
                <th>CATEGORY</th>
                {/* nambah 1 , skip idproduct (double) skip is_main */}
                <th>IMAGE</th>
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </Table>

          <div className="text-left">Page {page}</div>
          <button onClick={prevPageHandler} className="btn btn-dark">
            {"<"}
          </button>
          <button onClick={nextPageHandler} className="btn btn-dark">
            {">"}
          </button>
        </>
      )}
    </Container>
  );
};

export default ProductListScreen;
