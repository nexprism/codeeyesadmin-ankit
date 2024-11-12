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
import Cookies from "js-cookie"

export default function EditServices() {
  const { id } = useParams();

  const navigate = useNavigate();
  const org = Cookies.get("organization")

  const { refetch } = useGetAllServicesQuery(org);

  const { data, refetch: singleblog, isSuccess, isLoading: loadingSingle } = useGetServicesQuery(id);

  const single = data?.data || "";

  const [addBlog, { isLoading: loadingData }] = useEditServicesMutation();

  const initialValues = {
    title: "",
    service: "",
    // banner_image: ""

  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values) => {

      try {
        const response = await addBlog({ id: id, formData: values });
        if (response?.data?.http_status_code === 200) {
          refetch();
          navigate(`/services`);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    setFieldValue("title", single?.title);
    setFieldValue("service", single?.service);

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
                        Service
                        <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control
                        name="service"
                        value={values.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      // value={values.banner_image}
                      />
                      {errors.service && touched.service ? <p className={`error`}>{errors.service}</p> : null}
                    </Form.Group>
                  </Col>
                </Row>

                {/* <Row className="mb-4">
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
                </Row> */}

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
