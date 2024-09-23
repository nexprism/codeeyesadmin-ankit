import React, { useEffect } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import PageHeader from '../../layouts/layoutcomponents/pageheader'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useGetSingleContactUsQuery } from '../../redux/features/companyEndPoint';
import Loader from '../../layouts/layoutcomponents/loader';

export default function ViewContactUs() {
    const { id } = useParams()

    const { data, isSuccess, isLoading } = useGetSingleContactUsQuery(id)
    const singleContactUs = data?.data || []

    const initialValues = {
        name: "",
        email: "",
        message: ""
    }

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: "",
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });
            // try {
            //     const response = await addHomePage(formData);
            //     console.log("response", response);

            //     if (response?.data?.http_status_code === 201 || response?.data?.http_status_code === 200) {
            //         refetch()
            //         toast.success(response.data.message)
            //     }
            // } catch (error) {
            //     return null
            // }
        },
    });


    useEffect(() => {
        setFieldValue("name", singleContactUs?.name)
        setFieldValue("email", singleContactUs?.email)
        setFieldValue("message", singleContactUs?.message)
    }, [isSuccess])

    return (
        <>
            {
                isLoading && <Loader />
            }
            <Row>
                <Col>
                    <PageHeader titles="Contact Us" active="View Contact Us" items={["Home"]} links={['/dashboard']} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col as={Col} md={6}>
                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                name='name'
                                                value={values.name}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col as={Col} md={6}>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                name='email'
                                                value={values.email}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col as={Col} md={12}>
                                        <Form.Group>
                                            <Form.Label>Message</Form.Label>
                                            <textarea
                                                name="message"
                                                value={values.message}
                                                className='border  border-dark w-100 rounded-3'
                                                rows={5}
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
    )
}