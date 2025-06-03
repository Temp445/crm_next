"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MdOutlineMail, MdAddIcCall } from "react-icons/md";
import PhoneInput, {
  isValidPhoneNumber
} from "react-phone-number-input";
import 'react-phone-number-input/style.css';


const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const stromxToken = process.env.NEXT_PUBLIC_STROMX_TOKEN;
const adminPhones = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(",").map((p) => p.trim());

type FormErrors = {
  [key: string]: string;
};

type ProductEnquireProps = {
  onClose?: () => void;
};

type FormData = {
  name: string;
  company: string;
  email: string;
  number: string;
  location: string;
  product: string; 
  queries: string;
};

export default function ProductEnquire({ onClose }: ProductEnquireProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const form = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string>("");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   const gmailTypos = [
    'gamil.com', 'gnail.com', 'gmial.com', 'gmaill.com', 'gmail.con',
    'gmail.co', 'gmail.om', 'gmail.cim', 'gmail.cm', 'gmai.com',
    'gmail.comm', 'gmal.com', 'gmaul.com', 'gmail.xom', 'gmail.vom',
    'g.mail.com', 'gmaik.com', 'gmaio.com', 'gmali.com', 'gmali.con',
    'gmail.clm', 'gmail.coom', 'gmaiil.com', 'ggmail.com', 'gemail.com',
    'gmmail.com', 'gmiall.com', 'gmsil.com', 'gmale.com', 'gmall.com',
    'gmil.com', 'gmailc.om', 'gmailc.com', 'gmailm.com', 'gmali.cm',
    'gmalil.com', 'gmial.cm', 'gmaol.com', 'gmauk.com', 'gmaul.co',
    'gmail.ckm', 'gmail.kom', 'gmail.bom', 'gmail.dcom', 'gmaul.con', 'mail.com'
  ];


    const validateEmail = (email: string): string => {
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }

    const domain = email.split('@')[1]?.toLowerCase();
    if (gmailTypos.includes(domain)) {
      return 'Did you mean "gmail.com"?';
    }

    return '';
  };


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailInput = e.target.value.trim();
      setEmail(emailInput);
  
      if (!emailPattern.test(emailInput)) {
        setEmailError('Please enter a valid email address.');
        return;
      }
  
      const domain = emailInput.split('@')[1]?.toLowerCase();
  
      if (gmailTypos.includes(domain)) {
        setEmailError('Did you mean "gmail.com"?');
        return;
      }
  
      setEmailError('');
    };


  const sendWhatsAppNotification = async (formData: FormData) => {
    if (!stromxToken || !adminPhones || adminPhones.length === 0) {
      console.warn("Missing Stromx token or admin phone numbers.");
      return;
    }

    const messagePayload = {
      type: "template",
      template: {
        name: "enquiry_ace_crm",
        language: { policy: "deterministic", code: "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: formData.name },
              { type: "text", text: formData.company },
              { type: "text", text: formData.email },
              { type: "text", text: formData.number },
              { type: "text", text: formData.location },
              { type: "text", text: formData.queries },
            ],
          },
        ],
      },
    };

    for (const phone of adminPhones) {
      try {
        const response = await fetch(
          `https://api.stromx.io/v1/message/send-message?token=${stromxToken}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...messagePayload, to: phone }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          console.log(`WhatsApp sent to ${phone}:`, data);
        } else {
          console.error(`WhatsApp failed for ${phone}:`, data);
        }
      } catch (error) {
        console.error(`WhatsApp error for ${phone}:`, error);
      }
    }
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!form.current) return;

  const elements = form.current.elements as typeof form.current.elements & {
    name: HTMLInputElement;
    company: HTMLInputElement;
    email: HTMLInputElement;
    location: HTMLInputElement;
    product: HTMLInputElement;
    queries: HTMLTextAreaElement;
  };

  const errors: FormErrors = {};
  const name = elements.name.value.trim();
  const company = elements.company.value.trim();
  const location = elements.location.value.trim();
  const product = elements.product.value.trim();
  const queries = elements.queries.value.trim();

  if (!name) errors.name = "Name is required.";
  if (!company) errors.company = "Company name is required.";

  else {
    const emailValidationMessage = validateEmail(email);
    if (emailValidationMessage) {
      errors.email = emailValidationMessage;
    }
  }
  if (!phone || !isValidPhoneNumber(phone)) {
    errors.number = "Valid phone number is required.";
    setPhoneError("Please enter a valid phone number.");
  } else {
    setPhoneError("");
  }
  if (!location) errors.location = "Location is required.";

  setFormErrors(errors);

  if (Object.keys(errors).length > 0) {
    alert("Please fill out all required fields correctly.");
    return;
  }

  const formData: FormData = {
    name,
    company,
    email,
    number: phone!,
    location,
    product,
    queries
  };

  setLoading(true);

  try {
    await Promise.all([
      emailjs.send(service_ID!, template_ID!, formData, publicKey),
      sendWhatsAppNotification(formData)
    ]);

    alert("Your message has been sent successfully!");
    form.current.reset();
    setPhone(undefined);
    setEmail('');
  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className="min-h-screen py-12 px-2 md:px-4" id="contact">
        <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close form"
            >
              &times;
            </button>
          )}

          <h1 className="md:text-2xl font-bold text-center mb-6">Product Enquiry</h1>

          <form ref={form} noValidate onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name *"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-invalid={!!formErrors.name}
                aria-describedby="name-error"
              />
              {formErrors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name:
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="Enter your company name *"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-invalid={!!formErrors.company}
                aria-describedby="company-error"
              />
              {formErrors.company && (
                <p id="company-error" className="text-red-500 text-sm mt-1">{formErrors.company}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Business Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your business email *"
                onChange={handleEmailChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-invalid={!!formErrors.email}
                aria-describedby="email-error"
              />
              {emailError && (
        <p className="text-red-500 text-sm mt-1">{emailError}</p>
      )}
            </div>

            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Mobile Number:
              </label>
           <PhoneInput
                  international
                  defaultCountry="IN"
                  name="number"
                  value={phone}
                  onChange={setPhone}
                  required
                   className=" !shadow-none rounded !bg-transparent border mt-1 p-2 [&>input]:border-none [&>input]:outline-none [&>input]:bg-transparent"
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Your Location:
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="Enter your location *"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-invalid={!!formErrors.location}
                aria-describedby="location-error"
              />
              {formErrors.location && (
                <p id="location-error" className="text-red-500 text-sm mt-1">{formErrors.location}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 w-full items-center">
              <label className="block text-sm font-medium text-gray-700 ">
                Product Interested:
              </label>
              <input
                type="text"
                name="product"
                defaultValue="ACE CRM"
                readOnly
                className="text-sm font-bold py-1"
                aria-label="Product Interested"
              />
            </div>

            <div>
              <label htmlFor="queries" className="block text-sm font-medium text-gray-700">
                Queries:
              </label>
              <textarea
                id="queries"
                name="queries"
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
