import React, { useEffect, useState } from "react";
import {
    Nav,
    TabContainer,
    Tabs,
    Tab,
    Row,
    Card,
    Col,
    Button,
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../layouts/layoutcomponents/loader";
import DataTable from "react-data-table-component";
import { openModal } from "../redux/slices/allModalSlice";
import toast from "react-hot-toast";
import { useGetAllPlansQuery } from "../redux/features/companyEndPoint";
import { Link } from "react-router-dom";


export default function PlanDataTable() {
    const [serialNumber, setSerialNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const { data, isError, error, isLoading, isFetching, isSuccess } =
        useGetAllPlansQuery();
    console.log("data", data);


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
                name: "Name",
                sortable: true,
                cell: (row) => row.planName,
            },
            {
                name: "Monthly last price",
                sortable: true,
                cell: (row) => row?.monthlyLastPrice,
            },
            {
                name: "yearly last price",
                sortable: true,
                cell: (row) => row?.yearlyLastPrice,
            },

            {
                name: "paypal id",
                selector: (row) => row?.product_id,
                sortable: true,
            },
            {
                name: "Action",
                cell: (row) => (
                    <div className="action_icon_wrapper">
                        <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                            <Link to={`/view-plan/${row?._id}`}> <Button className="btn btn-icon btn-primary" ><i className="fe fe-eye"></i></Button></Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                            <Link to={`/edit-plan/${row?._id}`}> <Button className="btn btn-icon btn-warning" variant="" ><i className="fe fe-edit"></i></Button></Link>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                            <Button className="btn btn-icon btn-danger" variant="" onClick={() => dispatch(openModal({ componentName: "DeleteModal", data: row.id }))}><i className="fa fa-trash text-white"></i></Button>
                        </OverlayTrigger>
                    </div >
                ),
            },
        ];

        const postsData = Array.isArray(data?.data) && data?.data.length > 0 ? data?.data : [];
        console.log("postsData", postsData);



        const filteredData = postsData?.filter((item) => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
                item?.planName?.toLowerCase().includes(searchTermLower)
            );
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
                            <Button
                                className="btn btn-default"
                                variant="default"
                                onClick={() => paginate(i)}
                            >
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
                                <select
                                    className="mx-2"
                                    value={pageSize}
                                    onChange={handlePageSizeChange}
                                >
                                    {[10, 25, 50].map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                                <span>Entries</span>
                            </div>
                        </Col>
                        <Col sm={6} xs={12} className="text-sm-end">
                        </Col>
                    </Row>
                    <Row className="justify-content-end">
                        <Col as={Col} sm={3}>
                            <Form.Group className="m-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <DataTable data={currentItems} columns={COLUMNS} striped />
                    <div className="pagination_wrapper">
                        <ul className="pagination">
                            <li>
                                <Button
                                    className="btn btn-default"
                                    variant="default"
                                    onClick={prevPage}
                                >
                                    <i className="fa fa-angle-left"></i> Previous
                                </Button>
                            </li>
                            {displayPages()}
                            <li>
                                <Button
                                    className="btn btn-default"
                                    variant="default"
                                    onClick={nextPage}
                                >
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