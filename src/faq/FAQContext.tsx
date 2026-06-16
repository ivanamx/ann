import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { FAQModal } from "../components/FAQModal";

type FAQContextValue = {
  open: boolean;
  openFaq: () => void;
  closeFaq: () => void;
};

const FAQContext = createContext<FAQContextValue | null>(null);

export function FAQProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openFaq = useCallback(() => setOpen(true), []);
  const closeFaq = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openFaq, closeFaq }),
    [open, openFaq, closeFaq],
  );

  return (
    <FAQContext.Provider value={value}>
      {children}
      {open && <FAQModal onClose={closeFaq} />}
    </FAQContext.Provider>
  );
}

export function useFaq() {
  const ctx = useContext(FAQContext);
  if (!ctx) throw new Error("useFaq must be used within FAQProvider");
  return ctx;
}
