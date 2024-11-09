import React from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import { useAddLogoMutation, useGetLogoQuery } from "../../redux/features/companyEndPoint";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Addlogo() {
  const navigate = useNavigate();

  const { refetch } = useGetLogoQuery();

  const [addBlog, isLoading] = useAddLogoMutation();

  const initialValues = {
    title: "",
    banner_image: "",
    status: true,
    category: "",
    content: "",
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const organization = searchParams.get("organization");

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      try {
        const response = await addBlog({ blogCategoryData: formData, organization });
        if (response?.data?.http_status_code === 201) {
          refetch();
          navigate(`/logo`);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Row>
        <Col>
          <PageHeader titles="Logo" active="Add Logo" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      Title <span className="required_icon">*</span>
                    </Form.Label>
                    <Form.Control title="text" name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                    {errors.title && touched.title ? <p className={`error`}>{errors.title}</p> : null}
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} md="4">
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
                      // value={values.banner_image}
                    />
                    {errors.banner_image && touched.banner_image ? <p className={`error`}>{errors.banner_image}</p> : null}
                  </Form.Group>
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
