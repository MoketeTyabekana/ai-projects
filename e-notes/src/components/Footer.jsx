import { FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaTiktok, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer>
    <div className="bg-primary text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Text */}
        <div className="mb-4 md:mb-0">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} E-Notes. All rights reserved.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://github.com/MoketeTyabekana/" target='_blank' className="hover:text-gray-300 transition-colors">
            <FaGithub size={24} aria-label="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/mokete-elias-tyabekana-88a22a143/" target='_blank' className="hover:text-gray-300 transition-colors">
            <FaLinkedin size={24} aria-label="LinkedIn" />
          </a>
          <a href="https://web.facebook.com/kayno.Eli.mokete/" target='_blank' className="hover:text-gray-300 transition-colors">
            <FaFacebook size={24} aria-label="Facebook" />
          </a>
          <a href="https://x.com/mokete__" target='blank' className="hover:text-gray-300 transition-colors">
            <FaTwitter size={24} aria-label="X (Formerly Twitter)" />
          </a>
          <a href="https://www.tiktok.com/@elimokete?lang=en" target='_blank' className="hover:text-gray-300 transition-colors">
            <FaTiktok size={24} aria-label="TikTok" />
          </a>
          <a href="https://www.instagram.com/eli.mokete/" target='_blank' className="hover:text-gray-300 transition-colors">
            <FaInstagram size={24} aria-label="Instagram" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;