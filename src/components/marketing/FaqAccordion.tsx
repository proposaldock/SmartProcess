type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-[color:var(--border)]">
      {items.map((item) => (
        <details
          key={item.question}
          className="group border-b border-[color:var(--border)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
              {item.question}
            </h3>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5 shrink-0 text-[var(--muted)] transition-transform duration-200 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <p className="max-w-3xl pb-5 text-sm leading-7 text-[var(--muted)]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
