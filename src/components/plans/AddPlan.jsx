import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddPlanMutation, useGetAllPlansQuery } from '../../redux/features/companyEndPoint';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import PageHeader from '../../layouts/layoutcomponents/pageheader';
import { useFormik } from 'formik';
import Loader from '../../layouts/layoutcomponents/loader';
import toast from 'react-hot-toast';

export default function AddPlan() {
    const { id } = useParams();
    const naviagte = useNavigate()

    const [editPlan, { isloading: loading }] = useAddPlanMutation()
    const { refetch } = useGetAllPlansQuery();

    const initialValues = {
        planName: "",
        monthlyPrice: "",
        monthlyDiscount: "",
        monthlyLastPrice: "",
        yearlyPrice: "",
        yearlyDiscount: "",
        yearlyLastPrice: "",
        description: "",
        features: []
    };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: "",
        onSubmit: async (values) => {
            try {
                const response = await editPlan(values)

                if (response?.data?.http_status_code === 201) {
                    refetch()
                    naviagte("/plans")
                    toast.success(response.data.message);
                } else {
                    toast.error("Failed to update plan");
                }

            } catch (err) {
                toast.error(err.message)
            }
        },
    });

    return (
        <>
            {
                loading && <Loader />
            }
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
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Monthly Price</Form.Label>
                                            <Form.Control
                                                type='number'
                                                name='monthlyPrice'
                                                value={values.monthlyPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Monthly Discount</Form.Label>
                                            <Form.Control
                                                type='number'
                                                name='monthlyDiscount'
                                                value={values.monthlyDiscount}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Monthly Last Price</Form.Label>
                                            <Form.Control
                                                type='number'
                                                name='monthlyLastPrice'
                                                value={values.monthlyLastPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Yearly Price</Form.Label>
                                            <Form.Control
                                                type='number'
                                                name='yearlyPrice'
                                                value={values.yearlyPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Yearly Discount</Form.Label>
                                            <Form.Control
                                                type='number'
                                                name='yearlyDiscount'
                                                value={values.yearlyDiscount}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Yearly Last Price</Form.Label>
                                            <Form.Control
                                                type='number'
                                                name='yearlyLastPrice'
                                                value={values.yearlyLastPrice}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
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
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Features</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                name="features"
                                                value={Array.isArray(values.features) ? values.features.join(",") : values.features}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className='mt-4 justify-content-center'>
                                    <Button type="submit" className="w-auto" >Save</Button>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
