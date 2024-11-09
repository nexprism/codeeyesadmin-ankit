import React from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import BlogDataTable from "../commondata/blogDataTable";
import PageHeader from "../layouts/layoutcomponents/pageheader";
import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <PageHeader titles="Blog" active="Blog List" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row className="mb-6">
        <Col as={Col} md={6}></Col>
        <Col as={Col} md={6} className="text-end">
          <Link to={"/add-blog/"}>
            {" "}
            <Button variant="" className="btn-success">
              Add Blog
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="data_table">
              <BlogDataTable />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
