import React, { useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useNavigate, useParams } from "react-router-dom";
import { useEditServicesMutation, useGetAllServicesQuery, useGetServicesQuery } from "../../redux/features/servicesEndPoingt";
import { useEditEmailFooterMutation, useGetAllEmailFooterQuery, useGetEmailFooterQuery } from "../../redux/features/emailFooterEndPoint";
import Cookies from "js-cookie"
export default function ViewEmailFooter() {
  const { id } = useParams();

  const navigate = useNavigate();
  const org = Cookies.get("organozation")
  const { refetch } = useGetAllEmailFooterQuery(org);

  const { data, refetch: singleblog, isSuccess } = useGetEmailFooterQuery(id);

  const single = data?.data || "";

  const [addBlog, isLoading] = useEditEmailFooterMutation();

  const initialValues = {
    title: "",
    email: ""
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values) => {
      console.log("values", values);

      //   try {
      //     const response = await addBlog({ id: id, formData: formData });
      //     if (response?.data?.http_status_code === 200) {
      //       refetch();
      //       navigate(`/home-logos`);
      //       toast.success(response.data.message);
      //     }
      //   } catch (error) {
      //     console.error(error);
      //   }
    },
  });

  useEffect(() => {
    setFieldValue("title", single?.title);
    setFieldValue("email", single?.email);
  }, [isSuccess]);

  return (
    <>
      <Row>
        <Col>
          <PageHeader titles="News" active="View Home News" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Form.Group as={Col} md="6">
                    <Form.Label>
                      Title <span className="required_icon">*</span>
                    </Form.Label>
                    <Form.Control title="text" name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} disabled />
                    {errors.title && touched.title ? <p className={`error`}>{errors.title}</p> : null}
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>
                      Service
                      <span className="required_icon">*</span>
                    </Form.Label>
                    <Form.Control
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                      disabled
                    // value={values.banner_image}
                    />
                    {errors.email && touched.email ? <p className={`error`}>{errors.email}</p> : null}
                  </Form.Group>
                </Row>

                {/* <Row className="mt-4">
                  <Button type="submit" className="btn-primary mx-auto w-auto">
                    Update
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
