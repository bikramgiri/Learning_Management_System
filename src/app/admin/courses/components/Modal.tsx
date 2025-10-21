"use client";
import { STATUSES } from "@/global/statuses";
import { fetchCategories } from "@/store/category/categorySlice";
import { createCourse, reSetStatus } from "@/store/course/courseSlice";
import { ICourse } from "@/store/course/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { ICategory } from "@/store/category/types";

interface IModalProps {
  closeModal: () => void;
}

const Modal: React.FC<IModalProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((store) => store.categories);
  const { status } = useAppSelector((store) => store.courses);

  const [data, setData] = useState<ICourse>({
    title: "",
    featureImage: "",
    description: "",
    price: 0,
    duration: "",
    category: "",
  });

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  const createCourseHandle = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(createCourse(data));
  };
  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      setLoading(false);
      closeModal();
      dispatch(reSetStatus());
    }
  }, [status, closeModal, dispatch]);

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Course
          </h3>
          <button
            onClick={closeModal}
            id="closeModalButton"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="cursor-pointer h-5 w-5 inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <form onSubmit={createCourseHandle}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                onChange={handleChange}
                name="title"
                type="text"
                id="course_title"
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Next.js, AI"
                required
              />
            </div>
            <div className="flex justify-between gap-4">
              {/* Course Duration */}
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Duration
                </label>
                <input
                  onChange={handleChange}
                  name="duration"
                  type="text"
                  id="course_duration"
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="30 Days"
                  required
                />
              </div>
              {/* Course Price */}
              <div className="mt-2">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="course_price"
                >
                  Price
                </label>
                <input
                  onChange={handleChange}
                  name="price"
                  type="text"
                  id="course_price"
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Rs. 999"
                  required
                />
              </div>
            </div>
            {/* Select Category */}
            <div className="mt-2">
              <label
                htmlFor="course_category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Category
              </label>
              <select
                onChange={handleChange}
                name="category"
                id="course_category"
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                required
              >
                {categories.length > 0 ? (
                  categories.map((category) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })
                ) : (
                  <option id="no-category" value="" className="">
                    No categories available
                  </option>
                )}
              </select>
            </div>

            {/* // description */}
            <div className="mt-2">
              <label
                htmlFor="course_description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Course Description
              </label>
              <textarea
                onChange={handleChange}
                id="course_description"
                name="description"
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter description..."
                required
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={closeModal}
                disabled={loading}
                id="cancelButton"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                id="submitUrlButton"
                className="flex cursor-pointer items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                type="submit"
                disabled={loading}
              >
                {loading ? "Adding ..." : "Add"}
                <svg
                  className="h-4 w-4 inline-block ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
