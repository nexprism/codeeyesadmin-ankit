import React from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewsDataTable from "../../commondata/newsData";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import LogosDataTable from "../../commondata/logoData";
import HomeLogosDataTable from "../../commondata/homeLogoDataTable";
import TeamMemberDataTable from "../../commondata/teamMemberDataTable";

export default function OurTeam() {
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <PageHeader titles="Logo" active="Home Logo List" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row className="mb-6">
        <Col as={Col} md={6}></Col>
        <Col as={Col} md={6} className="text-end">
          <Link to={"/add-our-team"}>
            {" "}
            <Button variant="" className="btn-success">
              Add Team Member
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className="data_table">
              <TeamMemberDataTable />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
