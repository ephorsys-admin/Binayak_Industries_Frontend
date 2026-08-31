import { motion } from "framer-motion";
import about1 from "../../assets/about1.png";
import {
  ArrowUpRight,
  FileText,
  ShieldCheck,
  ShoppingBag,
  Truck,
  RefreshCcw,
  CreditCard,
  UserCheck,
  AlertCircle,
  Sparkles,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

const terms = [
  {
    icon: UserCheck,
    number: "01",
    title: "Using Our Website",
    content:
      "By using the Binayak website, you agree to use the website only for lawful purposes and in a way that does not affect the experience or rights of other customers.",
  },
  {
    icon: ShoppingBag,
    number: "02",
    title: "Products & Orders",
    content:
      "All products displayed on our website are subject to availability. Product images are shown for representation and the actual product may have slight variations in appearance, packaging or presentation.",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Pricing & Payment",
    content:
      "Product prices are displayed in Indian Rupees. Prices and offers may change from time to time. Orders are confirmed only after successful payment or confirmation through the available payment method.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Delivery",
    content:
      "We make every effort to deliver orders within the estimated delivery period. Delivery times may vary depending on location, availability, holidays, weather or circumstances beyond our control.",
  },
  {
    icon: RefreshCcw,
    number: "05",
    title: "Cancellation & Returns",
    content:
      "Because our products include fresh food, snacks and sweets, cancellation or return eligibility may depend on the condition of the product and the stage of order processing. Please contact our support team as soon as possible for assistance.",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Product Quality",
    content:
      "Binayak takes care to maintain product quality, freshness and appropriate packaging. Customers should check product information, ingredients and storage instructions before consuming any product.",
  },
  {
    icon: FileText,
    number: "07",
    title: "Content & Information",
    content:
      "The information, images, descriptions, logos and other content available on this website are provided for general information and may be updated whenever necessary.",
  },
  {
    icon: AlertCircle,
    number: "08",
    title: "Changes to These Terms",
    content:
      "Binayak Industries may update these terms from time to time. Any updated terms will become effective when published on this page. We encourage customers to review this page periodically.",
  },
];

const TermsAndCondition = () => {
  return (
    <main className="min-h-screen bg-[#F7F9FC]">

      {/* HERO */}
      <section className="bg-[#F7F9FC] px-4 py-8 sm:px-6 sm:py-10 lg:px-2 lg:py-7">
        <div className="relative mx-auto w-full max-w-[1225px] overflow-hidden rounded-[28px] border border-[#163B55] bg-[#07243d] shadow-[0_20px_55px_rgba(3,21,37,0.14)] lg:rounded-[30px]">

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-32 -top-32 h-[380px] w-[380px] rounded-full bg-[#0875B5]/15 blur-[110px]" />
            <div className="absolute -bottom-40 left-[38%] h-[360px] w-[360px] rounded-full bg-[#D9A441]/8 blur-[110px]" />
          </div>

          <div className="relative grid min-h-[330px] lg:grid-cols-[1fr_0.72fr]">

            {/* LEFT CONTENT */}
            <div className="relative z-10 flex flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:px-11 lg:py-3 xl:px-12">

              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-[#426177] bg-[#123650] px-3.5 py-2">
                <Sparkles size={13} className="text-[#FFC43D]" />
                <span className="text-[10px] font-bold tracking-wide text-[#FFC43D] sm:text-[11px]">
                  Binayak Customer Care & Artisanal Support
                </span>
              </div>

              <h1 className="max-w-[720px] font-serif text-[34px] font-bold leading-[1.08] tracking-[-1px] text-white sm:text-[44px] lg:text-[48px] xl:text-[52px]">
                We'd Love to <span className="text-[#F5C451]">Hear From You</span>
              </h1>

              <p className="mt-4 max-w-[700px] text-[13px] font-medium leading-6 text-[#B8C9D5] sm:text-[14px] sm:leading-7">
                Have questions about our artisanal snacks, custom festive gift
                hampers, bulk wholesale orders, or your recent delivery?
                Our kitchen team is always here to assist.
              </p>

              <div className="mt-5 flex flex-col gap-3 border-t border-[#31536A] pt-4 sm:flex-row sm:items-center sm:gap-7">

                <div className="flex items-center gap-2.5">
                  <Clock3 size={17} className="shrink-0 text-[#FFC43D]" />
                  <span className="text-[11px] font-semibold text-white sm:text-xs">
                    Mon – Sat: 9:00 AM – 8:00 PM
                  </span>
                </div>

                <div className="hidden h-6 w-px bg-[#31536A] sm:block" />

                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} className="shrink-0 text-[#12D6A0]" />
                  <span className="text-[11px] font-semibold text-white sm:text-xs">
                    Avg Response Time: &lt; 2 Hours
                  </span>
                </div>

              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="relative h-[230px] min-h-0 sm:h-[280px] lg:h-auto lg:min-h-full">

              <img
                src={about1}
                alt="Binayak kitchen and store"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Mobile blend */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#082A45] via-[#082A45]/25 to-transparent lg:hidden" />

              {/* Desktop blend */}
              <div className="absolute inset-0 hidden bg-gradient-to-r from-[#082A45] via-[#082A45]/65 to-transparent lg:block lg:w-[65%]" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#061F34]/35 via-transparent to-transparent" />

              <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-[#FFC43D]/10 blur-[40px]" />

            </div>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative bg-[#F7F9FC] px-4 py-12 sm:px-6 sm:py-16 lg:px-2 lg:py-0">

        <div className="mx-auto w-full max-w-[1225px]">

          {/* INTRO CARD */}
          <div
           className="relative mb-10 overflow-hidden rounded-[28px] border border-[#D9E2E8] bg-white p-7 shadow-[0_15px_45px_rgba(3,21,37,0.06)] sm:p-9 lg:p-10"
          >

            <div className="absolute left-0 top-0 h-full w-1 bg-[#F5C451]" />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-[900px]">

                <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#981b2e]">
                  Welcome to Binayak
                </p>

                <h2 className="mt-3 text-2xl font-extrabold text-[#061A2C] sm:text-3xl">
                  Simple terms for a better shopping experience.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#647989]">
                  These Terms and Conditions explain the general rules
                  applicable to your use of the Binayak Industries website
                  and purchase of our traditional snacks, namkeen, mixtures,
                  sweets and gifting products.
                </p>

              </div>

              <div className="hidden shrink-0 lg:flex">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#061A2C]">
                  <FileText size={28} className="text-[#F5C451]" />
                </div>
              </div>

            </div>

          </div>

          {/* TERMS GRID */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {terms.map((term, index) => {

              const Icon = term.icon;

              return (
                <motion.article
                  key={term.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-[26px] border border-[#D9E2E8] bg-white p-6 shadow-[0_10px_35px_rgba(3,21,37,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#981b2e] hover:shadow-[0_18px_45px_rgba(3,21,37,0.09)] sm:p-7"
                >

                  <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#0875B5]/5 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#DDE7ED] bg-[#F4F8FA] transition-all duration-300 group-hover:border-[#F5C451]/40 group-hover:bg-[#FFF8E4]">
                      <Icon size={21} className="text-[#981b2e] transition-colors duration-300 group-hover:text-[#0B5C86]" />
                    </div>

                    
                  </div>

                  <h3 className="relative mt-6 text-lg font-extrabold text-[#061A2C]">
                    {term.title}
                  </h3>

                  <div className="mt-4 h-px w-full bg-[#E7EDF1]" />

                  <p className="relative mt-4 text-[12px] leading-6 text-[#687D8D]">
                    {term.content}
                  </p>

                </motion.article>
              );
            })}

          </div>

          {/* CUSTOMER RESPONSIBILITY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0B304B] via-[#07243B] to-[#031525] p-7 shadow-[0_20px_55px_rgba(3,21,37,0.15)] sm:p-9 lg:p-10"
          >

            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>

                <div className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-[#F5C451]" />

                  <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#F5C451]">
                    A little reminder
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                  Shop with confidence.
                </h2>

                <p className="mt-3 max-w-[850px] text-sm leading-7 text-[#9DB6C6]">
                  We want your experience with Binayak to be as enjoyable as
                  the food itself. If you have questions about an order,
                  product, delivery or any of these terms, our support team
                  is here to help.
                </p>

              </div>

              <Link
                to="/contact"
                className="group flex w-fit items-center gap-3 rounded-full bg-[#F5C451] px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#031525] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFD875] hover:shadow-[0_12px_30px_rgba(245,196,81,0.2)]"
              >
                Contact Us

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#031525] text-[#F5C451] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </span>

              </Link>

            </div>

          </motion.div>

          {/* FOOT NOTE */}
          <div className="mt-8 flex flex-col gap-3 border-t border-[#DDE5EA] pt-6 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[10px] text-[#8193A0]">
              By using this website, you acknowledge that you have read and
              understood these terms.
            </p>

            <Link
              to="/"
              className="group flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[1.5px] text-[#0B4B70]"
            >
              Back to Home

              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default TermsAndCondition;