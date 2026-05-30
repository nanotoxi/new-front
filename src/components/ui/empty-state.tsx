import {
  Inbox,
} from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-20 text-center">

      <Inbox className="mb-5 h-14 w-14 text-muted-foreground" />

      <h3 className="text-2xl font-black">

        {title}

      </h3>

      <p className="mt-3 max-w-md text-muted-foreground">

        {description}

      </p>

    </div>
  );
}