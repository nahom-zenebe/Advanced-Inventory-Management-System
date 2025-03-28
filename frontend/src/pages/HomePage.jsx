import React, { useState } from 'react';
import { FaArrowRightLong, FaPlus, FaMinus } from "react-icons/fa6";
import Navbar from '../Components/Navbar';
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom';

function HomePage() {
  const [arrowShow, setArrowShow] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleButtonHover = () => {
    setArrowShow(true);
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-indigo-900 overflow-hidden'>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        
        <div className="absolute inset-0 opacity-30 animate-gradient">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/40 to-purple-100/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100/40 to-teal-100/40"></div>
        </div>

        <div className="text-center max-w-2xl relative z-10 mt-10">
          <h1 className='text-lg text-indigo-600 mb-10 animate-pulse'>✧ Modern and Scalable</h1>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            Comprehensive Inventory Management Tools
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Experience the perfect blend of power and simplicity. Connect your data, teams, and customers with our AI-driven CRM platform that scales with your business.
          </p>

          <hr className='border-t border-indigo-200 mb-10' />

          <div className='grid grid-cols-3 gap-5'>
            <div className='bg-indigo-600 rounded-lg border border-indigo-700 w-56 justify-center hover:shadow-xl items-center flex flex-col h-56 transition-all duration-300'>
              <h1 className='text-indigo-50 text-xl font-medium'>Customer satisfaction</h1>
              <p className='text-white text-3xl font-bold'>70%</p>
            </div>
            <div className='bg-blue-600 rounded-lg border border-blue-700 w-56 justify-center hover:shadow-xl items-center flex flex-col h-56 transition-all duration-300'>
              <h1 className='text-blue-50 text-xl font-medium'>Management efficiency</h1>
              <p className='text-white text-3xl font-bold'>60%</p>
            </div>
            <div className='bg-violet-600 rounded-lg border border-violet-700 w-56 justify-center hover:shadow-xl items-center flex flex-col h-56 transition-all duration-300'>
              <h1 className='text-violet-50 text-xl font-medium'>Workload decrease</h1>
              <p className='text-white text-3xl font-bold'>50%</p>
            </div>
          </div>

          <hr className='border-t border-indigo-200 mt-10 mb-10' />
          
          <div className="max-w-2xl mt-24 mx-auto text-left mb-12">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Frequently Asked Questions</h2>
            {[
              { question: "What is this platform about?", answer: "Our platform provides AI-driven inventory management and CRM solutions designed to streamline business operations and enhance productivity." },
              { question: "Is there a free trial available?", answer: "Yes! We offer a 14-day free trial with full access to all features." },
              { question: "Can I integrate this with other tools?", answer: "Absolutely! Our platform supports integration with various third-party tools, including ERP systems and payment gateways." }
            ].map((faq, index) => (
              <div key={index} className="mb-4 border-b border-indigo-100 pb-4">
                <button className="flex items-center justify-between w-full text-lg font-semibold text-indigo-700 hover:text-indigo-900 transition-colors" onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  {openFAQ === index ? <FaMinus className="text-indigo-500" /> : <FaPlus className="text-indigo-500" />}
                </button>
                {openFAQ === index && <p className="text-gray-600 mt-2">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default HomePage;