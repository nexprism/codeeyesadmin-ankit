import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { options_for_sunEditor } from "../../commondata/formEditorOptions";
import { useFormik } from "formik";
import { useAddBlogMutation, useGetBlogCategoriesQuery, useGetBlogQuery, useGetBlogTagsQuery } from "../../redux/features/companyEndPoint";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddBlogs() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const organization = searchParams.get("organization");
  const { data: tags } = useGetBlogTagsQuery(organization);
  const tagData = tags?.data;
  const { data: category } = useGetBlogCategoriesQuery(organization);
  const categoryData = category?.data;



  const { refetch } = useGetBlogQuery();

  const [addBlog, isLoading] = useAddBlogMutation();

  const initialValues = {
    title: "",
    banner_image: "",
    status: true,
    slug: "",
    tags: [],
    excerpt: "",
    category: null,
    content: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    og_tag: "",
    schema_markup: "",
    authorName:"",
    authorRole:"",
    authorProfile:"",
    authorDescription:"",
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "tags" && Array.isArray(value)) {
          value.forEach((tag) => {
            formData.append("tags", tag.label);
          });
        } else if (key === "category" && Array.isArray(value)) {
          value.forEach((cate) => {
            formData.append("category", cate.value);
          });
        } else {
          formData.append(key, value);
        }
      });
      try {
        const response = await addBlog({ blogCategoryData: formData, organization });
        console.log(response);
        if (response?.data?.http_status_code === 201) {
          
          navigate(`/blog`);
          refetch();
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const tagOptions =
    Array.isArray(tagData) && tagData
      ? tagData.map((tag) => ({
          value: tag?.id,
          label: tag?.name,
        }))
      : [];

  const options = categoryData
    ? categoryData.map((category) => ({
        value: category?.id,
        label: category?.name,
      }))
    : [];

  return (
    <>
      <Row>
        <Col>
          <PageHeader titles="Blog" active="Add Blog" items={["Home"]} links={["/dashboard"]} />
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
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      Category <span className="required_icon">*</span>
                    </Form.Label>
                    <Form.Select
                      // options={options}
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select</option>
                      {categoryData &&
                        categoryData.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item?.name}
                            </option>
                          );
                        })}
                    </Form.Select>
                    {errors.category && touched.category ? <p className={`error`}>{errors.category}</p> : null}
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      Author Name <span className="required_icon">*</span>
                    </Form.Label>
                    <Form.Control title="text" name="authorName" onChange={handleChange} onBlur={handleBlur} value={values.authorName} />
                    {errors.authorName && touched.authorName ? <p className={`error`}>{errors.authorName}</p> : null}
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                      Author Role <span className="required_icon">*</span>
                    </Form.Label>
                    <Form.Control title="text" name="authorRole" onChange={handleChange} onBlur={handleBlur} value={values.authorRole} />
                    {errors.authorRole && touched.authorRole ? <p className={`error`}>{errors.authorRole}</p> : null}
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Label>
                    Author Profile (JPG,JPEG,PNG,2MB Size) <span className="required_icon">*</span>
                    </Form.Label>
                    <Form.Control title="text" name="authorProfile" onChange={handleChange} onBlur={handleBlur} value={values.authorProfile} />
                    {errors.authorProfile && touched.authorProfile ? <p className={`error`}>{errors.authorProfile}</p> : null}
                  </Form.Group>
                 
                  
                </Row>
                

                <Row className="mb-6">
                  <Form.Group as={Col} md="12">
                    <Form.Label>
                      Author Description <span className="required_icon">*</span>
                    </Form.Label>
                    <SunEditor
                      name="authorDescription"
                      onChange={(authorDescription) => setFieldValue("authorDescription", authorDescription)}
                      onBlur={() => setFieldTouched("authorDescription", true)}
                      setContents={values.authorDescription}
                      setOptions={options_for_sunEditor}
                    />
                    {errors.authorDescription && touched.authorDescription ? <p className={`error`}>{errors.authorDescription}</p> : null}
                  </Form.Group>
                </Row>

                <Row className="mb-6">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Tags</Form.Label>
                    <CreatableSelect
                      options={tagOptions}
                      name="tags"
                      value={tagOptions.find((option) => option.value === values.tags)}
                      onChange={(selectedOption) => setFieldValue("tags", selectedOption)}
                      onBlur={handleBlur}
                      className="rounded-4"
                      isSearchable
                      placeholder="Add Tags..."
                      isMulti
                    />
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
                    />
                    {errors.content && touched.content ? <p className={`error`}>{errors.content}</p> : null}
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
