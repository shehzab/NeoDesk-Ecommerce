import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const faqs = [
    {
      question: "What is NeoDesk?",
      answer: "NeoDesk is your go-to fashion store for stylish and high-quality clothing.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email.",
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be unworn and in original packaging.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide! Shipping times may vary based on location.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-white mb-10">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white shadow-md rounded-lg overflow-hidden transition"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold hover:bg-gray-700"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 text-gray-300">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
