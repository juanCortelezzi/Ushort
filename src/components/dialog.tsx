// import type { Dispatch, SetStateAction } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/outline";
import { trpc } from "@/utils/trpc";

type Props = {
  title: string;
  desc: string;
  confirmText: string;
  abortText: string;
  urlId: number;
};

export default function TrashModal({
  title,
  desc,
  confirmText,
  abortText,
  urlId,
}: Props) {
  const trpcContext = trpc.useContext();
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function abortModal() {
    setIsOpen(false);
  }

  const mutation = trpc.useMutation("removeUrl", {
    onSuccess(data) {
      trpcContext.invalidateQueries("urls");

      const previousUrls = trpcContext.getQueryData(["urls"]) || [];
      trpcContext.setQueryData(
        ["urls"],
        previousUrls.filter((short) => short.id !== data.id)
      );
      abortModal();
    },
  });

  function confirmModal() {
    mutation.mutate(urlId);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="btn btn-outline btn-error w-14 h-14"
      >
        <TrashIcon />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={abortModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all prose">
                  <Dialog.Title as="h3">{title}</Dialog.Title>
                  <div className="mt-2">
                    <p>{desc}</p>
                  </div>

                  <div className="mt-4 space-x-4 grid grid-cols-2">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={abortModal}
                    >
                      {abortText}
                    </button>
                    <button
                      type="button"
                      className="btn btn-error"
                      onClick={confirmModal}
                    >
                      {confirmText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
