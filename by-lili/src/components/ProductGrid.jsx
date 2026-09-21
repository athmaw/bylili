import React from 'react';

export default function ProductGrid({ products }) {
  return (
    <section className="w-full px-4 py-8 md:px-8 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col cursor-pointer group">
              <div className="relative aspect-[3/4] overflow-hidden mb-2 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold text-[13px] md:text-sm text-black group-hover:text-[#d4a3b3] transition-colors leading-tight">
                {product.name}
              </h3>
              <p className="text-[13px] md:text-sm text-gray-800 mt-0.5">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}