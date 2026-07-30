import type { Founder } from "@/content/about";

export function FounderCard({ founder }: { founder: Founder }) {
  return (
    <div className="gap-space-md flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
      <div className="bg-grey-100 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-24 sm:w-24">
        {founder.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- placeholder path today, not an optimized asset yet
          <img
            src={founder.photo}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="text-grey-300 h-10 w-10"
          >
            <path
              fill="currentColor"
              d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5Z"
            />
          </svg>
        )}
      </div>
      <div>
        <p className="text-ink font-semibold">{founder.name}</p>
        <p className="text-grey-500 text-small">{founder.role}</p>
        <p className="text-grey-700 text-small mt-space-xs max-w-prose">
          {founder.bio}
        </p>
      </div>
    </div>
  );
}
