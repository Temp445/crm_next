'use client'

import React, { useRef, useState } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { MdOutlineMail, MdAddIcCall } from "react-icons/md";

// Define Types
type FormErrors = {
    [key: string]: string;
};

type ProductEnquireProps = {
    onClose?: () => void; // Optional close function
};

type FormData = {
    username: string;
    companyname: string;
    businessemail: string;
    mobilenumber: string;
    yourlocation: string;
    about: string;
};


// Email error type
interface EmailError {
    message: string;
}

export default function ProductEnquire({ onClose }: ProductEnquireProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const form = useRef<HTMLFormElement | null>(null);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formCurrent = form.current;
        if (!formCurrent) return;

        const formData: FormData = {
            username: (formCurrent["username"] as HTMLInputElement).value.trim(),
            companyname: (formCurrent["companyname"] as HTMLInputElement).value.trim(),
            businessemail: (formCurrent["businessemail"] as HTMLInputElement).value.trim(),
            mobilenumber: (formCurrent["mobilenumber"] as HTMLInputElement).value.trim(),
            yourlocation: (formCurrent["yourlocation"] as HTMLInputElement).value.trim(),
            about: (formCurrent["about"] as HTMLTextAreaElement).value.trim(),
        };

        const errors: FormErrors = {};

        // Basic validation
        for (const field in formData) {
            const key = field as keyof FormData;
            if (!formData[key]) {
                errors[key] = "Input is required to proceed";
            }
        }

        if (formData.businessemail && !emailPattern.test(formData.businessemail)) {
            errors.businessemail = "Please enter a valid email.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        } else {
            setFormErrors({});
        }

        window.gtag('event', 'form_submission', {
            'form_id': 'enquiry_form',
            'form_name': 'Enquiry Form'
        });

        setLoading(true);

        // Send email using EmailJS
        emailjs
            .sendForm(
                "service_yscbz1z", 
                "template_3n7gsrj", 
                formCurrent, 
                "9dR2KnJDZ6eO4NSee"
            )
            .then((response: EmailJSResponseStatus) => {
                console.log("Email sent successfully!", response);
                alert("Your message has been sent successfully!");
                formCurrent.reset();
            })
            .catch((error: EmailError) => {
                console.error("Email sending failed:", error);
                alert("There was an issue sending your message. Please try again later.");
            })
            .finally(() => setLoading(false));

        // WhatsApp message formatting
        const whatsappMessage = `Product Enquiry:%0A
        Name: ${formData.username}%0A
        Company: ${formData.companyname}%0A
        Email: ${formData.businessemail}%0A
        Mobile: ${formData.mobilenumber}%0A
        Location: ${formData.yourlocation}%0A
        Product: ACE CRM%0A
        Queries: ${formData.about || "None"}`;

        const whatsappURL = `https://wa.me/339791394131?text=${whatsappMessage}`;
        window.open(whatsappURL, "_blank");
    };

    return (
        <div>
            <div className="min-h-screen py-12 px-2 md:px-4" id="contact">
                <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                        >
                            &times;
                        </button>
                    )}

                    <h1 className="md:text-2xl font-extrabold text-center mb-6 font-['Inter']">
                        Product Enquiry
                    </h1>
                    <form ref={form} noValidate onSubmit={handleSubmit} className="space-y-6">
                        {[ 
                            { id: "username", label: "Name" },
                            { id: "companyname", label: "Company Name" },
                            { id: "businessemail", label: "Business Email", type: "email" },
                            { id: "mobilenumber", label: "Mobile Number", type: "number" },
                            { id: "yourlocation", label: "Your Location" }
                        ].map(({ id, label, type = "text" }) => (
                            <div key={id}>
                                <label className="block text-sm font-medium text-gray-700">{label}:</label>
                                <input
                                    id={id}
                                    name={id}
                                    type={type}
                                    placeholder={`Enter your ${label.toLowerCase()} *`}
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {formErrors[id] && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors[id]}</p>
                                )}
                            </div>
                        ))}

                        <div className="flex flex-wrap gap-2 w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Product Interested:
                            </label>
                            <input
                                type="text"
                                name="Product"
                                defaultValue="ACE CRM"
                                readOnly
                                className="text-sm font-bold"
                                aria-label="Product Interested"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Queries:</label>
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                placeholder="Enter your queries"
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white text-[14px] px-3 py-2 md:px-5 md:py-2.5 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="absolute bottom-[980px] smml:bottom-[1000px] rounded-lg lg:rounded-none ml-3 smm:w-[385px] sml:ml-5 sm:ml-0 w-[350px] md:right-40 md:bottom-[950px] lg:right-5 xl:right-10 lg:bottom-[900px] xl:bottom-[850px] xxl:bottom-[800px] bg-indigo-600 p-1 lg:p-3 lg:w-[200px] lg:rounded-t-2xl lg:rounded-br-2xl shadow-lg shadow-indigo-400 hover:shadow-indigo-600">
                <div className="text-white text-center my-2 text-[16px] lg:text-lg font-bold">Contact Us :</div>
                <div className="px-2 ml-5 smm:ml-8 md:ml-12 lg:ml-0 flex gap-5 lg:px-0 lg:gap-0 lg:flex-col">
                    <div className="text-white my-2 flex text-[14px] lg:text-lg gap-1">
                        <MdAddIcCall className="mt-1 lg:mt-1.5" />+91 9840137210
                    </div>
                    <div className="text-white flex text-[14px] lg:text-lg gap-2 mt-2 lg:mt-0">
                        <MdOutlineMail className="mt-1 lg:mt-1.5" /> sales@acesoft.in
                    </div>
                </div>
            </div>
        </div>
    );
}
