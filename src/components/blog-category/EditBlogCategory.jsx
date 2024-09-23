import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAddBlogTagsMutation, useEditBlogCategoriesMutation, useEditBlogTagsMutation, useGetBlogTagsIdQuery, useGetBlogTagsQuery, useGetSingleBlogCategoriesQuery } from '../../redux/features/companyEndPoint';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/allModalSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../../layouts/layoutcomponents/loader';

export default function EditBlogCategory() {

    const { isOpen, data } = useSelector((state) => state.allCommonModal)


    const { refetch: allTags } = useGetBlogTagsQuery();

    const dispatch = useDispatch()
    const initialValues = {
        name: "",
        description: ""
    }


    const [AddBlogTags, isLoading] = useEditBlogCategoriesMutation()
    const { data: single, isLoading: loading, refetch, isSuccess } = useGetSingleBlogCategoriesQuery(data)

    const singleBlogTags = single?.data || ""


    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: "",
        onSubmit: async (values) => {

            try {
                const response = await AddBlogTags({ blogCategoryId: data, blogCategoryData: values });
                if (response?.data?.http_status_code === 200) {
                    dispatch(closeModal())
                    refetch()
                    allTags()
                    toast.success(response.data.message)
                }
            } catch (error) {
                return null
            }
        },
    });


    useEffect(() => {
        setFieldValue("name", singleBlogTags?.name)
        setFieldValue("description", singleBlogTags?.description)
    }, [isSuccess])

    return (
        <>
            {loading && <Loader />}
            <Modal show={isOpen}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header className='bg-primary'>
                        <Modal.Title className='text-light'>
                            Edit Blog Category
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