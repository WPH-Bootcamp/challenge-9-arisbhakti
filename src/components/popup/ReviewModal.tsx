import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";

type ReviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReviewModal({ open, onOpenChange }: ReviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-3xl sm:max-w-lg md:w-[439px] overflow-y-auto no-scrollbar"
      >
        <div className="flex flex-col md:gap-6 gap-4">
          <div className="flex flex-row justify-between items-center">
            <h1 className="md:text-2xl font-extrabold md:leading-9 text-xl leading-8.5">
              Give Review
            </h1>
            <DialogClose asChild>
              <IoIosClose className="w-8 h-8 cursor-pointer" />
            </DialogClose>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-extrabold text-base leading-7.5">
              Give Rating
            </h2>
            <div className="flex flex-row gap-[4.08px]">
              <FaStar className="text-[#FDB022] w-10 h-10 p-1" />
              <FaStar className="text-[#FDB022] w-10 h-10 p-1" />
              <FaStar className="text-[#FDB022] w-10 h-10 p-1" />
              <FaStar className="text-[#FDB022] w-10 h-10 p-1" />
              <FaStar className="text-neutral-400 w-10 h-10 p-1" />
            </div>
          </div>
          <textarea
            className="h-58.75 ring-1 ring-inset ring-neutral-300 rounded-2xl p-3 resize-none placeholder:text-neutral-400 text-sm leading-7 -tracking-[0.02em] "
            placeholder="Please share your thoughts about our service!"
          ></textarea>
          <button className="h-11 md:h-12 w-full  rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em] md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]">
            Send
          </button>
        </div>
        {/* <DialogHeader>
          <DialogTitle className="text-lg font-extrabold">
            Give Review
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-500">
            Tell us about your experience
          </DialogDescription>
        </DialogHeader>

        
        <div className="mt-6 flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="rounded-full">
              Cancel
            </Button>
          </DialogClose>

          <Button className="rounded-full bg-primary-100 text-white">
            Submit
          </Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
