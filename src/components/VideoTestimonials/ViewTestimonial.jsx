import React from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import VideoTestimonialsDataTable from "../../commondata/videoTestimonialDataTable";

export default function VideoTestimonial() {
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <PageHeader titles="Testimonials" active="Video Testimonials" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row className="mb-6">
        <Col as={Col} md={6}></Col>
        <Col as={Col} md={6} className="text-end">
          <Link to={"/add-video-textomonial"}>
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
              <VideoTestimonialsDataTable />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
