import React from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import { useAddOurTeemMutation, useGetAllOurTeamQuery } from "../../redux/features/ourTeamEndPoint";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Loader from "../../layouts/layoutcomponents/loader";
import * as Yup from 'yup'; // Add Yup for validation

export default function AddOurTeam() {
  const navigate = useNavigate();

  const org = Cookies.get("organization");
  const { refetch } = useGetAllOurTeamQuery(org);

  const [addBlog, { isLoading: loading }] = useAddOurTeemMutation();

  const initialValues = {
    title: "",
    image_url: "",
    name: "",
    position: "",
    twitter_link: "",
    facebook_link: "",
    linkedin_link: "",
    instagram_link: "",
    organizationId: org
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    image_url: Yup.mixed().required("Image is required"),
    name: Yup.string().required("Name is required"),
    position: Yup.string().required("Position is required"),
    twitter_link: Yup.string().url("Invalid URL").notRequired(),
    facebook_link: Yup.string().url("Invalid URL").notRequired(),
    linkedin_link: Yup.string().url("Invalid URL").notRequired(),
    instagram_link: Yup.string().url("Invalid URL").notRequired(),
  });

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      try {
        const response = await addBlog(formData);
        if (response?.data?.http_status_code === 201) {
          refetch();
          navigate(`/our-team`);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      {loading && <Loader />}
      <Row>
        <Col>
          <PageHeader titles="Our Team" active="Add Our Team" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        Title <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                      {errors.title && touched.title && <p className="error">{errors.title}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        Image (JPG, JPEG, PNG, Max Size 2MB) <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="image_url"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => setFieldValue("image_url", e.target.files[0])}
                        onBlur={handleBlur}
                      />
                      {errors.image_url && touched.image_url && <p className="error">{errors.image_url}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Name <span className="required_icon">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      {errors.name && touched.name && <p className="error">{errors.name}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Position <span className="required_icon">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="position"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.position}
                      />
                      {errors.position && touched.position && <p className="error">{errors.position}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Twitter Link</Form.Label>
                      <Form.Control
                        type="url"
                        name="twitter_link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.twitter_link}
                      />
                      {errors.twitter_link && touched.twitter_link && <p className="error">{errors.twitter_link}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Facebook Link</Form.Label>
                      <Form.Control
                        type="url"
                        name="facebook_link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.facebook_link}
                      />
                      {errors.facebook_link && touched.facebook_link && <p className="error">{errors.facebook_link}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>LinkedIn Link</Form.Label>
                      <Form.Control
                        type="url"
                        name="linkedin_link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.linkedin_link}
                      />
                      {errors.linkedin_link && touched.linkedin_link && <p className="error">{errors.linkedin_link}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Instagram Link</Form.Label>
                      <Form.Control
                        type="url"
                        name="instagram_link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.instagram_link}
                      />
                      {errors.instagram_link && touched.instagram_link && <p className="error">{errors.instagram_link}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Button type="submit" className="btn-primary mx-auto w-auto">
                    Save
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
