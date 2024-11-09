import React, { useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import { useEditOurTeemMutation, useGetOurTeamQuery } from "../../redux/features/ourTeamEndPoint";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../layouts/layoutcomponents/loader";
import Cookies from "js-cookie";
import * as Yup from 'yup'; // Add Yup for validation

export default function ViewOurTeam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const org = Cookies.get("organization");

  const { data, isSuccess, isLoading: loadingSingle } = useGetOurTeamQuery(id);
  const single = data?.data || "";

  const [editTeamMember, { isLoading: loadingData }] = useEditOurTeemMutation();

  // Initial form values
  const initialValues = {
    title: "",
    image_url: "",
    name: "",
    position: "",
    twitter_link: "",
    facebook_link: "",
    linkedin_link: "",
    instagram_link: "",
    organizationId: org,
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    image_url: Yup.mixed().required("Image is required"),
    name: Yup.string().required("Name is required"),
    position: Yup.string().required("Position is required"),
    twitter_link: Yup.string().url("Invalid URL").notRequired(),
    facebook_link: Yup.string().url("Invalid URL").notRequired(),
    linkedin_link: Yup.string().url("Invalid URL").notRequired(),
    instagram_link: Yup.string().url("Invalid URL").notRequired(),
  });

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // try {
      //   const response = await editTeamMember({ id: id, formData: formData });
      //   if (response?.data?.http_status_code === 200) {
      //     navigate(`/our-team`);
      //     toast.success(response.data.message);
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
    },
  });

  // Setting initial values after fetching single data
  useEffect(() => {
    if (isSuccess) {
      setFieldValue("title", single?.title || "");
      setFieldValue("image_url", single?.image_url || "");
      setFieldValue("name", single?.name || "");
      setFieldValue("position", single?.position || "");
      setFieldValue("twitter_link", single?.twitter_link || "");
      setFieldValue("facebook_link", single?.facebook_link || "");
      setFieldValue("linkedin_link", single?.linkedin_link || "");
      setFieldValue("instagram_link", single?.instagram_link || "");
    }
  }, [isSuccess, single, setFieldValue]);

  return (
    <>
      {(loadingSingle || loadingData) && <Loader />}
      <Row>
        <Col>
          <PageHeader titles="Our Team" active="View Our Team Member" items={["Home"]} links={["/dashboard"]} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        Title <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        value={values.title}
                      />
                      {errors.title && touched.title && <p className="error">{errors.title}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        Image (JPG, JPEG, PNG, Max Size 2MB) <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="image_url"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={(e) => setFieldValue("image_url", e.target.files[0])}
                        onBlur={handleBlur}
                        disabled
                      />
                      {errors.image_url && touched.image_url && <p className="error">{errors.image_url}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Name <span className="required_icon">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        value={values.name}
                      />
                      {errors.name && touched.name && <p className="error">{errors.name}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Position <span className="required_icon">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="position"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        value={values.position}
                      />
                      {errors.position && touched.position && <p className="error">{errors.position}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Twitter Link</Form.Label>
                      <Form.Control
                        type="url"
                        name="twitter_link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        value={values.twitter_link}
                      />
                      {errors.twitter_link && touched.twitter_link && <p className="error">{errors.twitter_link}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Facebook Link</Form.Label>
                      <Form.Control
                        type="url"
                        name="facebook_link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        value={values.facebook_link}
                      />
                      {errors.facebook_link && touched.facebook_link && <p className="error">{errors.facebook_link}</p>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>LinkedIn Link</Form.Label>
                      <Form.Control
                        type="url"
                        name="linkedin_link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        value={values.linkedin_link}
                      />
                      {errors.linkedin_link && touched.linkedin_link && <p className="error">{errors.linkedin_link}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Instagram Link</Form.Label>
                      <Form.Control
                        type="url"
                        name="instagram_link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                        value={values.instagram_link}
                      />
                      {errors.instagram_link && touched.instagram_link && <p className="error">{errors.instagram_link}</p>}
                    </Form.Group>
                  </Col>
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
