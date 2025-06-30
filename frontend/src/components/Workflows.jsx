import ServicesList from "./ServiceList";
import Spotlight from "./spotlight";




export default function Workflows() {
  return (
    <section className=" bg-gray-100 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div >
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Our Services
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              What we offer?
            </h2>
            <p className="text-lg text-indigo-200/65">
              We are committed to delivering exceptional digital experiences, offering tailored solutions, seamless user interfaces, and scalable technologies that help your business grow with confidence.
            </p>
          </div>

          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            <ServicesList />
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
