import React from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import TextTestimonialsDataTable from "../../commondata/textTestimonialsDataTable";

export default function TextTestimonial() {
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <PageHeader titles="Testimonials" active="Text Testimonials" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row className="mb-6">
        <Col as={Col} md={6}></Col>
        <Col as={Col} md={6} className="text-end">
          <Link to={"/add-text-textomonial"}>
            <Button variant="" className="btn-success">
              Add Text Testimonial
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="data_table">
              <TextTestimonialsDataTable />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
