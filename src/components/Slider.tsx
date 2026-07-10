import { Slider as RadixSlider } from "radix-ui";
import cn from "../lib/cn.ts";

export type SliderVariant = "default" | string;
export type SliderSize = "sm" | "md" | "lg";

export interface SliderProps extends RadixSlider.SliderProps {
  variant?: SliderVariant;
  size?: SliderSize;
}

const Slider = ({
  className,
  variant = "default",
  size = "md",
  ...rest
}: SliderProps) => {
  const thumbCount = (rest.value ?? rest.defaultValue ?? [0]).length;

  return (
    <RadixSlider.Root
      className={cn("another-slider", className)}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      <RadixSlider.Track className="another-slider-track">
        <RadixSlider.Range className="another-slider-range" />
      </RadixSlider.Track>
      {Array.from({ length: thumbCount }, (_, index) => (
        <RadixSlider.Thumb key={index} className="another-slider-thumb" />
      ))}
    </RadixSlider.Root>
  );
};

Slider.displayName = "Slider";

export default Slider;
