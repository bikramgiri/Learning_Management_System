"use client";
import { PaymentMethod } from "@/database/models/payment.schema";
import { STATUSES } from "@/global/statuses";
import { enrollCourse } from "@/store/admin/enrollment/enrollmentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChangeEvent, useEffect, useState } from "react";

interface IModalProps {
  closeModal: () => void;
  courseId: string;
}

const Modal: React.FC<IModalProps> = ({ closeModal, courseId }) => {
  const dispatch = useAppDispatch();
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Khalti);
//   const { paymentMethod, setPaymentMethod } = useState<PaymentMethod>(PaymentMethod.Khalti);
  const { status, paymentUrl } = useAppSelector((store) => store.enrollments);
  const [error, setError] = useState<string | null>(null);

  const handlePaymentMethod = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    setPaymentMethod(e.target.value as PaymentMethod);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate Phone number format: 9800000000, 9800000001, 9867251092, 9800000003
    const whatsappRegex = /^[0-9]{10}$/;
    if (!whatsappRegex.test(whatsapp)) {
      setError("Invalid whatsapp number format");
      return;
    }

    dispatch(enrollCourse({ course: courseId, whatsapp, paymentMethod }));
  };

  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      closeModal();
      window.open(paymentUrl as string, '_blank');
      // dispatch(reSetStatus());
    } else if(status === STATUSES.ERROR) {
      setError("Failed to enroll. Please try again.");
    }
  }, [status, closeModal, dispatch, paymentUrl]);

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Enroll Now
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
              <div className="mt-2">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="course_price"
                >
                  Whatsapp Number*
                </label>
                <input
                  onChange={(e) => setWhatsapp(e.target.value)}
                  name="whatsapp"
                  // value ={whatsapp}
                  type="text"
                  id="course_whatsapp"
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="98XXXXXXX"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            {/* Select Method */}
            <div className="mt-2">
              <label
                htmlFor="course_category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Payment Method
              </label>
              <select
                onChange={handlePaymentMethod}
                name="paymentMethod"
                // value={paymentMethod}
                id="course_paymentMethod"
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                required
              >
                {/* <option value="" className="">
                  Select Payment Method
                </option> */}
                <option value={PaymentMethod.Khalti} className="cursor-pointer">
                  {PaymentMethod.Khalti}
                </option>
                <option value={PaymentMethod.Esewa} className="cursor-pointer">
                  {PaymentMethod.Esewa}
                </option>
              </select>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={closeModal}
                id="cancelButton"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                id="submitUrlButton"
                className="flex cursor-pointer items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
                type="submit"
              >
                {paymentMethod === PaymentMethod.Khalti
                  ? "Pay with Khalti"
                  : "Pay with Esewa"}
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
