"use client";
// import { createCategory, resetStatus } from "@/store/category/categorySlice"
// import { Status } from "@/store/category/types"
// import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ChangeEvent, useState } from "react";

interface IModalProps {
  closeModal: () => void;
}

const Modal: React.FC<IModalProps> = ({ closeModal }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  // const dispatch = useAppDispatch()
  // const {status} = useAppSelector((store)=>store.categories)

  // const handleSubmit = async (e:ChangeEvent<HTMLFormElement>)=>{
  //   e.preventDefault()
  //   setLoading(true)
  //   dispatch(createCategory({name,description}))
  // }
  // useEffect(()=>{
  //   if(status === Status.Success){
  //     setLoading(false)
  //     closeModal();
  //     dispatch(resetStatus())
  //   }
  // },[status])

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      if (response.ok) {
        console.log("Category created successfully");
      }
      closeModal();
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Category
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
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="category_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Category Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="category_name"
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="AI, Frontend,..."
                required
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="category_description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Category Description
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                id="category_description"
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter description..."
                required
              />
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
                {loading ? "Adding ..." : "Add Category"}
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
