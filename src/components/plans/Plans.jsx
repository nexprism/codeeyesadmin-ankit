import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import PageHeader from '../../layouts/layoutcomponents/pageheader'
import PlanDataTable from '../../commondata/plansData'
import { Link } from 'react-router-dom'

export default function Plans() {
    return (
        <>
            <>
                <Row className="align-items-center">
                    <Col>
                        <PageHeader titles="Plans" active="Plans List" items={["Home"]} links={['/dashboard']} />
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Link to={"/add-plan"}><Button>Add Plan</Button></Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body className="data_table">
                                <PlanDataTable />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        </>
    )
}
