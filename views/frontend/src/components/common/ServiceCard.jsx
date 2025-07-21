import React from "react";

export default function ServiceCard({ image, title, description }) {
  return (
    <a
      className="group/card relative h-full overflow-hidden rounded-2xl p-px 
        before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 
        before:h-80 before:w-80 before:rounded-full before:bg-indigo-500/80 before:opacity-0 
        before:blur-3xl before:transition-opacity before:duration-500 
        after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 
        after:h-64 after:w-64 after:rounded-full after:bg-indigo-500 after:opacity-0 
        after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 
        group-hover:before:opacity-100"
      href="#0"
    >
      <div className="card-main relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 
        after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:to-gray-900/50"
      >
        {/* Image */}
        <img
          className="inline-flex"
          src={image}
          width={350}
          height={288}
          alt={title}
        />

        {/* Content */}
        <div className="p-6">
          <div className="mb-3">
            <span className="span-border btn-sm relative rounded-full /40 px-2.5 py-0.5 text-xs font-normal 
              before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] 
              before:border before:border-transparent 
              before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] 
              before:[mask-composite:exclude_!important] 
              before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:/60"
            >
              <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text ">
                {title}
              </span>
            </span>
          </div>
          <p className="text-indigo-200/65">{description}</p>
        </div>
      </div>
    </a>
  );
}