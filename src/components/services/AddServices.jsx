import React from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie"
import Loader from "../../layouts/layoutcomponents/loader";
import { useAddServicesMutation, useGetAllServicesQuery } from "../../redux/features/servicesEndPoingt";
export default function AddServices() {
  const navigate = useNavigate();

  const org = Cookies.get("organization")
  const { refetch } = useGetAllServicesQuery(org);

  const [addBlog, { isLoading: loading }] = useAddServicesMutation();

  const initialValues = {
    title: "",
    service: "",
    organizationId: org
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values) => {
      console.log("values", values);

      try {
        const response = await addBlog(values);
        if (response?.data?.http_status_code === 201) {
          refetch();
          navigate(`/services`);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      {
        loading && <Loader />
      }
      <Row>
        <Col>
          <PageHeader titles="Logo" active="Add Home Logo" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col as={Col} md={6}>
                    <Form.Group >
                      <Form.Label>
                        Title <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control title="text" name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                      {errors.title && touched.title ? <p className={`error`}>{errors.title}</p> : null}
                    </Form.Group>
                  </Col>
                  <Col as={Col} md={6}>
                    <Form.Group >
                      <Form.Label>
                        Service
                        <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control
                        // type="file"
                        name="service"
                        value={values.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.service && touched.service ? <p service={`error`}>{errors.service}</p> : null}
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
