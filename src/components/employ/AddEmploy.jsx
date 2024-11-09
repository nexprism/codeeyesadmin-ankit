import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAddBlogTagsMutation, useGetBlogTagsQuery } from "../../redux/features/companyEndPoint";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../layouts/layoutcomponents/loader";
import { useLocation } from "react-router-dom";

export default function AddEmploy() {
  const { isOpen } = useSelector((state) => state.allCommonModal);

  const dispatch = useDispatch();
  const initialValues = {
    name: "",
  };

  const [organization, setOrganization] = useState("");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const org = queryParams.get("organization");
    if (org) {
      setOrganization(org);
    }
  }, [location]);

  const [AddBlogTags, isLoading] = useAddBlogTagsMutation();
  const { refetch } = useGetBlogTagsQuery();

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values) => {
      try {
        const response = await AddBlogTags({blogData:values, organization});
        if (response?.data?.http_status_code === 201) {
          dispatch(closeModal());
          refetch();
          toast.success(response.data.message);
        }
      } catch (error) {
        return null;
      }
    },
  });

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Modal show={isOpen}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header className="bg-primary">
            <Modal.Title className="text-light">Add Blog Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-danger" variant="" onClick={() => dispatch(closeModal())}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
