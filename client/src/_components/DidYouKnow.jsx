import React from "react";
import { didYouKnow } from "@/lib/data";

export default function DidYouKnow() {
  return (
    <section>
      <div className="flex flex-col lg:flex-row items-start gap-4 lg:px-24 px-3 pb-16">
        <h1 className="text-4xl font-extrabold text-gray-700 w-full">
          DID YOU KNOW ?
        </h1>
        <div className="flex gap-4 items-start">
          <div className="h-[4rem] w-[6px] bg-[#409ffa]" />
          <p className="text-gray-500 text-md">
            Websites with a Lead Capture System are 100% more likely to Capture
            a Website Lead than those without one. That’s right. Plus, our stats
            are provable. Let us give you a demonstration.
          </p>
        </div>
      </div>

      <section className="flex flex-col md:flex-col gap-20 md:gap-0 px-0 xl:px-20">
        {didYouKnow.map((item, index) => (
          <div
            key={index}
            className="flex md:flex-row justify-start flex-col gap-0 lg:gap-8 pl-4 pr-2 xl:pl-0 xl:max-w-[90%] mx-auto px-0"
          >
            <img
              className={`max-h-[25rem] ${
                index === 1 && "md:order-1"
              } object-contain `}
              src={item.imageURL}
            />
            <div className="flex flex-col gap-2 md:gap-4 md:my-auto">
              <img className={` h-14 w-14 `} src={item.iconURL} />
              <h1 className="text-sm sm:text-lg font-bold text-gray-700">
                {item.name}
              </h1>
              <p
                className="text-gray-600 text-[14px] md:text-[15px]"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
