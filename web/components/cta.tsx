import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";
import { Phone, Mail, MessageCircle, Smartphone } from "lucide-react";


export default function Cta() {
  return (
<section className="relative overflow-hidden bg-gray-100 py-12 md:py-20">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-semibold text-indigo-600">Need Help? We're Here!</h2>
      <p className="text-indigo-40 mt-2">Connect with our support team any way you like.</p>
    </div>         

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center text-indigo-700">
      {/* Phone Support */}
      <div>
        <Phone className="icon h-10 w-10 mx-auto mb-2 text-[#404040]" />
        <h3 className="font-medium">Phone Support</h3>
        <p className="font-bold">(+91) 8087279032</p>
      </div>

      {/* Email Support */}
      <div>
        <Mail className=" icon h-10 w-10 mx-auto mb-2 text-[#404040]" />
        <h3 className="font-medium">Email Us</h3>
        <p className="font-bold">info@quickensol.com</p>
      </div>

      {/* WhatsApp Support */}
      <div>
        <Smartphone className=" icon h-10 w-10 mx-auto mb-2 text-[#404040]" />
        <h3 className="font-medium">WhatsApp Support</h3>
        <a
          href="https://wa.me/918087279032"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          Click to Message
        </a>
      </div>

      {/* Live Chat */}
      <div>
        <MessageCircle className=" icon h-10 w-10 mx-auto mb-2 text-[#404040]" />
        <h3 className="font-medium">Live Chat</h3>
        <a
          href="#livechat" // Update with actual link
          className="font-bold underline"
        >
          Click to Live Chat
        </a>
      </div>
    </div>
  </div>
</section>


  );
}
