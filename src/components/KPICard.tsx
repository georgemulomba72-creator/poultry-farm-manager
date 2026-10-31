import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  positive?: boolean;
  warning?: boolean;
}

export function KPICard({ title, value, subtitle, icon, positive, warning }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </span>
        {icon && (
          <div
            className={cn(
              "p-1.5 rounded-md",
              warning
                ? "bg-amber-50 text-amber-600 dark:bg-amber-900/30"
                : positive
                ? "bg-green-50 text-green-600 dark:bg-green-900/30"
                : "bg-gray-100 text-gray-500 dark:bg-gray-800"
            )}
          >
            {icon}
          </div>
        )}
      </div>
      <div
        className={cn(
          "text-xl font-bold tracking-tight",
          warning && "text-amber-600",
          positive && "text-green-600"
        )}
      >
        {value}
      </div>
      {subtitle && (
        <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
      )}
    </div>
  );
}
