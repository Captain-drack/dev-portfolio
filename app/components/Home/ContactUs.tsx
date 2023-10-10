"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";

interface FormData {
  name: string;
  contactNumber: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const initialFormData: FormData = {
    name: "",
    contactNumber: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !formData.name ||
      !formData.contactNumber ||
      !formData.email ||
      !formData.message
    ) {
      // Handle the case where any field is empty
      alert("Please fill in all fields");
      return;
    }

    // Use your Email.js template ID and user ID here
    emailjs
      .send(
        "service_4jlb1md",
        "template_6t6bw8f",
        formData as unknown as Record<string, unknown>,
        "5kAGP3nUKeJQKKCJh"
      )
      .then(
        (response) => {
          console.log("Email sent:", response);
          // Handle success, e.g., show a success message to the user.
          setShowSuccessMessage(true); // Set success message to true
          setFormData(initialFormData); // Clear the form data
        },
        (error) => {
          console.error("Error sending email:", error);
          // Handle error, e.g., show an error message to the user.
        }
      );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Determine if the "Send" button should be disabled
  const isSendButtonDisabled: boolean =
    !formData.name ||
    !formData.contactNumber ||
    !formData.email ||
    !formData.message;

  return (
    <div id="contact">
      <h3 className="tracking-[15px] text-center my-10 uppercase text-slate-400 text-xl md:text-3xl">
        Contact Me
      </h3>
      <div className="container mb-10 mx-auto md:px-6">
        <section className="mb-5 text-center">
          <div className="py-12 md:px-12">
            <div className="container mx-auto xl:px-32">
              <div className="grid items-center lg:grid-cols-2">
                <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                  <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[#17255470] dark:shadow-black/20 md:px-12 lg:-mr-14">
                    <h2 className="mb-12 text-3xl text-white uppercase">
                      Contact Me
                    </h2>
                    <form>
                      <div className="relative mb-6" data-te-input-wrapper-init>
                        <input
                          type="text"
                          name="name"
                          className="peer py-2 px-3 min-h-[auto] w-full rounded border-0 bg-white "
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative mb-6" data-te-input-wrapper-init>
                        <input
                          type="number"
                          name="contactNumber"
                          className="peer py-2 px-3 min-h-[auto] w-full rounded border-0 bg-white text-black"
                          placeholder="Contact Number"
                          value={formData.contactNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative mb-6" data-te-input-wrapper-init>
                        <input
                          type="email"
                          name="email"
                          className="peer py-2 px-3 min-h-[auto] w-full rounded border-0 bg-white "
                          placeholder="Email address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative mb-6" data-te-input-wrapper-init>
                        <textarea
                          name="message"
                          className="peer py-2 px-3 min-h-[auto] w-full rounded border-0 bg-white text-black"
                          rows={6}
                          placeholder="Your message"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className={`text-blue-950 font-bold shadow-lg shadow-blue-500/50 bg-white px-7 py-2 rounded-full mt-3 flex justify-center items-center w-full ${
                          isSendButtonDisabled ? "text-slate-400" : ""
                        }`}
                        disabled={isSendButtonDisabled}
                      >
                        {/* Send */}
                        {showSuccessMessage ? (
                          <div className="success-message ">
                            <p>Email sent successfully!</p>
                          </div>
                        ) : (
                          <div className="success-message ">
                            <p>send</p>
                          </div>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
                <div className="md:mb-5 lg:mb-0">
                  <div className="relative h-[700px] rounded-lg shadow-lg dark:shadow-black/20">
                    <iframe
                      src="https://maps.google.com/maps?q=Roorkee&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      className="absolute left-0 top-0 h-full w-full rounded-lg"
                      frameBorder={0}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactUs;