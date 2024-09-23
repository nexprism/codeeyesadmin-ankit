import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Loader from "../../layouts/layoutcomponents/loader"
import toast from 'react-hot-toast';
import { useAddUpdateMutation, useGetPaypalQuery } from '../../redux/features/employEndPoints';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';

export default function PaypalCrediantial() {
    const dispatch = useDispatch()
    const { isOpen } = useSelector((state) => state.allCommonModal);
    const initialValues = {
        client_id: "",
        client_secret: "",
        id: ""
    }

    const { data, isSuccess, isError, refetch, isLoading } = useGetPaypalQuery()
    const [addData, { isLoading: loading }] = useAddUpdateMutation()

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: "", // Add validation schema if needed
        onSubmit: async (values) => {
            console.log("values", values);

            try {
                const resp = await addData(values)
                if (resp.data.http_status_code === 201 || resp.data.http_status_code === 200) {
                    refetch()
                    dispatch(closeModal())
                    toast.success(resp.data.message)
                } else {
                    toast.success(resp.data.message)
                }
            } catch (err) {
                toast.error(err.message)
            }
        }
    })

    useEffect(() => {
        if (isSuccess && data?.data) {
            setFieldValue("client_id", data.data.client_id)
            setFieldValue("client_secret", data.data.client_secret)
            setFieldValue("id", data.data._id)
        }
    }, [isSuccess, data, setFieldValue])

    return (
        <>
            {(isLoading || loading) && <Loader />}
            <Modal show={isOpen}>
                <Modal.Header className='bg-primary'>
                    <Modal.Title className='text-white'>Paypal Crediential</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Client Id <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                name='client_id'
                                value={values.client_id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.client_id && touched.client_id && (
                                <p className='text-danger'>{errors.client_id}</p>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Client Secret <span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                name='client_secret'
                                value={values.client_secret}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.client_secret && touched.client_secret && (
                                <p className='text-danger'>{errors.client_secret}</p>
                            )}
                        </Form.Group>
                        <Modal.Footer>
                            <Button type='submit' className='w-auto'>Save</Button>
                            <Button onClick={() => dispatch(closeModal())} className=''>Close</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
