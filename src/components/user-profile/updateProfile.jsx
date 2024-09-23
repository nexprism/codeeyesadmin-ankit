import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';
import Loader from '../../layouts/layoutcomponents/loader';
import toast from 'react-hot-toast';
import { useGetUserQuery, useUpdateAdminProfileMutation } from '../../redux/features/AuthenticationEndPoints';
import moment from 'moment/moment';
import { AddAdminProfile } from '../../commondata/formvalidations';

export default function UpdateProfile() {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.allCommonModal);
    const { data, isSuccess, refetch, isLoading } = useGetUserQuery();
    const [updateAdminProfile, { isLoading: loading }] = useUpdateAdminProfileMutation()
    const adminData = data?.data;

    const FormatDate = moment(adminData?.dob).format("YYYY-MM-DD");

    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        profile_pic: "",
    };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched } = useFormik({
        initialValues: initialValues,
        validationSchema: AddAdminProfile,
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });
            try {
                const response = await updateAdminProfile(formData);
                if (response?.data?.http_status_code === 200) {
                    toast.success(response?.data?.message);
                    refetch();
                    dispatch(closeModal());
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    useEffect(() => {
        if (isSuccess && adminData) {
            setFieldValue("first_name", adminData.first_name);
            setFieldValue("last_name", adminData.last_name);
            setFieldValue("dob", FormatDate);
            setFieldValue("email", adminData.email);
            setFieldValue("profile_pic", adminData.profile_pic);
        }
    }, [isSuccess, adminData, setFieldValue, FormatDate]);

    return (
        <>
            {isLoading && <Loader /> || loading && <Loader />}
            <Modal show={isOpen}>
                <Modal.Header>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>First Name <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='first_name'
                                        value={values.first_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.first_name && touched.first_name && (
                                        <p className='text-danger'>{errors.first_name}</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Last Name <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='last_name'
                                        value={values.last_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.last_name && touched.last_name && (
                                        <p className='text-danger'>{errors.last_name}</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Email <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled
                                    />
                                    {errors.email && touched.email && (
                                        <p className='text-danger'>{errors.email}</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Date Of Birth <span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        type='date'
                                        name='dob'
                                        value={values.dob}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.dob && touched.dob && (
                                        <p className='text-danger'>{errors.dob}</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Profile Picture </Form.Label>
                                    <Form.Control
                                        type='file'
                                        name='profile_pic'
                                        onChange={(event) => setFieldValue("profile_pic", event.target.files[0])}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-4 gap-5'>
                            <Col className='text-end'>
                                <Button className="btn btn-outline-default cancel_button" variant="" onClick={() => dispatch(closeModal())}>
                                    Cancel
                                </Button>
                                &nbsp;
                                <Button type='submit' className="btn btn-primary" variant="primary">
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
