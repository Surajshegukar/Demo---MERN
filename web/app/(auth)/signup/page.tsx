export const metadata = {
  title: "Sign Up - Open PRO",
  description: "Page description",
};

import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-15">


          <div className="card-log mx-auto max-w-[400px]">
            <form >
              <div className="space-y-5">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/logo.png" 
                    alt="Logo"
                    width={150}
                    height={150}
                  />
                </div>

                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="name"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input w-full"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="name"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="form-input w-full"
                    placeholder="Your company name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="email"
                  >
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full"
                    placeholder="Your work email"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-indigo-200/65"
                    htmlFor="password"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full"
                    placeholder="Password (at least 10 characters)"
                  />
                </div>
              </div>
              <div className="mt-6 ">
                <button className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]">
                  Register
                </button>
                <div className="mt-6 text-center text-sm text-indigo-200/65">
                  Already have an account?{" "}
                  <Link className="font-medium text-indigo-500 c-yellow" href="/signin">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
