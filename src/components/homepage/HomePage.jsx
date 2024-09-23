import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import PageHeader from '../../layouts/layoutcomponents/pageheader'
import { AddHomePageValidation } from '../../commondata/formvalidations';
import { useFormik } from 'formik';
import { useAddHomePageMutation, useGetHomePageQuery } from '../../redux/features/homeEndPoint';
import Loader from '../../layouts/layoutcomponents/loader';
import toast from 'react-hot-toast';

export default function HomePage() {
    const { data, isLoading, refetch, isSuccess } = useGetHomePageQuery()
    const homePageData = data?.data

    console.log("homePageData", homePageData);

    const [addHomePage, { isLoading: loading }] = useAddHomePageMutation()
    const initialValues = {
        head_one: "",
        head_description: "",
        about_us_image: "",
        abour_us_btn_text: "",
        id: ""
    }
    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddHomePageValidation,
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });
            try {
                const response = await addHomePage(formData);
                console.log("response", response);

                if (response?.data?.http_status_code === 201 || response?.data?.http_status_code === 200) {
                    refetch()
                    toast.success(response.data.message)
                }
            } catch (error) {
                return null
            }
        },
    });

    useEffect(() => {
        setFieldValue("head_one", homePageData?.head_one)
        setFieldValue("head_description", homePageData?.head_description)
        setFieldValue("about_us_image", homePageData?.about_us_image)
        setFieldValue("abour_us_btn_text", homePageData?.abour_us_btn_text)
        setFieldValue("id", homePageData?.id)
    }, [isSuccess])
    return (
        <>
            {
                isLoading && <Loader /> || loading && <Loader />
            }
            <Row>
                <Col>
                    <PageHeader titles="Home Page" active="Home Page Form" items={["Home"]} links={['/dashboard']} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col as={Col} md={6}>
                                        <Form.Group>
                                            <Form.Label>Main Heading</Form.Label>
                                            <Form.Control
                                                name='head_one'
                                                value={values.head_one}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col as={Col} md={6}>
                                        <Form.Group>
                                            <Form.Label>Main Description</Form.Label>
                                            <Form.Control
                                                name='head_description'
                                                value={values.head_description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col as={Col} md={6}>
                                        <Form.Group>
                                            <Form.Label>About Us Image</Form.Label>
                                            <Form.Control
                                                type='file'
                                                name='about_us_image'
                                                // value={values.about_us_image}
                                                onChange={(e) => setFieldValue('about_us_image', e.target.files[0])}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col as={Col} md={6}>
                                        <Form.Group>
                                            <Form.Label>About Us Button Text</Form.Label>
                                            <Form.Control
                                                name='abour_us_btn_text'
                                                value={values.abour_us_btn_text}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className='mt-5 justify-content-center'>
                                    <Button type='submit' className='w-auto'>Save</Button>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
