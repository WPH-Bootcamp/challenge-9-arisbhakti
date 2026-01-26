import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { IoIosClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  useCreateReviewMutation,
  useMyReviewsQuery,
  useUpdateReviewMutation,
} from "@/services/reviewModalService";
import { type ReviewModalProps, type ReviewsResponse } from "@/model/model";

export default function ReviewModal({
  open,
  onOpenChange,
  order,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data } = useMyReviewsQuery<ReviewsResponse>(open);

  const reviewMap = useMemo(() => {
    const reviews = data?.data?.reviews ?? [];
    return new Map(reviews.map((review) => [review.transactionId, review]));
  }, [data]);

  useEffect(() => {
    if (!open || !order) return;
    const existing = reviewMap.get(order.transactionId);
    if (existing) {
      setRating(existing.star);
      setComment(existing.comment);
    } else {
      setRating(0);
      setComment("");
    }
  }, [open, order, reviewMap]);

  const createMutation = useCreateReviewMutation({
    onSuccess: () => {
      toast("Review berhasil dikirim");
      onOpenChange(false);
    },
  });

  const updateMutation = useUpdateReviewMutation({
    onSuccess: () => {
      toast("Review berhasil diperbarui");
      onOpenChange(false);
    },
  });

  const handleSubmit = () => {
    if (!order) return;
    if (rating === 0) {
      toast("Silakan pilih rating terlebih dahulu");
      return;
    } else if (comment.trim() === "") {
      toast("Silakan isi komentar terlebih dahulu");
      return;
    }
    const existing = reviewMap.get(order.transactionId);
    if (existing) {
      updateMutation.mutate({
        reviewId: existing.id,
        star: rating,
        comment,
      });
    } else {
      const restaurant = order.restaurants[0]?.restaurant;
      const menuIds = order.restaurants.flatMap((group) =>
        group.items.map((item) => item.menuId),
      );
      createMutation.mutate({
        transactionId: order.transactionId,
        restaurantId: restaurant?.id ?? 0,
        star: rating,
        comment,
        menuIds,
      });
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="rounded-3xl sm:max-w-lg md:w-109.75 overflow-y-auto no-scrollbar"
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
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className={`w-10 h-10 p-1 cursor-pointer ${
                    (hoverRating || rating) >= star
                      ? "text-[#FDB022]"
                      : "text-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>
          <textarea
            className="h-58.75 ring-1 ring-inset ring-neutral-300 rounded-2xl p-3 resize-none placeholder:text-neutral-400 text-sm leading-7 -tracking-[0.02em] "
            placeholder="Please share your thoughts about our service!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {/* <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-11 md:h-12 w-full rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em] md:text-[16px] md:leading-7.5 md:-tracking-[0.02em] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button> */}
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="
    h-11 md:h-12 w-full rounded-[100px]
    bg-primary-100 text-white font-bold
    text-[14px] leading-7 -tracking-[0.02em]
    md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]
    cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
  "
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
