import * as Yup from "yup";

export const businessInfoSchema = Yup.object().shape({
	name: Yup.string().required("Business name is required"),
	email: Yup.string()
		.required("Business email is required")
		.email("Invalid email address"),
	password: Yup.string()
		.required("Business password is required")
		.min(6, "Password should be at least 6 characters long")
		.max(20, "Password should be at most 20 characters long"),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref("password")],
		"Passwords do not match"
	),
	businessType: Yup.string()
		.required("Business type is required")
		.oneOf(["online", "offline"]),
	website: Yup.lazy((value, context) => {
		if (context?.parent?.businessType === "online") {
			return Yup.string()
				.required("Website is required")
				.url("Must be a valid URL starting with http or https");
		}
		return Yup.string().notRequired();
	}),
	address: Yup.lazy((value, context) => {
		if (context?.parent?.businessType === "offline") {
			return Yup.string().required("Address is required");
		}
		return Yup.string().notRequired();
	}),
});
