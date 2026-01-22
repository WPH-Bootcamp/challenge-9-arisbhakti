import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const FilterLeftMenu = () => {
  return (
    <div className="flex flex-col pt-4 gap-3">
      <div className="flex flex-col gap-2.5">
        <h1 className="text-md font-bold leading-7.5 -tracking-[0.02em]">
          FILTER
        </h1>
        <h1 className="text-md font-extrabold leading-7.5 ">Distance</h1>

        {/* Distance */}
        <div className="flex flex-col gap-2.5 text-neutral-950">
          {["Nearby", "Within 1 km", "Within 3 km", "Within 5 km"].map(
            (label, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <Checkbox />
                <span className="text-sm leading-7 -tracking-[0.02em]">
                  {label}
                </span>
              </label>
            ),
          )}
        </div>
      </div>

      <hr />

      {/* Price */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-extrabold text-md leading-7.5">Price</h3>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 border rounded-xl px-2 py-2 h-12">
            <div className="bg-neutral-200 w-9.5 h-9.5 rounded-lg flex items-center justify-center  px-2 py-2 font-semibold leading-7 -tracking-[0.02em]">
              Rp
            </div>
            <Input
              placeholder="Minimum Price"
              className="border-0 focus-visible:ring-0 pl-0 placeholder:text-neutral-500"
            />
          </div>

          <div className="flex items-center gap-2 border rounded-xl px-2 py-2 h-12">
            <div className="bg-neutral-200 w-9.5 h-9.5 rounded-lg flex items-center justify-center  px-2 py-2 font-semibold leading-7 -tracking-[0.02em]">
              Rp
            </div>
            <Input
              placeholder="Maximum Price"
              className="border-0 focus-visible:ring-0 pl-0 placeholder:text-neutral-500"
            />
          </div>
        </div>
      </div>
      <hr />
      {/* Rating */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-extrabold text-md leading-7.5 ">Rating</h3>

        {[5, 4, 3, 2, 1].map((rate) => (
          <label
            key={rate}
            className="flex items-center gap-2 cursor-pointer px-1 py-1"
          >
            <Checkbox />
            <div className="flex items-center gap-1">
              <img
                src="/images/common/star.svg"
                className="w-6 h-6"
                alt="star"
              />
              <span className="text-sm leading-7 -tracking-[0.02em] ">
                {rate}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterLeftMenu;
