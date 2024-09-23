import React from "react";
import { useSelector } from "react-redux";
import DeleteModal from "../../components/plans/DeleteModal";
import PaypalCrediantial from "../../components/paypal-crediential/PaypalCrediantial";
import AddEmploy from "../../components/employ/AddEmploy";
import EditEmploy from "../../components/employ/EditEmploy";
import ViewEmploy from "../../components/employ/ViewEmploy";
import ViewBlogCategory from "../../components/blog-category/ViewBlogCategory";
import EditBlogCategory from "../../components/blog-category/EditBlogCategory";
import AddBlogCategory from "../../components/blog-category/AddBlogCategory";

export default function Modal() {
  const { isOpen, componentName } = useSelector(
    (state) => state.allCommonModal
  );

  const renderComponent = () => {
    switch (componentName) {

      case "DeleteModal":
        return <DeleteModal />;
      case "PaypalCrediantial":
        return <PaypalCrediantial />;
      case "AddEmploy":
        return <AddEmploy />;
      case "EditEmploy":
        return <EditEmploy />;
      case "ViewEmploy":
        return <ViewEmploy />;
      case "ViewBlogCategory":
        return <ViewBlogCategory />;
      case "EditBlogCategory":
        return <EditBlogCategory />;
      case "AddBlogCategory":
        return <AddBlogCategory />;
      default:
        return null;
    }
  };
  return <>{isOpen && renderComponent()}</>;
}
