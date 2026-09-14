function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold">
          MyBrand
        </div>

        <div className="hidden gap-8 md:flex">
          <a href="#features" className="hover:text-blue-600">
            Features
          </a>

          <a href="#pricing" className="hover:text-blue-600">
            Pricing
          </a>

          <a href="#about" className="hover:text-blue-600">
            About
          </a>
        </div>

        <button className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800">
          Get Started
        </button>
      </nav>


      {/* Hero */}
      <section className="px-8 py-24 text-center">
        <div className="mx-auto max-w-4xl">

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Build something
            <span className="text-blue-600"> amazing.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            A simple and powerful platform to help you build,
            launch, and grow your next great idea.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <button className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800">
              Get Started
            </button>

            <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100">
              Learn More
            </button>

          </div>

        </div>
      </section>


      {/* Features */}
      <section id="features" className="bg-gray-50 px-8 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Everything you need
            </h2>

            <p className="mt-4 text-gray-600">
              Simple tools designed to help you move faster.
            </p>
          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Feature 1 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-4 text-3xl">
                ⚡
              </div>

              <h3 className="text-xl font-semibold">
                Fast
              </h3>

              <p className="mt-3 text-gray-600">
                Build and launch your projects quickly
                without unnecessary complexity.
              </p>

            </div>


            {/* Feature 2 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-4 text-3xl">
                🔒
              </div>

              <h3 className="text-xl font-semibold">
                Secure
              </h3>

              <p className="mt-3 text-gray-600">
                Keep your data safe with modern
                security practices.
              </p>

            </div>


            {/* Feature 3 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-4 text-3xl">
                🚀
              </div>

              <h3 className="text-xl font-semibold">
                Powerful
              </h3>

              <p className="mt-3 text-gray-600">
                Everything you need to turn your idea
                into a real product.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section id="about" className="px-8 py-24 text-center">

        <div className="mx-auto max-w-3xl">

          <h2 className="text-4xl font-bold">
            Ready to get started?
          </h2>

          <p className="mt-4 text-gray-600">
            Start building your next project today.
          </p>

          <button className="mt-8 rounded-lg bg-blue-600 px-7 py-3 font-medium text-white hover:bg-blue-700">
            Start Building
          </button>

        </div>

      </section>


      {/* Footer */}
      <footer className="border-t px-8 py-8">

        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 md:flex-row">

          <p className="text-gray-500">
            © 2026 MyBrand. All rights reserved.
          </p>

          <div className="flex gap-6 text-gray-500">
            <a href="#" className="hover:text-black">
              Privacy
            </a>

            <a href="#" className="hover:text-black">
              Terms
            </a>
          </div>

        </div>

      </footer>

    </div>
  );
}

export default App; 