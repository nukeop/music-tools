import type { ComponentProps } from 'react';

export type ButtonVariant =
  | 'neutral'
  | 'primary'
  | 'accent'
  | 'positive'
  | 'negative'
  | 'ghost';

export type ButtonShape = 'rounded' | 'square';

export type ButtonProps = Omit<ComponentProps<'button'>, 'className'> & {
  variant: ButtonVariant;
  pressed?: boolean;
  shape?: ButtonShape;
  className?: string;
};

type VariantStyles = {
  idle: string;
  pressed: string;
};

const VARIANT_STYLES: Record<ButtonVariant, VariantStyles> = {
  neutral: {
    idle: 'bg-overlay text-overlay-fg hover:bg-overlay/70',
    pressed: 'bg-primary text-primary-fg',
  },
  primary: {
    idle: 'bg-primary/15 text-panel-fg hover:bg-primary/25',
    pressed: 'bg-primary text-primary-fg',
  },
  accent: {
    idle: 'bg-accent/15 text-panel-fg hover:bg-accent/25',
    pressed: 'bg-accent text-accent-fg',
  },
  positive: {
    idle: 'bg-positive/15 text-panel-fg hover:bg-positive/25',
    pressed: 'bg-positive text-positive-fg',
  },
  negative: {
    idle: 'bg-negative/15 text-panel-fg hover:bg-negative/25',
    pressed: 'bg-negative text-negative-fg',
  },
  ghost: {
    idle: 'hover:bg-overlay/40',
    pressed: 'bg-overlay/40',
  },
};

export function buttonVariantClassName(
  variant: ButtonVariant,
  pressed?: boolean,
): string {
  if (pressed) {
    return VARIANT_STYLES[variant].pressed;
  }
  return VARIANT_STYLES[variant].idle;
}

const BASE_CLASS_NAME =
  'inline-flex items-center justify-center font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40';

const SHAPE_CLASS_NAME: Record<ButtonShape, string> = {
  rounded: 'rounded-lg',
  square: '',
};

export function Button({
  variant,
  pressed,
  shape = 'rounded',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = [
    BASE_CLASS_NAME,
    SHAPE_CLASS_NAME[shape],
    buttonVariantClassName(variant, pressed),
    className,
  ].join(' ');

  return (
    <button {...props} type={type} aria-pressed={pressed} className={classes} />
  );
}
