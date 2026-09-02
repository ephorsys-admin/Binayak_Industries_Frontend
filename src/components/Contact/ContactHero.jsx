import React from 'react';
import BgHero from '../ui/BgHero';
import contactHeroImg from '../../assets/contact_hero_img.jpg';
import { Sparkles, Clock, MessageSquare } from 'lucide-react';

const ContactHero = () => {
  return (
    <BgHero
      badgeText="BINAYAK KITCHEN & SUPPORT"
      badgeIcon={Sparkles}
      title="We'd Love to Hear From You"
      highlightText="Hear From You"
      subtitle="Orders, bulk festive gifting, or delivery queries — our team is here to assist."
      image={contactHeroImg}
      imageLayout="background"
      theme="crimson"
      trustPoints={[
        { icon: Clock, text: 'Mon – Sat: 9 AM – 8 PM' },
        { icon: MessageSquare, text: 'Fast Support' },
      ]}
    />
  );
};

export default ContactHero;
