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
import { useEffect, useState } from "react";

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
	const [formData, setFormData] = useState(initialBusinessFormData);
	const [touched, setTouched] = useState(false);
	const [errors, setErrors] = useState({});
	const [hasError, setHasError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await validateBusinessInfo();
		if (!hasError) {
			// Proceed with form submission or other actions
			console.log("Form submitted successfully!");
		}
	};

	const handleChange = (name, value) => {
		if (!touched) {
			setTouched(true);
		}
		setFormData({ ...formData, [name]: value });
	};

	const validateBusinessInfo = async () => {
		try {
			await businessInfoSchema.validate(formData, { abortEarly: false });
			setErrors({});
			setHasError(false);
		} catch (err) {
			console.log(err);
			setHasError(true);
			const errors = {}; // No need for TypeScript type annotations in JavaScript
			err?.inner?.forEach((error) => {
				errors[error.path] = error.message;
			});
			setErrors(errors); // Update state once after collecting all errors
		}
	};

	useEffect(() => {
		validateBusinessInfo();
	}, [formData]);

	console.log("errors", errors);
	console.log(formData);

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
									value={formData.name}
									onChange={(e) =>
										handleChange("name", e.target.value)
									}
								/>
								{touched && errors.name && (
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
									value={formData.email}
									onChange={(e) =>
										handleChange("email", e.target.value)
									}
								/>
								{touched && errors.email && (
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
									value={formData.password}
									onChange={(e) =>
										handleChange("password", e.target.value)
									}
								/>
								{touched && errors.password && (
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
									value={formData.confirmPassword}
									onChange={(e) =>
										handleChange(
											"confirmPassword",
											e.target.value
										)
									}
								/>
								{touched && errors.confirmPassword && (
									<p className="text-red-500 text-sm">
										{errors.confirmPassword}
									</p>
								)}
							</label>

							<div>
								<span className="text-sm">Business Type</span>
								<RadioGroup
									value={formData.businessType}
									className="flex items-center gap-5"
									onValueChange={(value) =>
										handleChange("businessType", value)
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

							{formData.businessType === "offline" && (
								<label className="text-sm">
									<span className="cursor-pointer">
										Business Address
									</span>
									<Input
										type="text"
										name="address"
										value={formData.address}
										onChange={(e) =>
											handleChange(
												"address",
												e.target.value
											)
										}
									/>
									{touched && errors.address && (
										<p className="text-red-500 text-sm">
											{errors.address}
										</p>
									)}
								</label>
							)}

							{formData.businessType === "online" && (
								<label className="text-sm">
									<span className="cursor-pointer">
										Business Website
									</span>
									<Input
										type="text"
										name="website"
										value={formData.website}
										onChange={(e) =>
											handleChange(
												"website",
												e.target.value
											)
										}
									/>
									{touched && errors.website && (
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
