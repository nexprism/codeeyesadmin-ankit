import { useFormik } from 'formik';
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAddBlogCategoriesMutation, useAddBlogTagsMutation, useGetBlogCategoriesQuery } from '../../redux/features/companyEndPoint';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../../layouts/layoutcomponents/loader';

export default function AddBlogCategory() {

    const { isOpen } = useSelector((state) => state.allCommonModal)

    const dispatch = useDispatch()
    const initialValues = {
        name: "",
        description: ""
    }


    const [AddBlogTags, isLoading] = useAddBlogCategoriesMutation()
    const { refetch } = useGetBlogCategoriesQuery();

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: "",
        onSubmit: async (values) => {

            try {
                const response = await AddBlogTags(values);
                if (response?.data?.http_status_code === 201) {
                    dispatch(closeModal())
                    refetch()
                    toast.success(response.data.message)
                }
            } catch (error) {
                return null
            }
        },
    });

    return (
        <>
            {/* {isLoading && <Loader />} */}
            <Modal show={isOpen}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header className='bg-primary'>
                        <Modal.Title className='text-light'>
                            Add Blog Category
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn-danger' variant='' onClick={() => dispatch(closeModal())}>Cancel</Button>
                        <Button type='submit'>Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}