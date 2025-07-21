import React from "react";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the best in service booking with our comprehensive platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl 
                       border border-gray-100 hover:border-blue-200 
                       transition-all duration-300 hover:-translate-y-2 text-center"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 
                            rounded-2xl flex items-center justify-center group-hover:from-blue-200 
                            group-hover:to-indigo-200 transition-all duration-300">
                <img 
                  className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" 
                  src={service.imageURL} 
                  alt={service.name} 
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 
                           transition-colors duration-200">
                {service.name}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Decorative Element */}
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 
                            rounded-full mx-auto opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
                           hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold 
                           transition-all duration-200 shadow-lg hover:shadow-xl 
                           transform hover:-translate-y-1">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
