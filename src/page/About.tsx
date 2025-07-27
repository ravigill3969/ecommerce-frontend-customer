import EcommerceNavbar from "@/components/Nav2";

function About() {
  return (
    <>
      <EcommerceNavbar />
      <div className="min-h-screen bg-white px-6 py-12 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Who We Are
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Crafting Simplicity Through Technology
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At [Your Company Name], we are passionate about building products
            that solve real-world problems. With a team of dedicated engineers,
            designers, and thinkers, we turn complex ideas into elegant
            solutions — fast, scalable, and user-first.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-indigo-700">
              Our Mission
            </h3>
            <p className="mt-4 text-gray-600">
              To empower businesses and individuals with intuitive digital
              products that simplify their lives.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-indigo-700">
              Our Vision
            </h3>
            <p className="mt-4 text-gray-600">
              To become a globally recognized name in innovation, driven by
              values and community.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-indigo-700">
              Our Values
            </h3>
            <p className="mt-4 text-gray-600">
              Integrity, curiosity, and the relentless pursuit of quality in
              everything we do.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-md text-gray-500">
            Want to join us?{" "}
            <a
              // href="/careers"
              className="text-indigo-600 hover:text-indigo-500 underline"
            >
              We're hiring
            </a>{" "}
            passionate minds.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
