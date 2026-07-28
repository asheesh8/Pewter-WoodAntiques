import { createContext, useContext, useState, type ReactNode } from "react";
import type { Item } from "../data/inventory";

export type InquiryKind = "inquire" | "photos" | "hold" | "general";

interface InquiryState {
  open: (kind: InquiryKind, item?: Item) => void;
  close: () => void;
  kind: InquiryKind;
  item?: Item;
  isOpen: boolean;
}

const Ctx = createContext<InquiryState | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [kind, setKind] = useState<InquiryKind>("general");
  const [item, setItem] = useState<Item | undefined>();

  return (
    <Ctx.Provider
      value={{
        isOpen,
        kind,
        item,
        open: (k, i) => {
          setKind(k);
          setItem(i);
          setIsOpen(true);
        },
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useInquiry() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useInquiry must be used inside <InquiryProvider>");
  return ctx;
}
