import type { ReactNode } from "react";

import { SiteFooter } from "@/components/marketing/site-footer";

type Props = {
  children: ReactNode;
};

export default function MarketingLayout({
  children,
}: Props) {

  return (
    <>
      {children}

      <SiteFooter />
    </>
  );
}