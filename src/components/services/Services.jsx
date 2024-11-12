import React from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import ServiceDataTable from "../../commondata/serviceDataTable";

export default function Services() {
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <PageHeader titles="Logo" active="Services List" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row className="mb-6">
        <Col as={Col} md={6}></Col>
        <Col as={Col} md={6} className="text-end">
          <Link to={"/add-services"}>
            <Button variant="" className="btn-success">
              Add Services
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="data_table">
              <ServiceDataTable />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
