"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { businessInfoSchema } from "@/schemas/businessInfoValidator.schema";
import { useFormik } from "formik";

const initialBusinessFormData = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	businessType: "online",
	website: "",
	address: "",
};

export default function Home() {
	const {
		handleChange,
		touched,
		errors,
		handleSubmit,
		values,
		setFieldValue,
	} = useFormik({
		initialValues: initialBusinessFormData,
		onSubmit: () => {
			console.log("hello there");
		},
		validationSchema: businessInfoSchema,
		enableReinitialize: true,
		validateOnBlur: true,
		validateOnChange: true,
		validateOnMount: false,
	});

	console.log("errors", errors);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<Card className="w-96 max-w-96">
						<CardHeader>
							<CardTitle>Register Your Business</CardTitle>
							<CardDescription>
								Welcome to OpenTable
							</CardDescription>
						</CardHeader>
						<CardContent>
							<label className="text-sm">
								<span className="cursor-pointer">
									Business Name
								</span>
								<Input
									type="text"
									name="name"
									required
									value={values.name}
									onChange={handleChange}
								/>
								{touched?.name && errors?.name && (
									<p className="text-red-500 text-sm">
										{errors.name}
									</p>
								)}
							</label>

							<label className="text-sm">
								<span className="cursor-pointer">
									Business Email
								</span>
								<Input
									type="email"
									name="email"
									required
									value={values.email}
									onChange={handleChange}
								/>
								{touched?.email && errors?.email && (
									<p className="text-red-500 text-sm">
										{errors.email}
									</p>
								)}
							</label>

							<label className="text-sm">
								<span className="cursor-pointer">Password</span>
								<Input
									type="password"
									name="password"
									required
									value={values.password}
									onChange={handleChange}
								/>
								{touched?.password && errors?.password && (
									<p className="text-red-500 text-sm">
										{errors.password}
									</p>
								)}
							</label>

							<label className="text-sm">
								<span className="cursor-pointer">
									Confirm Password
								</span>
								<Input
									type="password" // Fixed type
									name="confirmPassword"
									required
									value={values.confirmPassword}
									onChange={handleChange}
								/>
								{touched?.confirmPassword &&
									errors?.confirmPassword && (
										<p className="text-red-500 text-sm">
											{errors.confirmPassword}
										</p>
									)}
							</label>

							<div>
								<span className="text-sm">Business Type</span>
								<RadioGroup
									name="businessType"
									value={values.businessType}
									className="flex items-center gap-5"
									onValueChange={(value) =>
										setFieldValue("businessType", value)
									}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="online"
											id="online"
										/>
										<Label htmlFor="online">Online</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="offline"
											id="offline"
										/>
										<Label htmlFor="offline">Offline</Label>
									</div>
								</RadioGroup>
							</div>

							{values.businessType === "offline" && (
								<label className="text-sm">
									<span className="cursor-pointer">
										Business Address
									</span>
									<Input
										type="text"
										name="address"
										value={values.address}
										onChange={handleChange}
									/>
									{touched?.address && errors?.address && (
										<p className="text-red-500 text-sm">
											{errors.address}
										</p>
									)}
								</label>
							)}

							{values.businessType === "online" && (
								<label className="text-sm">
									<span className="cursor-pointer">
										Business Website
									</span>
									<Input
										type="text"
										name="website"
										value={values.website}
										onChange={handleChange}
									/>
									{touched?.website && errors?.website && (
										<p className="text-red-500 text-sm">
											{errors.website}
										</p>
									)}
								</label>
							)}
						</CardContent>
						<CardFooter className="flex justify-end">
							<Button type="submit">Submit</Button>
						</CardFooter>
					</Card>
				</form>
			</main>
		</div>
	);
}
