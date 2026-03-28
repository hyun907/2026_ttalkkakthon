import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { trackChaosInteraction } from "@/lib/analytics";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionOfChaosProps {
  items: AccordionItemData[];
  /** Items open on first render. */
  defaultOpenIds?: string[];
  /**
   * Maximum number of simultaneously open items.
   * Chaos may push this below the limit.
   */
  maxOpen?: number;
  /**
   * Probability that chaos fires after an item opens.
   * 0 = normal accordion, 1 = chaos every time.
   * @default 0.8
   */
  chaosLevel?: number;
  className?: string;
}

// ── Chevron icon ──────────────────────────────────────────────────────────────

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="w-4 h-4 fill-none stroke-current"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}

// ── AccordionItem ─────────────────────────────────────────────────────────────

interface AccordionItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div
      className={[
        "rounded-lg border border-border overflow-hidden",
        "transition-shadow duration-200",
        isOpen ? "shadow-sm" : "shadow-none",
      ].join(" ")}
    >
      {/* Header */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
        id={`accordion-trigger-${item.id}`}
        onClick={() => onToggle(item.id)}
        className={[
          "w-full flex items-center justify-between gap-3",
          "px-4 py-3.5 text-left",
          "bg-card hover:bg-surface",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-inset",
        ].join(" ")}
      >
        <span className="text-sm font-medium text-foreground leading-snug">
          {item.title}
        </span>
        <span
          className="shrink-0 text-muted-foreground"
          style={{
            transition: "transform 280ms cubic-bezier(0.34, 1.1, 0.64, 1)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown />
        </span>
      </button>

      {/* Content — CSS grid trick for smooth height animation without JS measurement */}
      <div
        id={`accordion-content-${item.id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${item.id}`}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 280ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div
            className="px-4 pt-3 pb-4 border-t border-border bg-card"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: "opacity 200ms ease",
              transitionDelay: isOpen ? "60ms" : "0ms",
            }}
          >
            <div className="text-sm text-muted-foreground leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AccordionOfChaos ──────────────────────────────────────────────────────────

/**
 * AccordionOfChaos
 *
 * A visually polished accordion that occasionally closes a random item
 * after you open one. The chaos is smooth, intentional-feeling, and
 * precisely timed to maximise user confusion without feeling like a bug.
 *
 * Chaos timing: 160–240ms after the open — long enough for the user to
 * register success, short enough that they cannot act on it.
 */
export function AccordionOfChaos({
  items,
  defaultOpenIds = [],
  maxOpen,
  chaosLevel = 0.8,
  className = "",
}: AccordionOfChaosProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(defaultOpenIds)
  );

  // Ref so timeout callbacks always see the latest openIds without
  // needing to be included in useCallback deps.
  const openIdsRef = useRef(openIds);
  useEffect(() => {
    openIdsRef.current = openIds;
  }, [openIds]);

  const pendingChaos = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const retryCountsRef = useRef(new Map<string, number>());
  const interactionCountRef = useRef(0);
  const successfulRevealCountRef = useRef(0);
  const mountedAtRef = useRef(Date.now());

  const clearRevealTimer = useCallback((id: string) => {
    const timer = revealTimers.current.get(id);

    if (timer) {
      clearTimeout(timer);
      revealTimers.current.delete(id);
    }
  }, []);

  const scheduleRevealSuccess = useCallback(
    (id: string) => {
      clearRevealTimer(id);

      const timer = setTimeout(() => {
        revealTimers.current.delete(id);

        if (!openIdsRef.current.has(id)) {
          return;
        }

        successfulRevealCountRef.current += 1;
        trackChaosInteraction("AccordionOfChaos", "full_reveal", {
          item_id: id,
          reveal_duration_ms: 3000,
          retry_count: retryCountsRef.current.get(id) ?? 1,
        });
      }, 3000);

      revealTimers.current.set(id, timer);
    },
    [clearRevealTimer]
  );

  const handleToggle = useCallback(
    (id: string) => {
      const isCurrentlyOpen = openIdsRef.current.has(id);
      interactionCountRef.current += 1;

      if (isCurrentlyOpen) {
        clearRevealTimer(id);
        trackChaosInteraction("AccordionOfChaos", "manual_close", {
          item_id: id,
          interaction_count: interactionCountRef.current,
        });
      } else {
        const nextRetryCount = (retryCountsRef.current.get(id) ?? 0) + 1;
        retryCountsRef.current.set(id, nextRetryCount);
        trackChaosInteraction("AccordionOfChaos", "retry_click", {
          item_id: id,
          retry_count: nextRetryCount,
          open_items_before: openIdsRef.current.size,
        });
        scheduleRevealSuccess(id);
      }

      // ── Phase 1: Apply the user's intent immediately ──────────────────────
      setOpenIds((prev) => {
        const next = new Set(prev);

        if (next.has(id)) {
          // Closing: no chaos, respect the user's decision to close.
          next.delete(id);
          return next;
        }

        // Opening.
        next.add(id);

        // Respect maxOpen (deterministic, not chaotic).
        if (maxOpen !== undefined && next.size > maxOpen) {
          for (const existingId of next) {
            if (existingId !== id) {
              next.delete(existingId);
              break;
            }
          }
        }

        return next;
      });

      // ── Phase 2: Maybe schedule chaos ─────────────────────────────────────
      // Only fires when opening an item (not closing).
      if (isCurrentlyOpen) return;
      if (Math.random() >= chaosLevel) return;

      // Cancel any pending chaos from a rapid previous click.
      if (pendingChaos.current !== null) {
        clearTimeout(pendingChaos.current);
      }

      // The delay is deliberate: 160–240ms. The user sees the item open, feels
      // confident, then watches something else close. This is the product.
      const delay = 160 + Math.floor(Math.random() * 80);

      pendingChaos.current = setTimeout(() => {
        pendingChaos.current = null;

        setOpenIds((prev) => {
          // Build candidate list: open items that are NOT the one just opened.
          const victims = [...prev].filter((openId) => openId !== id);

          if (victims.length === 0) {
            // Only the new item is open.
            // Maximum frustration: close the item the user just opened.
            const next = new Set(prev);
            next.delete(id);
            clearRevealTimer(id);
            trackChaosInteraction("AccordionOfChaos", "chaos_close", {
              opened_item_id: id,
              victim_item_id: id,
              delay_ms: delay,
              open_items_count: prev.size,
            });
            return next;
          }

          // Close a uniformly random victim.
          const victim = victims[Math.floor(Math.random() * victims.length)];
          const next = new Set(prev);
          next.delete(victim);
          clearRevealTimer(victim);
          trackChaosInteraction("AccordionOfChaos", "chaos_close", {
            opened_item_id: id,
            victim_item_id: victim,
            delay_ms: delay,
            open_items_count: prev.size,
          });
          return next;
        });
      }, delay);
    },
    [chaosLevel, clearRevealTimer, maxOpen, scheduleRevealSuccess]
    // openIdsRef is intentionally excluded — we read it via ref.
  );

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (pendingChaos.current !== null) {
        clearTimeout(pendingChaos.current);
      }

      revealTimers.current.forEach((timer) => clearTimeout(timer));
      revealTimers.current.clear();

      trackChaosInteraction("AccordionOfChaos", "session_summary", {
        interaction_count: interactionCountRef.current,
        successful_reveals: successfulRevealCountRef.current,
        unique_items_tried: retryCountsRef.current.size,
        dwell_time_ms: Date.now() - mountedAtRef.current,
      });
    };
  }, []);

  return (
    <div className={["flex flex-col gap-2", className].join(" ")}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
