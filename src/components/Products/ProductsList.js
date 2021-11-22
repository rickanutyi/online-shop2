import React, { useEffect, useContext, useState } from "react";

import { productsContext } from "../../contexts/ProductsContext";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import history from "../../helpers/history";
import ReactPaginate from "react-paginate";

import "./ProductsList.css";
import { Construction } from "@mui/icons-material";

const ProductsList = () => {
  const { getProducts, products, getPageProducts, paginateProducts } =
    useContext(productsContext);
  const [page, setPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState([]);
  const productsLimit = 8;
  const pagesVisited = page * productsLimit;

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getPageProducts();
  }, []);

  let pageCount = Math.ceil(products.length / 4);

  function changePage({ selected }) {
    let page1 = selected + 1;
    getPageProducts(page1);
  }
  return (
    <>
      <Grid container spacing={2}>
        {paginateProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </Grid>
      <ReactPaginate
        previousLabel={"назад"}
        nextLabel={"вперед"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLabelClassName={"previousBttn"}
        nextLabelClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
};

export default ProductsList;
