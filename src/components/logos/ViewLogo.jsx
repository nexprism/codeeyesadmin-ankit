import React, { useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { options_for_sunEditor } from "../../commondata/formEditorOptions";
import { useFormik } from "formik";
import {
  useAddBlogMutation,
  useEditBlogMutation,
  useEditNewsMutation,
  useGetBlogCategoriesQuery,
  useGetBlogQuery,
  useGetBlogTagsQuery,
  useGetNewsQuery,
  useGetSingleBlogQuery,
  useGetSingleNewsQuery,
} from "../../redux/features/companyEndPoint";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function ViewLogo() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { refetch } = useGetNewsQuery();

  const { data, refetch: singleblog, isSuccess } = useGetSingleNewsQuery(id);

  const single = data?.data || "";

  const [addBlog, isLoading] = useEditNewsMutation();

  const initialValues = {
    title: "",
    banner_image: "",
    status: true,
    category: "",
    content: "",
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
          navigate(`/blog`);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    setFieldValue("title", single?.title);
    setFieldValue("content", single?.content);
    setFieldValue("banner_image", single?.banner_image);
    setFieldValue("category", single?.category);
  }, [isSuccess]);

  return (
    <>
      <Row>
        <Col>
          <PageHeader titles="News" active="View News" items={["Home"]} links={["/dashboard"]} />
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
                    <Form.Control title="text" name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} disabled />
                    {errors.title && touched.title ? <p className={`error`}>{errors.title}</p> : null}
                  </Form.Group>
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
                      disabled
                      // value={values.banner_image}
                    />
                    {errors.banner_image && touched.banner_image ? <p className={`error`}>{errors.banner_image}</p> : null}
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      Category <span className="required_icon">*</span>
                    </Form.Label>
                    <Form.Control name="category" onChange={handleChange} onBlur={handleBlur} value={values.category} disabled />
                    {errors.category && touched.category ? <p className={`error`}>{errors.category}</p> : null}
                  </Form.Group>
                </Row>
                <Row className="mb-6">
                  <Form.Group as={Col} md="12">
                    <Form.Label>
                      Content <span className="required_icon">*</span>
                    </Form.Label>
                    <SunEditor
                      name="content"
                      onChange={(content) => setFieldValue("content", content)}
                      onBlur={() => setFieldTouched("content", true)}
                      setContents={values.content}
                      setOptions={options_for_sunEditor}
                      disable
                    />
                    {errors.content && touched.content ? <p className={`error`}>{errors.content}</p> : null}
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
