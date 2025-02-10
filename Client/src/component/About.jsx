import React from "react";

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-gray-900 bg-opacity-90 shadow-lg rounded-xl p-10 max-w-3xl w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        <p>
          Welcome to <b>AppInsurance</b>, your trusted partner in securing a brighter future. At <b>AppInsurance</b>,
          we are dedicated to offering comprehensive, reliable, and affordable insurance solutions tailored to your unique needs.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Our Insurance Plans</h3>

        <p>
          <b>Life Insurance:</b> Plan for the future and ensure financial security for your family with our flexible life insurance policies.
        </p>

        <p>
          <b>Health Insurance:</b> Protect your well-being with health insurance plans that cover medical expenses, routine check-ups, and emergency care.
        </p>

        <p>
          <b>Vehicle Insurance:</b> Drive with confidence knowing our policies cover accidents, theft, and damage.
        </p>

        <p>
          <b>Home Insurance:</b> Safeguard your home and belongings from unforeseen events like natural disasters and theft.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Why Choose Us?</h3>

        <ul className="list-disc pl-6">
          <li><b>24/7 Customer Support</b>: Assistance is always available when you need it.</li>
          <li><b>Easy Claims Processing</b>: Quick and hassle-free claims management.</li>
          <li><b>Customized Coverage</b>: Tailored plans to suit your specific needs.</li>
          <li><b>Transparent Policies</b>: Simple, straightforward, and easy to understand.</li>
        </ul>

        <p className="mt-6">
          Join us today and experience the convenience and reliability of having a trusted insurance partner by your side.
        </p>
      </div>
    </div>
  );
};

export default About;
