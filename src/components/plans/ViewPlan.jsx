import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSinglePlanQuery } from '../../redux/features/companyEndPoint';
import { Card, Col, Form, Row } from 'react-bootstrap';
import PageHeader from '../../layouts/layoutcomponents/pageheader';
import { useFormik } from 'formik';

export default function ViewPlan() {
    const { id } = useParams();
    const { data, isLoading, refetch, isSuccess } = useGetSinglePlanQuery(id);
    const singlePlan = data?.data || null;

    const initialValues = {
        planName: "",
        monthlyPrice: "",
        monthlyDiscount: "",
        monthlyLastPrice: "",
        yearlyPrice: "",
        yearlyDiscount: "",
        yearlyLastPrice: "",
        description: "",
        product_id: "",
        features: [],
        createdAt: "",
        updatedAt: "",
    };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: "", // Add your validation schema here if required
        onSubmit: async (values) => {
            console.log("Submitted values:", values);
        },
    });

    // Set form values when singlePlan data is successfully fetched
    useEffect(() => {
        if (isSuccess && singlePlan) {
            setFieldValue("planName", singlePlan.planName);
            setFieldValue("monthlyPrice", singlePlan.monthlyPrice);
            setFieldValue("monthlyDiscount", singlePlan.monthlyDiscount);
            setFieldValue("monthlyLastPrice", singlePlan.monthlyLastPrice);
            setFieldValue("yearlyPrice", singlePlan.yearlyPrice);
            setFieldValue("yearlyDiscount", singlePlan.yearlyDiscount);
            setFieldValue("yearlyLastPrice", singlePlan.yearlyLastPrice);
            setFieldValue("description", singlePlan.description);
            setFieldValue("product_id", singlePlan.product_id);
            setFieldValue("features", singlePlan.features);
            setFieldValue("createdAt", singlePlan.createdAt);
            setFieldValue("updatedAt", singlePlan.updatedAt);
        }
    }, [isSuccess, singlePlan]);

    return (
        <>
            <Row>
                <Col>
                    <PageHeader titles="Plans" active="View Plans" items={["Home"]} links={['/dashboard']} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Plan Name</Form.Label>
                                            <Form.Control
                                                name='planName'
                                                value={values.planName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Monthly Price</Form.Label>
                                            <Form.Control
                                                name='monthlyPrice'
                                                value={values.monthlyPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Monthly Discount</Form.Label>
                                            <Form.Control
                                                name='monthlyDiscount'
                                                value={values.monthlyDiscount}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Monthly Last Price</Form.Label>
                                            <Form.Control
                                                name='monthlyLastPrice'
                                                value={values.monthlyLastPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Yearly Price</Form.Label>
                                            <Form.Control
                                                name='yearlyPrice'
                                                value={values.yearlyPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Yearly Discount</Form.Label>
                                            <Form.Control
                                                name='yearlyDiscount'
                                                value={values.yearlyDiscount}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Yearly Last Price</Form.Label>
                                            <Form.Control
                                                name='yearlyLastPrice'
                                                value={values.yearlyLastPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name='description'
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Product ID</Form.Label>
                                            <Form.Control
                                                name='product_id'
                                                value={values.product_id}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Features</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                name='features'
                                                value={values.features.join(", ")}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Created At</Form.Label>
                                            <Form.Control
                                                name='createdAt'
                                                value={new Date(values.createdAt).toLocaleDateString()}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Updated At</Form.Label>
                                            <Form.Control
                                                name='updatedAt'
                                                value={new Date(values.updatedAt).toLocaleDateString()}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
