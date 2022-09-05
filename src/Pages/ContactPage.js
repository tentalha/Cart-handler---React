import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function ContactPage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const form = useRef();

  const [shown, setShown] = useState(false);

  const handleOnChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    console.log("in send email");
    emailjs
      .sendForm(
        "service_2i6k4yk",
        "template_x6b0tmt",
        form.current,
        "3HM49h-U7YoYdUYE2"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const validate = () => {
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.message
    ) {
      return false;
    }
    return true;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    } else {
      setShown(true);
      sendEmail();
    }
    setTimeout(() => {
      setShown(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center my-5">
      {shown && (
        <h1 className="text-center text-green-600 text-lg font-dosis font-bold">
          Thanks for contacting us! We will get back to you as soon as possible.
        </h1>
      )}
      <form
        className="w-full max-w-lg relative"
        onSubmit={handleOnSubmit}
        ref={form}
      >
        {!validate() ? (
          <p className="text-red-600 absolute bottom-7 right-48 text-sm font-bold">
            All fields must be filled.
          </p>
        ) : null}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Talha"
              name="firstName"
              value={userData.firstName}
              onChange={handleOnChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Ahmad"
              name="lastName"
              value={userData.lastName}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              E-mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Message
            </label>
            <textarea
              className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
              id="message"
              name="message"
              value={userData.message}
              onChange={handleOnChange}
            ></textarea>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <button className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" disabled={!validate()}>
              Send
            </button>
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
