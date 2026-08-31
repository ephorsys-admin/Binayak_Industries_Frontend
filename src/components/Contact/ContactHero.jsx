import React from 'react';
import BgHero from '../ui/BgHero';
import contactHeroImg from '../../assets/contact_hero_img.jpg';
import { Sparkles, Clock } from 'lucide-react';

const ContactHero = () => {
  return (
    <BgHero
      badgeText="Binayak Customer Care & Artisanal Support"
      badgeIcon={Sparkles}
      title="We'd Love to Hear From You"
      highlightText="Hear From You"
      subtitle="Have questions about our artisanal snacks, custom festive gift hampers, bulk wholesale orders, or your recent delivery? Our kitchen team is always here to assist."
      image={contactHeroImg}
      imageLayout="side"
      theme="navy"
      trustPoints={[
        { icon: Clock, text: 'Mon – Sat: 9:00 AM – 8:00 PM' },
        { icon: Sparkles, text: 'Avg Response Time: < 2 Hours' },
      ]}
    />
  );
};

export default ContactHero;
