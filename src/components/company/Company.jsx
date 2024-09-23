import React from "react";
import { Row, Card, Col, Button, } from "react-bootstrap";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/allModalSlice";
import CompanyDataTable from "../../commondata/companyData";


export default function Company() {
    const dispatch = useDispatch()
    return (
        <>
            <Row className="align-items-center">
                <Col> <PageHeader titles="Contact Us" active="Contact Us List" items={["Home"]} links={['/dashboard']} /> </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="data_table">
                            <CompanyDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
