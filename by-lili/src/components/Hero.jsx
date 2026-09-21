import React from 'react';

export default function Hero() {
  return (
    <section className="relative w-full h-[250px] md:h-[450px] lg:h-[550px]">
      <img 
        src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
        alt="Fabric Rolls" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-sans tracking-wide font-medium drop-shadow-md">
          Shop Now
        </h1>
      </div>
    </section>
  );
}