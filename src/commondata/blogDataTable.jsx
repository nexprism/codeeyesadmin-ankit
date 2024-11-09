import React, { useEffect, useState } from "react";
import { Nav, TabContainer, Tabs, Tab, Row, Card, Col, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../layouts/layoutcomponents/loader";
import DataTable from "react-data-table-component";
import { openModal } from "../redux/slices/allModalSlice";
import toast from "react-hot-toast";
import { useGetAllEmployQuery } from "../redux/features/employEndPoints";
import { useDeleteBlogCategoriesMutation, useDeleteBlogMutation, useDeleteBlogTagsMutation, useGetBlogCategoriesQuery, useGetBlogQuery, useGetBlogTagsQuery } from "../redux/features/companyEndPoint";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

export default function BlogDataTable() {
  const [serialNumber, setSerialNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const [organization, setOrganization] = useState("");

  const location = useLocation();

  useEffect(() => {
    const org = Cookies.get("organization")

    if (org) {
      setOrganization(org);
    }
  }, [location]);

  const { data, isError, error, isLoading, isFetching, isSuccess, refetch } = useGetBlogQuery(organization);
  const [deleteBlogData, { isLoading: loadingDelete }] = useDeleteBlogMutation();

  const handleDelete = async (row) => {
    console.log("row", row);

    const resp = await deleteBlogData(row);
    if (resp?.data?.http_status_code === 200) {
      refetch();
      toast.success(resp.data.message);
    }
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }
  if (isError) {
    return <Error error_mes={error} />;
  }

  if (isSuccess) {
    const COLUMNS = [
      {
        name: "#",
        selector: (row, index) => index + serialNumber,
        sortable: true,
      },
      {
        name: "Title",
        sortable: true,
        cell: (row) => row.title,
      },
      {
        name: "Image",
        sortable: true,
        cell: (row) => {
          return <img src={row.banner_image} alt={row.title} style={{ width: "100px", height: "auto" }} />;
        },
      },
      {
        name: "Category",
        sortable: true,
        cell: (row) => row?.category?.name,
      },
      {
        name: "CreatedAt",
        sortable: true,
        cell: (row) => (row.createdAt ? moment(row.createdAt).format("DD-MM-YYYY [at] hh:mm A") : null),
      },
      {
        name: "Action",
        cell: (row) => (
          <>
            <div className="d-flex gap-1">
              <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip id="tooltip-bottom">View</Tooltip>}>
                <Link to={`/view-blog/${row?.id}`}>
                  <Button variant="primary">
                    <i className="fe fe-eye"></i>
                  </Button>
                </Link>
              </OverlayTrigger>
              <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip id="tooltip-bottom">Edit</Tooltip>}>
                <Link to={`/edit-blog/${row?.id}`}>
                  <Button variant="warning">
                    <i className="fa fa-pencil"></i>
                  </Button>
                </Link>
              </OverlayTrigger>

              <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip id="tooltip-bottom">Delete</Tooltip>}>
                <Button variant="danger" onClick={() => handleDelete(row?.id)}>
                  <i className="fe fe-trash text-light"></i>
                </Button>
              </OverlayTrigger>
            </div>
          </>
        ),
        sortable: false,
      },
    ];

    const postsData = Array.isArray(data?.data) && data?.data.length > 0 ? data?.data : [];

    const filteredData = postsData?.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      return item?.title?.toLowerCase().includes(searchTermLower) || item?.category?.name?.toLowerCase().includes(searchTermLower);
    });
    const itemsPerPage = pageSize;
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

    const displayPages = () => {
      const pageButtons = [];
      const delta = 2;
      const left = currentPage - delta;
      const right = currentPage + delta + 1;

      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i < right)) {
          pageButtons.push(
            <li key={i} className={currentPage === i ? "active" : ""}>
              <Button className="btn btn-default" variant="default" onClick={() => paginate(i)}>
                {i}
              </Button>
            </li>
          );
        } else if (i === left - 1 || i === right + 1) {
          pageButtons.push(
            <li key={i} className="ellipsis_pagination">
              ......
            </li>
          );
        }
      }
      return pageButtons;
    };
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    const handlePageSizeChange = (e) => {
      const newSize = parseInt(e.target.value, 10);
      setPageSize(newSize);
      setCurrentPage(1);
    };

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    };
    return (
      <>
        <div className="e-table pb-5 table-responsive">
          {/* {isLoading && <Loader /> || loading && < Loader />} */}
          <Row className="justify-content-end mt-3 mx-2 align-items-center">
            <Col sm={6} xs={12}>
              <div className="d-block ms-5">
                <span>Show</span>
                <select className="mx-2" value={pageSize} onChange={handlePageSizeChange}>
                  {[10, 25, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span>Entries</span>
              </div>
            </Col>
            <Col sm={6} xs={12} className="text-sm-end"></Col>
          </Row>
          <Row className="justify-content-end">
            <Col as={Col} sm={3}>
              <Form.Group className="m-3">
                <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
              </Form.Group>
            </Col>
          </Row>
          <DataTable data={currentItems} columns={COLUMNS} striped />
          <div className="pagination_wrapper">
            <ul className="pagination">
              <li>
                <Button className="btn btn-default" variant="default" onClick={prevPage}>
                  <i className="fa fa-angle-left"></i> Previous
                </Button>
              </li>
              {displayPages()}
              <li>
                <Button className="btn btn-default" variant="default" onClick={nextPage}>
                  Next <i className="fa fa-angle-right"></i>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
