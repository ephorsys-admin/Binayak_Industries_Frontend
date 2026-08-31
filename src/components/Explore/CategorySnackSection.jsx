import React from 'react';
import SnackCard from './SnackCard';

const CategorySnackSection = ({
  category,
  snacks,
  onIncrement,
  onDecrement,
  onAdd,
  onQuickView,
}) => {
  if (!snacks || snacks.length === 0) return null;

  const Icon = category.icon;

  return (
    <section id={`category-${category.id}`} className="space-y-4 pt-2">
      {/* Category Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200/80">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${category.bg} ${category.border} border flex items-center justify-center shrink-0 shadow-2xs`}>
              <Icon className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${category.iconColor}`} />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-brand tracking-tight">
                {category.name}
              </h2>
              <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                {snacks.length}
              </span>
            </div>
            {category.description && (
              <p className="text-xs text-stone-500 font-medium line-clamp-1 mt-0.5">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Snacks Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {snacks.map((snack) => (
          <SnackCard
            key={snack.id}
            snack={snack}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onAdd={onAdd}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySnackSection;
