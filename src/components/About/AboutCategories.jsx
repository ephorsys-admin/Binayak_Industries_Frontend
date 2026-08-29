import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import about2 from "../../assets/about2.png"
import about3 from "../../assets/about3.png"
import about4 from "../../assets/about4.png"

const categories = [
  {
    number: "01",
    title: "Namkeen & Sev",
    description:
      "Classic savoury favourites including sev, bhujia and crunchy namkeen.",
    image: about2,
  },
  {
    number: "02",
    title: "Snack Mixes",
    description:
      "Delicious sweet and savoury mixtures perfect for everyday snacking.",
    image: about3,
  },
  {
    number: "03",
    title: "Traditional Sweets",
    description:
      "Indian sweets and ladoos made for celebrations, gifting and special moments.",
    image:about4,
  },
];

const AboutCategories = () => {
  return (
    <section className="bg-white px-5 py-10 sm:px-10 lg:px-16">

      <div className="mx-auto max-w-300">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#B38328]">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#061A2C] sm:text-4xl">
              Flavours for every
              <span className="text-[#B38328]"> occasion.</span>
            </h2>

          </div>

          <Link
            to="/products"
            className="group flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#061A2C]"
          >
            Explore All Products

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#061A2C] text-white transition-all group-hover:bg-[#D9A441] group-hover:text-[#061A2C]">
              <ArrowUpRight size={14} />
            </span>
          </Link>

        </div>


        {/* Categories */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">

          {categories.map((category) => (
            <Link
              to="/products"
              key={category.title}
              className="group relative overflow-hidden rounded-[28px] bg-[#061A2C]"
            >

              <img
                src={category.image}
                alt={category.title}
                className="h-87.5 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#031525] via-[#031525]/30 to-transparent" />

              <div className="absolute left-6 right-6 top-6 flex justify-between">

                <span className="text-[10px] font-bold tracking-[2px] text-[#F5C451]">
                  {category.number}
                </span>

                <ArrowUpRight
                  size={18}
                  className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </div>

              <div className="absolute bottom-6 left-6 right-6">

                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#C0CED7]">
                  {category.description}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
};

export default AboutCategories;