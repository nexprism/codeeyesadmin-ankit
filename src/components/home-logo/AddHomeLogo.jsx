import React from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import { useAddLogoMutation, useGetLogoQuery } from "../../redux/features/companyEndPoint";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddHomeLogoMutation, useGetAllHomeLogoQuery } from "../../redux/features/homeLogoEndPoint";
import Cookies from "js-cookie"
import Loader from "../../layouts/layoutcomponents/loader";
export default function AddHomelogo() {
  const navigate = useNavigate();

  const org = Cookies.get("organization")
  const { refetch } = useGetAllHomeLogoQuery(org);

  const [addBlog, { isLoading: loading }] = useAddHomeLogoMutation();

  const initialValues = {
    title: "",
    banner_image: "",
    organizationId: org
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
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
          navigate(`/home-logos`);
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
                        Banner Image (JPG,JPEG,PNG,2MB Size)
                        <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="banner_image"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => setFieldValue("banner_image", e.target.files[0])}
                        onBlur={handleBlur}
                      />
                      {errors.banner_image && touched.banner_image ? <p className={`error`}>{errors.banner_image}</p> : null}
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
