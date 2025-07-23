import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/productActions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../more/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { DELETE_PRODUCT_RESET } from "../../constants/ProductConstants";

const AllProducts = ({ history }) => {
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("✅ Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAdminProduct()); // Refresh product list
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
    { field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/edit/product/${params.getValue(params.id, "id")}`}>
              <EditIcon style={{ color: "#4caf50", marginRight: 8 }} />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon style={{ color: "#f44336" }} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = products?.map((item) => ({
    id: item._id,
    stock: item.stock,
    price: item.price,
    name: item.name,
  })) || [];

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default AllProducts;
