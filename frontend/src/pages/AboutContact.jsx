import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const AboutContact = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* About Us Section */}
      <div className="container mx-auto py-16 px-6 text-center">
        <h1 className="text-5xl font-bold text-pink-600">About Us</h1>
        <p className="mt-6 text-lg max-w-3xl mx-auto">
          Welcome to <span className="font-semibold text-pink-500">Neo</span>
          <span className="font-semibold text-blue-500">Desk</span>, your go-to destination for high-performance technology and workspace solutions.
          We specialize in providing top-quality laptops, computers, storage solutions, and ergonomic furniture to enhance your productivity.
        </p>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Our mission is to bring efficiency and comfort to your workspace with cutting-edge tech and premium office essentials.
          At <span className="font-semibold text-pink-500">Neo</span>
          <span className="font-semibold text-blue-500">Desk</span>, we believe in quality, innovation, and customer satisfaction.
          Thank you for choosing us to power your digital world!
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="bg-black py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-400">Contact Us</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-300">
          Have questions or need support? Get in touch with us!
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Phone */}
          <div className="flex flex-col items-center">
            <FaPhone className="text-4xl text-pink-500" />
            <h3 className="mt-4 text-xl font-semibold">Call Us</h3>
            <p className="mt-2 text-lg text-gray-300">+1 234 567 890</p>
          </div>
          
          {/* Email */}
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-4xl text-blue-500" />
            <h3 className="mt-4 text-xl font-semibold">Email Us</h3>
            <p className="mt-2 text-lg text-gray-300">support@neodesk.com</p>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-4xl text-green-500" />
            <h3 className="mt-4 text-xl font-semibold">Visit Us</h3>
            <p className="mt-2 text-lg text-gray-300">123 Tech Avenue, Silicon Valley, CA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContact;
