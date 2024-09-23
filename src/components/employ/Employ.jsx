import React from "react";
import { Row, Card, Col, Button, } from "react-bootstrap";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/allModalSlice";
import EmployDataTable from "../../commondata/employData";


export default function Employ() {
    const dispatch = useDispatch()
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <PageHeader titles="Users" active="User List" items={["Home"]} links={['/dashboard']} />
                </Col>
            </Row>
            <Row className="mb-6">
                <Col as={Col} md={6}></Col>
                <Col as={Col} md={6} className="text-end">
                    <Button onClick={() => { dispatch(openModal({ componentName: 'AddEmploy' })) }} variant="" className="btn-success">Add Blog Tags</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="data_table">
                            <EmployDataTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
