import React from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../layouts/layoutcomponents/loader";
import Cookies from "js-cookie"
import { useAddVideoTestimonialMutation, useGetAllVideoTestimonialQuery } from "../../redux/features/videoTestimonialEndPoint";
import { VideoTestimonialValidation } from "../../commondata/formvalidations";

export default function AddVideoTestimonial() {
  const navigate = useNavigate();
  const org = Cookies.get("organization")
  const { refetch } = useGetAllVideoTestimonialQuery(org);

  const [addBlog, { isLoading: loadingAdd }] = useAddVideoTestimonialMutation();

  const initialValues = {
    title: "",
    video_url: "",
    organizationId: org
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: VideoTestimonialValidation,
    onSubmit: async (values) => {

      try {
        const response = await addBlog(values);
        console.log("API Response:", response);

        if (response?.data?.http_status_code === 201) {
          refetch();
          navigate(`/video-testimonials`);
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
          <PageHeader titles="Testimonial" active="Add VIdeo Testimonial" items={["Home"]} links={["/dashboard"]} />
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
                        Video Url <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control title="text" name="video_url" onChange={handleChange} onBlur={handleBlur} value={values.video_url} />
                      {errors.video_url && touched.video_url ? <p className={`error`}>{errors.video_url}</p> : null}
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
