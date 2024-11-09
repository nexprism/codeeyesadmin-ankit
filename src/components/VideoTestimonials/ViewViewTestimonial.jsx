import React, { useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../layouts/layoutcomponents/loader";
import Cookies from "js-cookie"
import { TextTestimonialValidation, VideoTestimonialValidation } from "../../commondata/formvalidations";
import { useEditVideoTestimonialMutation, useGetAllVideoTestimonialQuery, useGetVideoTestimonialQuery } from "../../redux/features/videoTestimonialEndPoint";

export default function ViewVideoTestimonial() {
  const { id } = useParams()
  const navigate = useNavigate();
  const org = Cookies.get("organization")
  const { refetch, isLoading } = useGetAllVideoTestimonialQuery(org);

  const { data, isLoading: loadingSIngle, isSuccess } = useGetVideoTestimonialQuery(id)
  const singleData = data?.data


  const [addBlog, { isLoading: loadingAdd }] = useEditVideoTestimonialMutation();

  const initialValues = {
    title: "",
    video_url: "",
    organizationId: org
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: VideoTestimonialValidation,
    onSubmit: async (values) => {
      console.log("values", values);

      // try {
      //   const response = await addBlog({ formData: values, id: id });
      //   console.log("API Response:", response);

      //   if (response?.data?.http_status_code === 200) {
      //     refetch();
      //     navigate(`/text-testimonials`);
      //     toast.success(response.data.message);
      //   }
      // } catch (error) {
      //   console.error("Submission error:", error);
      //   toast.error("Failed to submit the form");
      // }
    },
  });

  useEffect(() => {
    setFieldValue("title", singleData?.title)
    setFieldValue("video_url", singleData?.video_url)
  }, [isSuccess])

  return (
    <>
      {
        loadingAdd && <Loader /> || loadingSIngle && <Loader /> || isLoading && <Loader />
      }
      <Row>
        <Col>
          <PageHeader titles="Testimonial" active="View Video Testimonial" items={["Home"]} links={["/dashboard"]} />
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
                      <Form.Control title="text" name="title" disabled onChange={handleChange} onBlur={handleBlur} value={values.title} />
                      {errors.title && touched.title ? <p className={`error`}>{errors.title}</p> : null}
                    </Form.Group>
                  </Col>
                  <Col as={Col} md={6}>
                    <Form.Group as={Col}>
                      <Form.Label>
                        Video Url <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control title="text" name="video_url" disabled onChange={handleChange} onBlur={handleBlur} value={values.video_url} />
                      {errors.video_url && touched.video_url ? <p className={`error`}>{errors.video_url}</p> : null}
                    </Form.Group>
                  </Col>
                </Row>
                {/* <Row className="mt-4">
                  <Button type="submit" className="btn-primary mx-auto w-auto">
                    Save
                  </Button>
                </Row> */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
