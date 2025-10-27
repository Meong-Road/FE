import { cva, VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "flex h-8 items-center gap-1 rounded-full px-3 text-sm font-semibold [&_svg]:size-6",
  {
    variants: {
      variant: {
        primary: "text-primary fill-primary stroke-primary",
        gray: "text-[#737373] fill-[#737373] stroke-[#737373]",
      },
      outline: {
        true: "border",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        outline: true,
        class: "border-primary",
      },
      {
        variant: "gray",
        outline: true,
        class: "border-[#EAEAEA]",
      },
      {
        variant: "primary",
        outline: false,
        class: "bg-secondary",
      },
      {
        variant: "gray",
        outline: false,
        class: "bg-[#EAEAEA]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      outline: false,
    },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export default function Badge({ children, variant, outline }: BadgeProps) {
  return <div className={badgeVariants({ variant, outline })}>{children}</div>;
}
