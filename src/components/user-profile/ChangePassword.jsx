import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';
import { useFormik } from 'formik';
import Loader from '../../layouts/layoutcomponents/loader';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useChangePasswordMutation } from '../../redux/features/AuthenticationEndPoints';

export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { isOpen } = useSelector((state) => state.allCommonModal);
    const dispatch = useDispatch()
    const initialValues = {
        new_password: "",
        confirm_passsword: ""
    }

    const [changeAdminPasssword, { isLoading: loading }] = useChangePasswordMutation()


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, } = useFormik({
        initialValues: initialValues,
        validationSchema: "",
        onSubmit: async (values) => {
            // const formData = new FormData();
            // Object.entries(values).forEach(([key, value]) => {
            //     formData.append(key, value);
            // });
            try {
                const response = await changeAdminPasssword(values);
                if (response?.data?.http_status_code === 200) {
                    toast.success(response.data.message)
                    dispatch(closeModal())
                }
            } catch (error) {
                return null
            }
        },
    });
    return (
        <>
            {loading && <Loader />}
            <Modal show={isOpen}>
                <Modal.Header className='bg-primary'>
                    <Modal.Title className='text-light fs-3'>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col as={Col} md={6}>
                                <Form.Group>
                                    <Form.Label>Password <span className='text-danger'>*</span></Form.Label>
                                    <div className="input-icon">
                                        <span
                                            className="input-icon-addon pe-auto"
                                            style={{ cursor: "pointer" }}
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <FiEyeOff size={20} />
                                            ) : (
                                                <FiEye size={20} />
                                            )}
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="new_password"
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                    </div>
                                    {
                                        errors.password && touched.password ? (
                                            <p className='text-danger'>{errors.password}</p>
                                        ) : ""
                                    }
                                </Form.Group>
                            </Col>
                            <Col as={Col} md={6}>
                                <Form.Group>
                                    <Form.Label>Confirm Password <span className='text-danger'>*</span></Form.Label>
                                    <div className="input-icon">
                                        <span
                                            className="input-icon-addon pe-auto"
                                            style={{ cursor: "pointer" }}
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            {showConfirmPassword ? (
                                                <FiEyeOff size={20} />
                                            ) : (
                                                <FiEye size={20} />
                                            )}
                                        </span>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirm_password"
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password_confirmation}
                                        />
                                    </div>
                                    {
                                        errors.password_confirmation && touched.password_confirmation ? (
                                            <p className='text-danger'>{errors.password_confirmation}</p>
                                        ) : ""
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-4 gap-5' >
                            <Col className='text-center'>
                                <Button className="btn btn-outline-default cancel_button" variant="" onClick={() => dispatch(closeModal())} >
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
    )
}

