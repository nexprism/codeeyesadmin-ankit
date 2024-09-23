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
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../layouts/layoutcomponents/loader";
import DataTable from "react-data-table-component";
import { openModal } from "../redux/slices/allModalSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useGetAllTransactionsQuery } from "../redux/features/transactionEndPoint";

export default function TransactionDataTable() {
    const [transactionType, setTransactionType] = useState("");
    const [amount, setAmount] = useState("");
    const [withdrawalStatus, setWithdrawalStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [queryParams, setQueryParams] = useState({
        transaction_type: "",
        amount: "",
        withdrawal_status: "",
        fromDate: "",
        toDate: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setQueryParams({
            transaction_type: transactionType,
            amount: amount,
            withdrawal_status: withdrawalStatus,
            fromDate: fromDate,
            toDate: toDate,
        });
    };

    const [serialNumber, setSerialNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const { data, isError, error, isLoading, isFetching, isSuccess } =
        useGetAllTransactionsQuery(queryParams);


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
                name: "Full Name",
                selector: (row) => `${row.user_id.first_name} ${row.user_id.last_name}`,
                sortable: true,
            },
            {
                name: "Transaction ID",
                sortable: true,
                cell: (row) => row.transaction_id
            },
            {
                name: "Transaction Type",
                sortable: true,
                cell: (row) => row?.transaction_type,
            },
            {
                name: "Withdrawal Status",
                sortable: true,
                cell: (row) => row?.withdrawal_status,
            },
            {
                name: "Transaction Type",
                sortable: true,
                cell: (row) => row?.transaction_type,
            },
            {
                name: "Created At",
                selector: (row) => row?.createdAt,
                sortable: true,
            },
            {
                name: "Action",
                cell: (row) => (
                    <div className="action_icon_wrapper d-flex justify-content-center">
                        <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
                            <Link to={`/view-post/${row.id}`}><Button className="btn btn-icon btn-warning" variant=""><i className="fe fe-eye"></i></Button></Link>
                        </OverlayTrigger>
                    </div>
                ),
            },
        ];

        const postsData =
            Array.isArray(data?.data) && data?.data.length > 0 ? data?.data : [];



        const filteredData = postsData?.filter((item) => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
                item?.transaction_id ||
                item?.booking_number ||
                item?.bookingId?.booking_part?.toLowerCase().includes(searchTermLower) ||
                item?.user_id?.first_name?.toLowerCase().includes(searchTermLower) ||
                item?.user_id?.last_name?.toLowerCase().includes(searchTermLower) ||
                item?.user_id?.email?.toLowerCase().includes(searchTermLower)
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
                    {isLoading && <Loader />}
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
                    <Form onSubmit={handleSubmit}>
                        <Row className="mt-5 mx-2" style={{ rowGap: "10px" }}>
                            <Col md={3} >
                                <Form.Select
                                    type="text"
                                    name="transaction_type"
                                    onChange={(e) => setTransactionType(e.target.value)}

                                >
                                    <option value="">Select Transaction type</option>
                                    <option value="Debit">Debit</option>
                                    <option value="Credit">Credit</option>
                                </Form.Select>
                            </Col>
                            <Col md={3}>
                                <Form.Select
                                    name="withdrawal_status"
                                    onChange={(e) => setWithdrawalStatus(e.target.value)}
                                >
                                    <option value="">Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected     ">Rejected</option>
                                </Form.Select>
                            </Col>
                            <Col
                                md={2}
                                className={`date-input-container ${!toDate ? "empty" : ""}`}
                            >
                                <Form.Control
                                    type="date"
                                    className="date-input"
                                    onChange={(e) => setFromDate(e.target.value)}
                                    placeholder="From Date"
                                    name="fromDate"
                                    max={new Date().toISOString().split("T")[0]}
                                />
                                <span className="placeholder">Date From</span>
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="date"
                                    onChange={(e) => setToDate(e.target.value)}
                                    placeholder="To Date"
                                    name="toDate"
                                    max={new Date().toISOString().split("T")[0]}
                                />
                                <span className="placeholder">Date To</span>
                            </Col>
                            <Col md={2}>
                                <Button type="submit" className="w-100">
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
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
