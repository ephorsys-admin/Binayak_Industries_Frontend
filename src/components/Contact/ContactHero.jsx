import React from 'react';
import contactHeroImg from '../../assets/contact.webp';

const ContactHero = () => {
  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-sky-100/80 bg-gradient-to-r from-[#120a06] via-[#1f120c] to-[#140b07] transition-all duration-300 my-1 group">
      <img
        src={contactHeroImg}
        alt="Binayak Kitchen & Support - We'd Love to Hear From You"
        className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl block shadow-sm select-none transition-transform duration-700 group-hover:scale-[1.01]"
        loading="eager"
      />
    </div>
  );
};

export default ContactHero;
