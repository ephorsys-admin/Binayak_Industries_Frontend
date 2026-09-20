import React from 'react';
import { Carousel, TestimonialCard } from './retro-testimonial';

const testimonialData = {
  ids: [
    'e60aa346-f6da-11ed-b67e-0242ac120002',
    'e60aa346-f6da-11ed-b67e-0242ac120003',
    'e60aa346-f6da-11ed-b67e-0242ac120004',
    'e60aa346-f6da-11ed-b67e-0242ac120005',
    'e60aa346-f6da-11ed-b67e-0242ac120006',
    'e60aa346-f6da-11ed-b67e-0242ac120007',
  ],
  details: {
    'e60aa346-f6da-11ed-b67e-0242ac120002': {
      id: 'e60aa346-f6da-11ed-b67e-0242ac120002',
      description:
        "The component library has revolutionized our development workflow. The pre-built components are not only beautiful but also highly customizable. It's saved us countless hours of development time.",
      profileImage:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      name: 'Sarah Chen',
      designation: 'Senior Frontend Developer',
    },
    'e60aa346-f6da-11ed-b67e-0242ac120003': {
      id: 'e60aa346-f6da-11ed-b67e-0242ac120003',
      description:
        'As a startup founder, I needed a quick way to build a professional-looking product. This component library was exactly what I needed. The documentation is clear, and the components are production-ready.',
      profileImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      name: 'Michael Rodriguez',
      designation: 'Founder, TechStart',
    },
    'e60aa346-f6da-11ed-b67e-0242ac120004': {
      id: 'e60aa346-f6da-11ed-b67e-0242ac120004',
      description:
        'The attention to detail in these components is impressive. From accessibility features to responsive design, everything is well thought out. It has become an essential part of our tech stack.',
      profileImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      name: 'David Kim',
      designation: 'UI/UX Lead',
    },
    'e60aa346-f6da-11ed-b67e-0242ac120005': {
      id: 'e60aa346-f6da-11ed-b67e-0242ac120005',
      description:
        "What sets this component library apart is its flexibility. We've been able to maintain consistency across our applications while still customizing components to match our brand identity perfectly.",
      profileImage:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      name: 'Emily Thompson',
      designation: 'Product Designer',
    },
    'e60aa346-f6da-11ed-b67e-0242ac120006': {
      id: 'e60aa346-f6da-11ed-b67e-0242ac120006',
      description:
        "The performance optimization in these components is outstanding. We've seen significant improvements in our application's load times and overall user experience since implementing them.",
      profileImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      name: 'James Wilson',
      designation: 'Performance Engineer',
    },
    'e60aa346-f6da-11ed-b67e-0242ac120007': {
      id: 'e60aa346-f6da-11ed-b67e-0242ac120007',
      description:
        'The community support and regular updates make this component library a reliable choice for our projects. It is clear that the team behind it is committed to maintaining high quality and adding new features.',
      profileImage:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
      name: 'Sophia Martinez',
      designation: 'Full Stack Developer',
    },
  },
};

const cards = testimonialData.ids.map((cardId, index) => {
  const details = testimonialData.details;
  return (
    <TestimonialCard
      key={cardId}
      testimonial={details[cardId]}
      index={index}
      backgroundImage="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800"
    />
  );
});

export const DemoOne = () => {
  return (
    <div className="w-full">
      <section className="py-8 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <Carousel items={cards} autoScroll={true} autoScrollInterval={3500} />
        </div>
      </section>
    </div>
  );
};

export default DemoOne;
