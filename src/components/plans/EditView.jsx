import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditPlanMutation, useGetSinglePlanQuery } from '../../redux/features/companyEndPoint';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import PageHeader from '../../layouts/layoutcomponents/pageheader';
import { useFormik } from 'formik';
import Loader from '../../layouts/layoutcomponents/loader';
import toast from 'react-hot-toast';

export default function EditPlan() {
    const { id } = useParams();

    const naviagte = useNavigate()

    const { data, isLoading, refetch, isSuccess } = useGetSinglePlanQuery(id);
    const singlePlan = data?.data || null;

    const [editPlan, { isloading: loading }] = useEditPlanMutation()

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
                const response = await editPlan({ formData: values, planId: id })

                if (response?.data?.http_status_code === 200) {
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
            setFieldValue("features", singlePlan.features);
            setFieldValue("createdAt", singlePlan.createdAt);
            setFieldValue("updatedAt", singlePlan.updatedAt);
        }
    }, [isSuccess, singlePlan]);

    return (
        <>
            {
                isLoading && <Loader /> || loading && <Loader />
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
                                                name='features'
                                                value={values.features.join(", ")}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className='mt-4 justify-content-center'>
                                    <Button type="submit" className="w-auto" >update</Button>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
