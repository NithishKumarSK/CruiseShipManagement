import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div className="bg-gray-100 text-gray-800 py-12 px-6 lg:px-20">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <p className="text-lg leading-relaxed mb-8 text-center">
        We're here to help make your Celestia experience seamless and memorable. Whether you have questions, need assistance, or want to share feedback, our team is just a message or call away.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4"> Headquarters</h2>
          <p className="text-lg leading-relaxed">
            <strong>Celestia Cruise Operations HQ</strong>
            <br />
            123 Oceanview Avenue, Marina City, Coastal Region
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4"> Phone Numbers</h2>
          <p className="text-lg leading-relaxed">
            <strong>Customer Support:</strong> +91 (800) 555-CELE <br />
            <strong>Corporate Office:</strong> +91 (800) 555-1234
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4"> Email</h2>
          <p className="text-lg leading-relaxed">
            <strong>Support:</strong> <Link to="#" className="text-blue-600 hover:underline">support@celestia.com</Link> <br />
            <strong>General Inquiries:</strong> <Link to="#" className="text-blue-600 hover:underline">info@celestia.com</Link>
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">🌐 Follow Us</h2>
          <ul className="flex flex-col gap-2">
           
            <li><Link to="#" className="text-blue-600 hover:underline">Instagram: @celestia_cruises</Link></li>
            <li><Link to="#" className="text-blue-600 hover:underline">Twitter: @CelestiaCruise</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
