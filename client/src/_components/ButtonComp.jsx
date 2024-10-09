import { Button } from "@/components/ui/button";

export function ButtonDemo({ text, handler }) {
  return (
    <Button className="bg-[#ffffff] text-gray-800 hover:bg-[#2f3b5e] hover:text-white sm:text-sm text-[12px] ">
      {text}
    </Button>
  );
}
