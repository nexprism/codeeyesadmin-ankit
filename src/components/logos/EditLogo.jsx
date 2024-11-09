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
import Cookies from "js-cookie"
export default function EditLogo() {
  const { id } = useParams();

  const navigate = useNavigate();
  const org = Cookies.get("organization")

  const { refetch } = useGetNewsQuery(org);

  const { data, refetch: singleblog, isSuccess } = useGetSingleLogoQuery(id);

  const single = data?.data || "";

  const [addBlog, isLoading] = useEditLogoMutation();

  const initialValues = {
    title: "",
    banner_image: "",
    status: true,

  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        const response = await addBlog({ blogCategoryId: id, blogCategoryData: formData });
        if (response?.data?.http_status_code === 200) {
          refetch();
          navigate(`/logo`);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    setFieldValue("title", single?.title);
    setFieldValue("banner_image", single?.banner_image);

  }, [isSuccess]);

  return (
    <>
      <Row>
        <Col>
          <PageHeader titles="News" active="Edit News" items={["Home"]} links={["/dashboard"]} />
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
                <Row className="mb-6">
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
