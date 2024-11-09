import React from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../layouts/layoutcomponents/loader";
import Cookies from "js-cookie"
import { useAddTextTestimonialMutation, useGetAllTextTestimonialQuery } from "../../redux/features/textTestimonialEndPoingt";
import TextArea from "antd/es/input/TextArea";
import { TextTestimonialValidation } from "../../commondata/formvalidations";

export default function AddTextTestimonial() {
  const navigate = useNavigate();
  const org = Cookies.get("organization")
  const { refetch } = useGetAllTextTestimonialQuery(org);

  const [addBlog, { isLoading: loadingAdd }] = useAddTextTestimonialMutation();

  const initialValues = {
    title: "",
    image_url: "",
    name: "",
    description: "",
    organizationId: org
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: TextTestimonialValidation,
    onSubmit: async (values) => {
      console.log("Submitting form data:", values);

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        const response = await addBlog(formData);
        console.log("API Response:", response);

        if (response?.data?.http_status_code === 201) {
          refetch();
          navigate(`/text-testimonials`);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Failed to submit the form");
      }
    },
  });

  return (
    <>
      {
        loadingAdd && <Loader />
      }
      <Row>
        <Col>
          <PageHeader titles="Testimonial" active="Add Text Testimonial" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col as={Col} md={6}>
                    <Form.Group as={Col}>
                      <Form.Label>
                        Title <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control title="text" name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                      {errors.title && touched.title ? <p className={`error`}>{errors.title}</p> : null}
                    </Form.Group>
                  </Col>
                  <Col as={Col} md={6}>
                    <Form.Group as={Col}>
                      <Form.Label>
                        Name <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control title="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                      {errors.name && touched.name ? <p className={`error`}>{errors.name}</p> : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} md={6}>
                    <Form.Label>
                      Image (JPG,JPEG,PNG,2MB Size)
                      <span className="required_icon">*</span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="image_url"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={(e) => setFieldValue("image_url", e.target.files[0])}
                      onBlur={handleBlur}
                    />
                    {errors.image_url && touched.image_url ? <p className={`error`}>{errors.image_url}</p> : null}
                  </Form.Group>
                </Row>
                <Row>
                  <Col as={Col} md={12}>
                    <Form.Group>
                      <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        as={TextArea}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {
                        errors.description && touched.description ? (
                          <p className={`error`}>{errors.description}</p>
                        ) : null
                      }
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
