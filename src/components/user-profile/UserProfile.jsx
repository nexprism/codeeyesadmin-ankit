import React from "react";
import { Tabs, Tab, Card, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import Loader from "../../layouts/layoutcomponents/loader";
import Error from "../../layouts/layoutcomponents/Error";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/allModalSlice";
import { useGetUserQuery } from "../../redux/features/AuthenticationEndPoints";

export default function UserProfile() {
    const diapatch = useDispatch()
    const { data, isFetching, error, isError, isLoading, isSuccess } = useGetUserQuery()

    const adminData = data?.data
    if (isFetching || isLoading) {
        return <Loader />
    }
    else if (isError) {
        return <Error error_mes={error} />;
    }
    else if (isSuccess) {
        return (
            <div>
                <PageHeader titles="Profile" active="Profile" links={['/']} items={['Home']} />
                <Row id="user-profile">
                    <Col lg={12}>
                        <Card className=" bg-transparent shadow-none border-0">
                            <Card.Body className=" bg-white">
                                <div className="wideget-user">
                                    <Row>
                                        <Col lg={12} md={12} xl={6}>
                                            <div className="wideget-user-desc d-sm-flex">
                                                <div className="wideget-user-img">
                                                    <img className="" src={`${adminData?.profile_pic}`} alt="img" />
                                                </div>
                                                <div className="user-wrap">
                                                    <h4>{adminData.name}</h4>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={12} md={12} xl={6}>
                                            {/* <div className="text-xl-right mt-4 mt-xl-0">
                                                <Button className="btn btn-primary" onClick={() => { diapatch(openModal({ componentName: "UpdateProfile" })) }}>
                                                    Edit Profile
                                                </Button>
                                            </div> */}
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                            <div className="border-top ">
                                <div className="wideget-user-tab">
                                    <div className="tab-menu-heading">
                                        <div className="tabs-menu1 profiletabs">
                                            <Tabs
                                                variant="Tabs"
                                                defaultActiveKey="Profile"
                                                id=" tab-51"
                                                className="tab-content tabesbody "
                                            >
                                                <Tab eventKey="Profile" title="Profile">
                                                    <div className="tab-pane profiletab show">
                                                        <div id="profile-log-switch">
                                                            <Card>
                                                                <Card.Body className="bg-white">
                                                                    <div className="media-heading">
                                                                        <h5>
                                                                            <strong>Personal Information</strong>
                                                                        </h5>
                                                                    </div>
                                                                    <div className="table-responsive p-1">
                                                                        <Table className="table row table-borderless">
                                                                            <tbody className="col-lg-12 col-xl-6 p-0">
                                                                                <tr>
                                                                                    <td><strong>Full Name:</strong> {adminData?.name}</td>
                                                                                </tr>

                                                                            </tbody>
                                                                            <tbody className="col-lg-12 col-xl-6 p-0">
                                                                                <tr>
                                                                                    <td><strong>Email:</strong> {adminData?.email}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </Table>
                                                                    </div>
                                                                </Card.Body>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}