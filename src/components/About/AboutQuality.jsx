import {
  CheckCircle2,
  Leaf,
  PackageCheck,
  BadgeCheck,
} from "lucide-react";

const qualityPoints = [
  {
    icon: Leaf,
    title: "Carefully Selected Ingredients",
    text: "We believe great taste starts with choosing ingredients with care.",
  },
  {
    icon: PackageCheck,
    title: "Fresh & Carefully Packed",
    text: "Products are prepared and packed with attention to freshness and quality.",
  },
  {
    icon: BadgeCheck,
    title: "Consistent Quality",
    text: "We aim to deliver the same familiar taste and quality with every order.",
  },
];

const AboutQuality = () => {
  return (
    <section className="bg-[#F7F9FC] px-5 py-20 sm:px-10 lg:px-16">

      <div className="mx-auto grid max-w-300 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

        {/* Left */}
        <div>

          <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#B38328]">
            Our Promise
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#061A2C] sm:text-4xl">
            Quality you can
            <span className="text-[#B38328]"> taste.</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#637582]">
            From traditional namkeens to festive sweets, our focus remains
            on delivering products that customers can enjoy with confidence.
          </p>

          <div className="mt-7 flex items-center gap-3">

            <CheckCircle2
              size={19}
              className="text-[#B38328]"
            />

            <span className="text-sm font-semibold text-[#061A2C]">
              Tradition • Quality • Taste
            </span>

          </div>

        </div>


        {/* Right */}
        <div className="space-y-4">

          {qualityPoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex gap-5 rounded-[22px] border border-[#DCE3E8] bg-white p-5 shadow-[0_8px_30px_rgba(3,21,37,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D9A441]/50"
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#061A2C] text-[#F5C451] transition group-hover:bg-[#D9A441] group-hover:text-[#061A2C]">
                  <Icon size={20} />
                </div>

                <div>

                  <h3 className="text-sm font-bold text-[#061A2C]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#71828D]">
                    {item.text}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default AboutQuality;