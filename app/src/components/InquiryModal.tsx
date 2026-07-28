import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Mail, Phone, Check, Copy } from "lucide-react";
import { useInquiry, type InquiryKind } from "../lib/inquiry";
import { business } from "../data/site";
import { formatPrice } from "../data/inventory";

const COPY: Record<InquiryKind, { title: string; blurb: string; subject: string }> = {
  inquire: {
    title: "Inquire about this piece",
    blurb:
      "Barbara answers inquiries personally. Tell her what you'd like to know and she'll be in touch.",
    subject: "Inquiry",
  },
  photos: {
    title: "Request more photographs",
    blurb:
      "Happy to send additional photographs — details, condition, maker's marks, whatever is useful.",
    subject: "Photograph request",
  },
  hold: {
    title: "Ask for a hold",
    blurb:
      "Pieces can be held briefly while you decide. Let Barbara know and she'll confirm by reply.",
    subject: "Hold request",
  },
  general: {
    title: "Get in touch",
    blurb:
      "Questions about a piece, a visit, or a show — this reaches Barbara directly.",
    subject: "Hello",
  },
};

export function InquiryModal() {
  const { isOpen, close, kind, item } = useInquiry();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);
  const copy = COPY[kind];

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current?.focus(), 120);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      setCopied(false);
      setMessage(
        item
          ? `I'd like to know more about "${item.title}" (ref ${item.id.toUpperCase()}).\n\n`
          : "",
      );
    }
  }, [isOpen, item]);

  const subject = item
    ? `${copy.subject} — ${item.title} (${item.id.toUpperCase()})`
    : `${copy.subject} — Pewter & Wood`;

  const body =
    `${message}\n\n` +
    (item
      ? `— Piece: ${item.title}\n— Reference: ${item.id.toUpperCase()}\n— Asking: ${formatPrice(item.price)}\n\n`
      : "") +
    (name ? `Thank you,\n${name}` : "");

  const mailto = `mailto:${business.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            initial={{ y: 40, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative grain max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-parchment p-6 shadow-2xl ring-1 ring-ink/10 sm:rounded-3xl sm:p-8"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-ink-3 transition hover:bg-parchment-3 hover:text-ink"
            >
              <X size={18} />
            </button>

            <p className="smallcaps text-xs text-gilt">Pewter &amp; Wood</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">{copy.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-3">{copy.blurb}</p>

            {item && (
              <div className="mt-5 flex items-baseline justify-between gap-4 rounded-xl border border-ink/10 bg-parchment-2/70 px-4 py-3">
                <span className="font-display text-sm font-medium text-ink">
                  {item.title}
                </span>
                <span className="shrink-0 text-sm text-gilt">
                  {formatPrice(item.price)}
                </span>
              </div>
            )}

            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="smallcaps text-[11px] text-ink-3">Your name</span>
                <input
                  ref={firstField}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-ink/15 bg-parchment px-3 py-2.5 text-sm outline-none transition focus:border-gilt"
                  placeholder="Jane Abbott"
                />
              </label>
              <label className="block">
                <span className="smallcaps text-[11px] text-ink-3">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="mt-1 w-full resize-none rounded-lg border border-ink/15 bg-parchment px-3 py-2.5 text-sm leading-relaxed outline-none transition focus:border-gilt"
                />
              </label>
            </div>

            <a
              href={mailto}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-parchment transition hover:bg-ink-2"
            >
              <Mail size={16} /> Open in your mail app
            </a>

            <div className="mt-4 flex flex-col gap-2 border-t border-ink/10 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`tel:${business.cell.replace(/-/g, "")}`}
                className="flex items-center gap-2 text-ink-2 transition hover:text-gilt"
              >
                <Phone size={15} /> {business.cell}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(business.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="flex items-center gap-2 text-ink-2 transition hover:text-gilt"
              >
                {copied ? <Check size={15} className="text-sage" /> : <Copy size={15} />}
                {copied ? "Address copied" : business.email}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
