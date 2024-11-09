import React, { useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import {
  useEditLogoMutation,
  useGetNewsQuery,
  useGetSingleLogoQuery,
} from "../../redux/features/companyEndPoint";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetAllHomeLogoQuery, useGetHomeLogoQuery, } from "../../redux/features/homeLogoEndPoint";
import Loader from "../../layouts/layoutcomponents/loader";
import { useEditServicesMutation, useGetAllServicesQuery, useGetServicesQuery } from "../../redux/features/servicesEndPoingt";
import { useEditEmailFooterMutation, useGetAllEmailFooterQuery, useGetEmailFooterQuery } from "../../redux/features/emailFooterEndPoint";
import Cookies from "js-cookie"
export default function EditEmailFooter() {
  const { id } = useParams();

  const navigate = useNavigate();
  const org = Cookies.get("organization")
  const { refetch } = useGetAllEmailFooterQuery(org);

  const { data, refetch: singleblog, isSuccess, isLoading: loadingSingle } = useGetEmailFooterQuery(id);

  const single = data?.data || "";

  const [addBlog, { isLoading: loadingData }] = useEditEmailFooterMutation();

  const initialValues = {
    title: "",
    email: ""

  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values) => {


      try {
        const response = await addBlog({ id: id, formData: values });
        if (response?.data?.http_status_code === 200) {
          refetch();
          singleblog()
          navigate(`/email-footer`);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    setFieldValue("title", single?.title);
    setFieldValue("email", single?.email);

  }, [isSuccess]);

  return (
    <>
      {
        loadingSingle && <Loader /> || loadingData && <Loader />
      }
      <Row>
        <Col>
          <PageHeader titles="News" active="Edit Home News" items={["Home"]} links={["/dashboard"]} />
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
                        Email
                        <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      // value={values.banner_image}
                      />
                      {errors.email && touched.email ? <p className={`error`}>{errors.email}</p> : null}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Button type="submit" className="btn-primary mx-auto w-auto">
                    Update
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
