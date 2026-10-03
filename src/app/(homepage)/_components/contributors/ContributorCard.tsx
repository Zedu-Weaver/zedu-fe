import type { Contributor } from "~/data/zedu-weaver-contributors";

export const ContributorCard = ({ fullName, username }: Contributor) => (
  <li className="flex min-h-[68px] items-center justify-between gap-4 rounded-lg border border-[#e5dff1] bg-white p-[18px] sm:min-h-[86px] sm:px-4 sm:py-5 md:gap-6 md:px-[18px] md:py-6">
    <span className="min-w-0 break-words text-base font-medium leading-[1.4]">
      {fullName}
    </span>
    <span className="min-w-0 break-words text-right text-sm leading-[1.4] text-[#713bf3]">
      {username}
    </span>
  </li>
);
