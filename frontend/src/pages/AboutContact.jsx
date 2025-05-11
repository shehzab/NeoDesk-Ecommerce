import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const AboutContact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 z-0"></div>
        <div className="container mx-auto py-32 px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6">
              <span className="text-pink-500">Neo</span>
              <span className="text-blue-500">Desk</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Elevating your workspace with cutting-edge technology and ergonomic solutions
            </p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="container mx-auto py-24 px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-pink-500/30 to-blue-500/30 rounded-lg shadow-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-tr from-blue-500/20 to-pink-500/20 rounded-lg shadow-xl"></div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">About Us</span>
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Welcome to <span className="font-semibold text-pink-500">Neo</span><span className="font-semibold text-blue-500">Desk</span>, 
              your go-to destination for high-performance technology and workspace solutions.
              We specialize in providing top-quality laptops, computers, storage solutions, 
              and ergonomic furniture to enhance your productivity.
            </p>
            <p className="text-lg leading-relaxed">
              Our mission is to bring efficiency and comfort to your workspace with cutting-edge 
              tech and premium office essentials. At <span className="font-semibold text-pink-500">Neo</span><span className="font-semibold text-blue-500">Desk</span>, 
              we believe in quality, innovation, and customer satisfaction.
              Thank you for choosing us to power your digital world!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-gray-900 py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Contact Us</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-300">
              Have questions or need support? Our team is here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {/* Phone */}
            <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-pink-500/20 rounded-full mb-6">
                  <FaPhone className="text-2xl text-pink-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Call Us</h3>
                <p className="text-lg text-gray-300">+1 234 567 890</p>
                <p className="text-sm text-gray-400 mt-2">Monday-Friday, 9am-5pm PST</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-500/20 rounded-full mb-6">
                  <FaEnvelope className="text-2xl text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Email Us</h3>
                <p className="text-lg text-gray-300">support@neodesk.com</p>
                <p className="text-sm text-gray-400 mt-2">We respond within 24 hours</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-full mb-6">
                  <FaMapMarkerAlt className="text-2xl text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Visit Us</h3>
                <p className="text-lg text-gray-300">123 Tech Avenue</p>
                <p className="text-sm text-gray-400 mt-2">Silicon Valley, CA 94024</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6">Connect With Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-500/20 transition-colors">
                <FaTwitter className="text-xl text-gray-300 hover:text-blue-400" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600/20 transition-colors">
                <FaFacebook className="text-xl text-gray-300 hover:text-blue-500" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-pink-500/20 transition-colors">
                <FaInstagram className="text-xl text-gray-300 hover:text-pink-400" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-700/20 transition-colors">
                <FaLinkedin className="text-xl text-gray-300 hover:text-blue-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContact;