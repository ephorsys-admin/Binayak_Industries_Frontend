import { Link } from "react-router-dom";
import logo from ".././assets/logo.png"
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "About Us", path: "/about" },
        { name: "Our Services", path: "/services" },
        { name: "Contact", path: "/contact" },
    ];

    const customerLinks = [
        { name: "FAQ", path: "/faq" },
        { name: "Shipping", path: "/shipping" },
        { name: "Terms & Conditions", path: "/terms" },
    ];

    return (
        <footer className="relative overflow-hidden bg-[#F7F9FC] px-3 pb-4 pt-10 sm:px-5 lg:px-8">
            <div className="relative mx-auto max-w-362.5 overflow-hidden rounded-[35px] bg-[#031525] text-white shadow-[0_25px_80px_rgba(3,21,37,0.28)] sm:rounded-[45px] lg:rounded-[55px]">


                <div className="pointer-events-none absolute -right-32 -top-40 h-125 w-125 rounded-full bg-[#0875B5]/20 blur-[100px]" />

                <div className="pointer-events-none absolute -bottom-40 -left-32 h-112.5 w-112.5 rounded-full bg-[#005A91]/20 blur-[100px]" />

                <div className="pointer-events-none absolute right-[25%] top-[30%] h-62.5 w-62.5 rounded-full bg-[#D9A441]/5 blur-[100px]" />

                <div className="pointer-events-none absolute -right-20 top-28 h-64 w-64 rounded-full border border-[#D9A441]/10" />
                <div className="pointer-events-none absolute -right-12 top-36 h-48 w-48 rounded-full border border-[#D9A441]/10" />
                <div className="pointer-events-none absolute -right-5 top-44 h-32 w-32 rounded-full border border-[#D9A441]/10" />

                <div className="absolute left-0 right-0 top-0 h-0.5 bg-linear-to-r from-transparent via-[#D9A441] to-transparent" />

            {/* top bar */}
                <div className="relative px-5 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12 lg:px-16 lg:pb-8 lg:pt-10">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                        <div className="relative z-10 max-w-2xl">

                            <div className="mb-4 inline-flex items-center gap-3">

                                <span className="h-px w-8 bg-[#D9A441]" />

                                <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#F5C451]">
                                    Stay Connected
                                </span>

                                <span className="h-px w-8 bg-[#D9A441]" />

                            </div>

                            <h2 className="max-w-xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-[38px]">
                                Stay connected with
                                <span className="ml-2 text-[#F5C451]">
                                    Binayak
                                </span>
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-6 text-[#AFC2D0] sm:text-[15px]">
                                Get the latest updates, exclusive offers, new products
                                and important announcements delivered straight to your inbox.
                            </p>

                        </div>


            

                    </div>
                </div>


                
                <div className="mx-5 h-px bg-linear-to-r from-transparent via-[#D9A441]/40 to-transparent sm:mx-10 lg:mx-16" />

               {/* middle bar */}
                <div className="relative px-5 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">

                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.25fr_1fr] lg:gap-10">

                      {/* about title */}
                        <div>

                            {/* Logo */}
                            <div className="mb-5 flex items-center">

                                <div className="relative">

                                    {/* Logo Glow */}
                                    <div className="absolute inset-0 rounded-full bg-[#0875B5]/20 blur-2xl" />

                                    <img
                                        src={logo}
                                        alt="Binayak"
                                        className="relative h-auto w-32 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                                    />

                                </div>

                            </div>


                            <p className="max-w-sm text-[13px] leading-6 text-[#AFC2D0]">
                                Bringing quality, trust and excellence together.
                                Discover our products and experience the Binayak
                                difference.
                            </p>


                            <div className="mt-7">

                                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[2px] text-[#718B9B]">
                                    Follow Us
                                </p>

                                <div className="flex gap-2">

                                    <a
                                        href="#"
                                        aria-label="Facebook"
                                        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-[#31536A] bg-[#09253A] text-[#C5D2DB] transition-all duration-300 hover:-translate-y-1 hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#061A2C]"
                                    >
                                        <FaFacebookF size={13} />
                                    </a>

                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-[#31536A] bg-[#09253A] text-[#C5D2DB] transition-all duration-300 hover:-translate-y-1 hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#061A2C]"
                                    >
                                        <FaInstagram size={14} />
                                    </a>

                                    
                                    <a
                                        href="#"
                                        aria-label="Twitter"
                                        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-[#31536A] bg-[#09253A] text-[#C5D2DB] transition-all duration-300 hover:-translate-y-1 hover:border-[#D9A441] hover:bg-[#D9A441] hover:text-[#061A2C]"
                                    >
                                        <FaXTwitter size={13} />
                                    </a>

                                </div>
                            </div>

                        </div>

                      {/* quick link */}
                        <div>

                            <div className="mb-6 flex items-center gap-3">

                                <div className="h-7 w-0.5 bg-[#D9A441]" />

                                <h3 className="text-xs font-bold uppercase tracking-[2px] text-white">
                                    Quick Links
                                </h3>

                            </div>

                            <div className="flex flex-col gap-3.5">

                                {quickLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="group flex w-fit items-center gap-2 text-[13px] text-[#9FB4C2] transition-all duration-300 hover:translate-x-1 hover:text-white"
                                    >
                                        <span className="h-px w-0 bg-[#D9A441] transition-all duration-300 group-hover:w-3" />

                                        {link.name}

                                    </Link>
                                ))}

                            </div>

                        </div>
                     
                     {/* Customer care */}
                        <div>

                            <div className="mb-6 flex items-center gap-3">

                                <div className="h-7 w-0.5 bg-[#D9A441]" />

                                <h3 className="text-xs font-bold uppercase tracking-[2px] text-white">
                                    Customer Care
                                </h3>

                            </div>

                            <div className="flex flex-col gap-3.5">

                                {customerLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="group flex w-fit items-center gap-2 text-[13px] text-[#9FB4C2] transition-all duration-300 hover:translate-x-1 hover:text-white"
                                    >
                                        <span className="h-px w-0 bg-[#D9A441] transition-all duration-300 group-hover:w-3" />

                                        {link.name}

                                    </Link>
                                ))}

                            </div>

                        </div>
                        
                        {/* contact us */}
                        <div>

                            <div className="mb-6 flex items-center gap-3">

                                <div className="h-7 w-0.5 bg-[#D9A441]" />

                                <h3 className="text-xs font-bold uppercase tracking-[2px] text-white">
                                    Contact Us
                                </h3>

                            </div>


                            <div className="space-y-3">

                                {/* Location */}
                                <div className="group flex gap-3 rounded-2xl border border-transparent p-2 transition-all duration-300 hover:border-[#31536A]/60 hover:bg-[#09253A]/50">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9A441]/10 text-[#D9A441]">
                                        <MapPin size={16} />
                                    </div>

                                    <div>
                                        <p className="mb-0.5 text-[10px] uppercase tracking-[1px] text-[#6F8797]">
                                            Address
                                        </p>

                                        <p className="text-[12px] leading-5 text-[#B8C9D4]">
                                            Bhubaneswar,
                                            <br />
                                            Odisha, India
                                        </p>
                                    </div>

                                </div>


                                {/* Phone */}
                                <div className="group flex gap-3 rounded-2xl border border-transparent p-2 transition-all duration-300 hover:border-[#31536A]/60 hover:bg-[#09253A]/50">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9A441]/10 text-[#D9A441]">
                                        <Phone size={16} />
                                    </div>

                                    <div>
                                        <p className="mb-0.5 text-[10px] uppercase tracking-[1px] text-[#6F8797]">
                                            Phone
                                        </p>

                                        <p className="text-[12px] text-[#B8C9D4]">
                                            +91 98765 43210
                                        </p>
                                    </div>

                                </div>


                                {/* Email */}
                                <div className="group flex gap-3 rounded-2xl border border-transparent p-2 transition-all duration-300 hover:border-[#31536A]/60 hover:bg-[#09253A]/50">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D9A441]/10 text-[#D9A441]">
                                        <Mail size={16} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="mb-0.5 text-[10px] uppercase tracking-[1px] text-[#6F8797]">
                                            Email
                                        </p>

                                        <p className="break-all text-[12px] text-[#B8C9D4]">
                                            hello@binayak.com
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                      {/* opening hour */}
                        <div>

                            <div className="mb-6 flex items-center gap-3">

                                <div className="h-7 w-0.5 bg-[#D9A441]" />

                                <h3 className="text-xs font-bold uppercase tracking-[2px] text-white">
                                    Opening Hours
                                </h3>

                            </div>


                            <div className="rounded-2xl border border-[#31536A]/60 bg-linear-to-br from-[#09253A] to-[#061D31] p-5">

                                <div className="mb-5 flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A441]/10 text-[#D9A441]">
                                        <Clock size={18} />
                                    </div>

                                    <div>
                                        <p className="text-[9px] uppercase tracking-[1.5px] text-[#6F8797]">
                                            We're Open
                                        </p>

                                        <p className="mt-0.5 text-xs font-semibold text-[#F5C451]">
                                            Visit Us Today
                                        </p>
                                    </div>

                                </div>


                                <div className="space-y-4">

                                    <div className="flex items-start justify-between gap-4 border-b border-[#31536A]/50 pb-3">

                                        <span className="text-[11px] text-[#8FA5B4]">
                                            Monday - Friday
                                        </span>

                                        <span className="text-right text-[11px] font-medium text-white">
                                            10:00 AM
                                            <br />
                                            09:00 PM
                                        </span>

                                    </div>


                                    <div className="flex items-start justify-between gap-4">

                                        <span className="text-[11px] text-[#8FA5B4]">
                                            Saturday - Sunday
                                        </span>

                                        <span className="text-right text-[11px] font-medium text-white">
                                            09:00 AM
                                            <br />
                                            12:00 AM
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>


               {/* Bottom bar */}
                <div className="relative mx-5 border-t border-[#31536A]/60 sm:mx-10 lg:mx-16">

                    <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">

                        <p className="text-[10px] tracking-wide text-[#687F8F]">
                            © 2026{" "}
                            <span className="text-[#A7B7C2]">
                                Binayak Industries
                            </span>
                            . All Rights Reserved.
                        </p>


                        <div className="flex items-center gap-5">

                            <Link
                                to="/privacy"
                                className="text-[10px] text-[#687F8F] transition hover:text-[#F5C451]"
                            >
                                Privacy
                            </Link>

                            <span className="h-3 w-px bg-[#31536A]" />

                            <Link
                                to="/terms"
                                className="text-[10px] text-[#687F8F] transition hover:text-[#F5C451]"
                            >
                                Terms
                            </Link>

                            <span className="h-3 w-px bg-[#31536A]" />

                            <Link
                                to="/contact"
                                className="text-[10px] text-[#687F8F] transition hover:text-[#F5C451]"
                            >
                                Contact
                            </Link>

                        </div>

                    </div>
                </div>


                <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[40%] -translate-x-1/2 bg-linear-to-r from-transparent via-[#D9A441]/60 to-transparent blur-[1px]" />

            </div>
        </footer>
    );
};

export default Footer;