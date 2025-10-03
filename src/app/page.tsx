import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
          <div className="mr-20 sm:text-center lg:text-left">
            <h1 className="tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-4xl">
              <span className="block xl:inline">Explore courses, master skills</span>
              <span className="block text-indigo-600 xl:inline"> shape your future with us</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white dark:bg-gray-700 hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                  <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md dark:text-white bg-indigo-500 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
            <Image
              className="h-60 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              // src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
              src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
              alt="A beautiful landscape"
              width={9525} // Half of 2850 (original width) or adjust based on your needs
              height={8850} // Adjust based on the aspect ratio or container size
            />
          </div>
        </div>
      </section>
    </>
  );
}