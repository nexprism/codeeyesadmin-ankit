import React from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewsDataTable from "../../commondata/newsData";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import LogosDataTable from "../../commondata/logoData";

export default function Logos() {
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <PageHeader titles="Logo" active="logo List" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row className="mb-6">
        <Col as={Col} md={6}></Col>
        <Col as={Col} md={6} className="text-end">
          <Link to={"/add-logo"}>
            {" "}
            <Button variant="" className="btn-success">
              Add Logo
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="data_table">
              <LogosDataTable />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
