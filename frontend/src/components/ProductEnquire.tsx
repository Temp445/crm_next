"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MdOutlineMail, MdAddIcCall } from "react-icons/md";
import PhoneInput, {
  isValidPhoneNumber
} from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import { sendWhatsappMessage } from "../services/whatsapp/whatsappService";


const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const adminPhones = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').map((p) => p.trim()) || [];


type ProductEnquireProps = {
  onClose?: () => void;
};



export default function ProductEnquire({ onClose }: ProductEnquireProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string>("");

  const validateEmail = async (email: string): Promise<string> => {
    try {
      const response = await fetch('/api/proxy-validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) return 'Please enter a valid email address.';

      const result = await response.json();
      return result.isValid ? '' : 'Please enter a valid email address.';
    } catch (err) {
      console.error('Email validation error:', err);
      return 'Email validation service unavailable.';
    }
  };

  const handleEmailChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value.trim();
    setEmail(emailInput);
    const error = await validateEmail(emailInput);
    setEmailError(error);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formCurrent = form.current;
    if (!formCurrent) return;

    const emailValidationMessage = await validateEmail(email);
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      return;
    } else {
      setEmailError('');
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError('Please enter a valid phone number.');
      return;
    } else {
      setPhoneError('');
    }

    

    const formData = {
      name: (formCurrent['Name'] as HTMLInputElement)?.value || '',
      company: formCurrent['company']?.value || '',
      email,
      number: phone,
      location: formCurrent['location']?.value || '',
      queries: formCurrent['queries']?.value || '',
      product: formCurrent['product']?.value || '',
    };

    setLoading(true);

    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);
      alert('Your message has been sent successfully!');
      formCurrent.reset();
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('There was an issue sending your message. Please try again later.');
    } finally {
      setLoading(false);
    }

    const phoneWithoutPlus = phone.replace(/^\+/, '');
 
    try {
      await sendWhatsappMessage(
        'enquiry_ace_crm',
        {
          fullName: formData.name,
          companyName: formData.company,
          businessEmail: formData.email,
          mobileNumber: phoneWithoutPlus,
          location: formData.location,
          message: formData.queries,
        },
        adminPhones,
      );

      await sendWhatsappMessage(
        'customer_greetings',
        {
          fullName: formData.name,
          product: formData.product,
          siteUrl: 'https://acesoft.in',
          imageUrl:
            'https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg',
        },
        [phoneWithoutPlus],
      );
    } catch (error) {
      console.error('WhatsApp sending error:', error);
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

          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                id="name"
                name="Name"
                type="text"
                required
                placeholder="Enter your name *"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

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
              />
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
                   className=" !shadow-none  !bg-transparent rounded-md border border-gray-300 mt-1 p-2 [&>input]:border-none [&>input]:outline-none [&>input]:bg-transparent"
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
              />
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
                required
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
