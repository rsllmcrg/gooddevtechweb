import type { TeamMember } from "@/content/about";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="gap-space-sm flex w-32 flex-col items-center text-center sm:w-36">
      <div className="bg-grey-100 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full sm:h-24 sm:w-24">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- placeholder path today, not an optimized asset yet
          <img
            src={member.photo}
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
        <p className="text-ink font-semibold">{member.name}</p>
        <p className="text-grey-500 text-small">{member.role}</p>
      </div>
    </div>
  );
}
