import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

// Types
interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode; // Changed from JSX.Element
}

interface FooterLink {
  id: string;
  name: string;
  href: string;
}

interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

interface ContactInfo {
  id: string;
  type: "location" | "phone" | "email";
  icon: React.ReactNode; // Changed from JSX.Element
  text: string;
  href?: string;
}

interface FooterData {
  companyInfo: {
    name: string;
    description: string;
    socialLinks: SocialLink[];
  };
  sections: FooterSection[];
  contactInfo: ContactInfo[];
  bottomLinks: FooterLink[];
  copyright: string;
}

// Footer data
const footerData: FooterData = {
  companyInfo: {
    name: "Lighting Bike",
    description:
      "Experience the freedom of two wheels with our premium bike rental service.",
    socialLinks: [
      {
        id: "twitter",
        name: "Twitter",
        href: "#",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        ),
      },
      {
        id: "instagram",
        name: "Instagram",
        href: "#",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        ),
      },
      {
        id: "youtube",
        name: "YouTube",
        href: "#",
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        ),
      },
    ],
  },
  sections: [
    {
      id: "quickLinks",
      title: "Quick Links",
      links: [
        { id: "home", name: "Home", href: "#" },
        { id: "browse", name: "Browse Bikes", href: "#" },
        { id: "reviews", name: "Reviews", href: "#" },
        { id: "faqs", name: "FAQs", href: "#" },
        { id: "contact", name: "Contact", href: "#" },
      ],
    },
    {
      id: "services",
      title: "Our Services",
      links: [
        { id: "city", name: "City Bike Rentals", href: "#" },
        { id: "mountain", name: "Mountain Bike Rentals", href: "#" },
        { id: "scooter", name: "Scooter Rentals", href: "#" },
        { id: "family", name: "Family Bike Rentals", href: "#" },
        { id: "longterm", name: "Long Term Rentals", href: "#" },
      ],
    },
  ],
  contactInfo: [
    {
      id: "location",
      type: "location",
      icon: <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />,
      text: "United States",
    },
    {
      id: "phone",
      type: "phone",
      icon: <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />,
      text: "+1 987654320",
      href: "tel:+1987654320",
    },
    {
      id: "email",
      type: "email",
      icon: <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />,
      text: "info@bikerent.com",
      href: "mailto:info@bikerent.com",
    },
  ],
  bottomLinks: [
    { id: "terms", name: "Terms of Service", href: "/legal/terms/" },
    { id: "privacy", name: "Privacy Policy", href: "/legal/privacy/" },
    { id: "contact", name: "Email Us", href: "mailto:info@lightingbike.com" },
  ],
  copyright: "© 2025 Lighting Bike. All rights reserved.",
};

// Components
const SocialLink = ({ social }: { social: SocialLink }) => (
  <a
    href={social.href}
    className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
    aria-label={social.name}
  >
    {social.icon}
  </a>
);

const FooterSection = ({ section }: { section: FooterSection }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
    <ul className="space-y-2">
      {section.links.map((link) => (
        <li key={link.id}>
          <Link
            href={link.href}
            className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ContactItem = ({ contact }: { contact: ContactInfo }) => (
  <div className="flex items-center gap-3">
    {contact.icon}
    {contact.href ? (
      <a
        href={contact.href}
        className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
      >
        {contact.text}
      </a>
    ) : (
      <span className="text-gray-300 text-sm">{contact.text}</span>
    )}
  </div>
);

const BottomLink = ({ link }: { link: FooterLink }) => (
  <a
    href={link.href}
    className="text-gray-400 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1"
  >
    {link.name}
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </a>
);

// Main Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {footerData.companyInfo.name}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {footerData.companyInfo.description}
            </p>
            <div className="flex gap-3">
              {footerData.companyInfo.socialLinks.map((social) => (
                <SocialLink key={social.id} social={social} />
              ))}
            </div>
          </div>

          {footerData.sections.map((section) => (
            <FooterSection key={section.id} section={section} />
          ))}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              {footerData.contactInfo.map((contact) => (
                <ContactItem key={contact.id} contact={contact} />
              ))}
            </div>
          </div>
        </div> */}

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">{footerData.copyright}</p>
            <div className="flex gap-6">
              {footerData.bottomLinks.map((link) => (
                <BottomLink key={link.id} link={link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
