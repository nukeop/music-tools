import { Icon } from '@iconify/react/dist/offline';
import { Link } from '@tanstack/react-router';
import { buttonVariantClassName } from '../components/Button';
import { Tooltip } from '../components/Tooltip';
import { TOOLS } from '../tools/registry';

type ToolNavProps = {
  className?: string;
};

export function ToolNav({ className }: ToolNavProps) {
  return (
    <nav
      aria-label="Tools"
      className={`grid auto-cols-fr grid-flow-col gap-1 px-4 py-1 sm:flex sm:py-0 ${className ?? ''}`}
    >
      {TOOLS.map((tool) => (
        <Tooltip key={tool.path} label={tool.label}>
          <Link
            to={tool.path}
            aria-label={tool.label}
            activeOptions={{ exact: true }}
            className="flex flex-1 items-center justify-center rounded-lg p-2 transition-colors"
            activeProps={{ className: buttonVariantClassName('neutral', true) }}
            inactiveProps={{
              className: buttonVariantClassName('neutral', false),
            }}
          >
            <Icon icon={tool.icon} className="size-5" />
          </Link>
        </Tooltip>
      ))}
    </nav>
  );
}
