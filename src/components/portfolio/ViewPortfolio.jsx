import React, { useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import { useFormik } from "formik";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useNavigate, useParams } from "react-router-dom";
import { useEditPortfolioMutation, useGetAllPortfolioQuery, useGetPortfolioQuery } from "../../redux/features/portfolioEndPoint";
import CreatableSelect from "react-select/creatable";
import Cookies from "js-cookie"
import { useGetBlogCategoriesQuery, useGetBlogTagsQuery } from "../../redux/features/companyEndPoint";

export default function ViewPortfolio() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { refetch } = useGetAllPortfolioQuery();
  const org = Cookies.get('organization')
  const { data: category } = useGetBlogCategoriesQuery(org);
  const categoryData = category?.data;
  const { data, refetch: singleblog, isSuccess } = useGetPortfolioQuery(id);

  const single = data?.data || "";

  const [addBlog, isLoading] = useEditPortfolioMutation();


  const { data: tags } = useGetBlogTagsQuery(org);
  const tagData = tags?.data;

  const tagOptions =
    Array.isArray(tagData) && tagData
      ? tagData.map((tag) => ({
        value: tag?.id,
        label: tag?.name,
      }))
      : [];

  const initialValues = {
    title: "",
    sub_title: "",
    client: "",
    tags: [],
    category: "",
    content: "",
    banner_image: [],
  };

  const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, validateForm } = useFormik({
    initialValues: initialValues,
    validationSchema: "",
    onSubmit: async (values) => {
      console.log("values", values);

      // const formData = new FormData();
      // Object.entries(values).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });

      // try {
      //   const response = await addBlog({ id: id, formData: formData });
      //   if (response?.data?.http_status_code === 200) {
      //     refetch();
      //     navigate(`/home-logos`);
      //     toast.success(response.data.message);
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
    },
  });

  useEffect(() => {
    setFieldValue("title", single?.title);
    setFieldValue("title", single?.sub_title);
    setFieldValue("title", single?.client);
    setFieldValue("title", single?.category);
    setFieldValue("title", single?.content);
    setFieldValue("banner_image", single?.banner_image);
    if (single?.tags) {
      const prefilledTags = tagOptions.filter(tag => single.tags.includes(tag.value));
      setFieldValue("tags", prefilledTags);
    }
  }, [isSuccess]);

  return (
    <>
      <Row>
        <Col>
          <PageHeader titles="Portfolio" active="View portfolio" items={["Home"]} links={["/dashboard"]} />
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
                      <Form.Control title="text" name="title" disabled onChange={handleChange} onBlur={handleBlur} value={values.title} />
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
                        disabled
                      />
                      {errors.banner_image && touched.banner_image ? <p className={`error`}>{errors.banner_image}</p> : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col as={Col} md={6}>
                    <Form.Group >
                      <Form.Label>
                        Sub Title <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control title="text" disabled name="sub_title" onChange={handleChange} onBlur={handleBlur} value={values.sub_title} />
                      {errors.sub_title && touched.sub_title ? <p className={`error`}>{errors.sub_title}</p> : null}
                    </Form.Group>
                  </Col>
                  <Col as={Col} md={6}>
                    <Form.Group >
                      <Form.Label>
                        Client <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Control title="text" disabled name="client" onChange={handleChange} onBlur={handleBlur} value={values.client} />
                      {errors.client && touched.client ? <p className={`error`}>{errors.client}</p> : null}
                    </Form.Group>
                  </Col>

                </Row>
                <Row className="mb-4">
                  <Col as={Col} md={6}>
                    <Form.Group >
                      <Form.Label>
                        Tags <span className="required_icon">*</span>
                      </Form.Label>
                      <CreatableSelect
                        options={tagOptions}
                        name="tags"
                        value={values.tags}
                        onChange={selectedOption => setFieldValue("tags", selectedOption)}
                        onBlur={handleBlur}
                        className="rounded-4"
                        isSearchable
                        placeholder="Add Tags..."
                        isMulti
                      />
                      {errors.tags && touched.tags ? <p className={`error`}>{errors.tags}</p> : null}
                    </Form.Group>
                  </Col>
                  <Col as={Col} md={6}>
                    <Form.Group >
                      <Form.Label>
                        Category <span className="required_icon">*</span>
                      </Form.Label>
                      <Form.Select
                        // options={options}
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
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
                  </Col>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>
                      Content <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />
                  </Form.Group>
                </Row>

                {/* <Row className="mt-4">
                  <Button type="submit" className="btn-primary mx-auto w-auto">
                    Save
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
