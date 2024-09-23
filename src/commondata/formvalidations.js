import * as Yup from "yup";

export const UserLoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Enter a valid email address")
        .required("This field is required"),
    password: Yup.string().required("This field is required"),
});


export const AddUpdateAdminCharges = Yup.object().shape({
    admin_percent: Yup.string().required("This field is required.")
})

export const AddAdminProfile = Yup.object().shape({
    first_name: Yup.string().required("This field is required"),
    last_name: Yup.string().required("This field is required"),
})

export const AddCompanyValidation = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    website: Yup.string().required("This field is required"),
    logo: Yup.string().required("This field is required"),
})
export const AddEmployValidation = Yup.object().shape({
    first_name: Yup.string().required("This field is required"),
    last_name: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    phone: Yup.string().required("This field is required"),
    company_id: Yup.string().required("This field is required"),
})

export const AddHomePageValidation = Yup.object().shape({
    head_one: Yup.string().required("This field is required"),
    head_description: Yup.string().required("This field is required"),
    about_us_image: Yup.string().required("This field is required"),
    abour_us_btn_text: Yup.string().required("This field is required")
})