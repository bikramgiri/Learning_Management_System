"use client";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCourses } from "@/store/admin/course/courseSlice";
import Link from "next/link";
import Image from "next/image";
import { fetchCategories } from "@/store/admin/category/categorySlice";
import Modal from "./model";

function CourseCard() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { courses } = useAppSelector((store) => store.courses);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courseId, setCourseId] = useState("");

  const openModal = useCallback((id: string) => {
    setIsModalOpen(true);
    setCourseId(id);
  }, []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // function to format date like wednesday, 22 march 2023
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filtredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // course._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // course.duration.toString().includes(searchTerm.toString()) ||
      course.price.toString().includes(searchTerm.toString()) ||
      //   course.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(course.createdAt.toString())
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil((filtredCourses?.length || 0) / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filtredCourses?.slice(indexOfFirstItem, indexOfLastItem) || [];

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      <section id="courses" className="bg-yellow-00 antialiased ">
        <div className="ml-2 mr-2 mx-auto max-w-screen-2xl px-4 2xl:px-0">
          {isModalOpen && <Modal closeModal={closeModal} courseId={courseId} />}
          <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4">
            <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none ">
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                  stroke="black"
                  strokeOpacity="0.2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                  stroke="black"
                  strokeOpacity="0.2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex justify-between">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                id="default-search"
                className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                placeholder="Search courses"
              />
            </div>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {currentItems.length > 0 ? (
              currentItems.map((course) => (
                  <div key={course._id} className="w-full rounded-md border border-gray-200 bg-white items-center justify-between p-6 shadow-sm dark:border-gray-700 dark:bg-gray-600">
                  <Link href={`/coursedetails/${course._id}`}>
                      <div className="relative flex h-40 w-60 items-center justify-center overflow-hidden rounded-md">
                        <Image
                          className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                          src="https://shorturl.at/coIW1"
                          width={300}
                          height={80}
                          alt="Course Image"
                        />
                      </div>
                    </Link>
                    <div className="mt-2">
                      <div className="flex justify-between">
                        <p className="text-2xl font-medium leading-tight text-gray-900 dark:text-white">
                        {course.title}
                      </p>
                      <button className="text-sm rounded-md p-2 bg-blue-700 dark:text-white">
                        {course?.category?.name}
                      </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className=" dark:bg-yellow-600 text-white text-sm font-semibold px-2.5 py-0.5 rounded">
                          ★ 4.5 (120)
                        </span>
                        {/* <span className="text-sm dark:text-white ml-2">
                          {" "}
                          0 reviews
                        </span> */}
                        {/* <span className="flex items-center gap-2">
                          <svg
                            className="h-6 w-6 text-gray-400 dark:text-gray-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeWidth="2"
                              d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                            />
                          </svg>
                          <p className="text-sm font-medium text-gray-500 dark:text-white">
                            Best Price
                          </p>
                        </span> */}
                         <p className="text-xl font-medium leading-tight text-gray-900 dark:text-white">
                          ${course.price}
                        </p>
                      </div>
                      <div className="flex mt-6 justify-between items-center">
                        <button className="cursor-pointer flex gap-2 rounded-md p-2 dark:text-white-400 bg-indigo-600 hover:bg-indigo-700 dark:hover:text-white">
                          <span className="dark:text-white text-sm"> Add to Wishlist </span>
                          <svg className="h-6 w-6 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                          </svg>
                        </button>
                        <button onClick={() => openModal(course?._id)} className="cursor-pointer flex rounded-md p-2 dark:text-white-400 bg-indigo-600 hover:bg-indigo-700 dark:hover:text-white">
                          <span className="dark:text-white text-sm"> Enroll </span>
                        </button>
                        {/* <p className="text-xl font-medium leading-tight text-gray-900 dark:text-white">
                          ${course.price}
                        </p> */}
                        {/* <span className="mr-60 text-sm font-medium text-gray-900 dark:text-white line-through">
                          $9,99
                        </span> */}
                        {/* <button onClick={() => addToCart(product)} type="button" className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium dark:text-white focus:outline-none dark:bg-yellow-600 dark:hover:bg-yellow-700">
                        <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                        </svg>
                        Add to cart
                      </button> */}
                      </div>
                    </div>
                  </div>
              ))
            ) : (
              <p className="text-center col-span-4">No courses available.</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {totalPages > 1 && (
            <nav aria-label="Pagination">
              <ul className="flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-white hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 cursor-pointer"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li key={page}>
                      <button
                        onClick={() => paginate(page)}
                        className={`cursor-pointer flex items-center justify-center w-10 h-10 ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "text-gray-500 hover:text-white hover:bg-gray-700"
                        } rounded-full transition-colors`}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}
                <li>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-white hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 cursor-pointer"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

export default CourseCard;
