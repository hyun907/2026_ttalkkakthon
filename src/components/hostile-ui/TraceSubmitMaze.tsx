import { useEffect, useMemo, useState, type PointerEvent } from "react";
import { trackChaosInteraction } from "@/lib/analytics";

interface TraceSubmitMazeProps {
  compact?: boolean;
}

interface Point {
  x: number;
  y: number;
}

const OUTER_WALLS: Point[] = [
  { x: 72, y: 16 },
  { x: 18, y: 16 },
  { x: 16, y: 18 },
  { x: 16, y: 78 },
  { x: 14, y: 82 },
  { x: 22, y: 84 },
  { x: 82, y: 82 },
  { x: 90, y: 78 },
  { x: 84, y: 34 },
];

const MIDDLE_WALLS: Point[] = [
  { x: 82, y: 32 },
  { x: 34, y: 30 },
  { x: 30, y: 34 },
  { x: 32, y: 66 },
  { x: 46, y: 64 },
  { x: 72, y: 60 },
];

const INNER_WALLS: Point[] = [
  { x: 68, y: 60 },
  { x: 42, y: 60 },
  { x: 40, y: 56 },
  { x: 40, y: 42 },
  { x: 64, y: 42 },
];

const START_POINT = { x: 12, y: 64 };
const BUTTON_RECT = { left: 40, right: 64, top: 38, bottom: 56 };

function toPixels(point: Point, width: number, height: number) {
  return {
    x: (point.x / 100) * width,
    y: (point.y / 100) * height,
  };
}

function distanceToSegment(point: Point, a: Point, b: Point) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const apx = point.x - a.x;
  const apy = point.y - a.y;
  const lengthSquared = abx * abx + aby * aby || 1;
  const t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / lengthSquared));
  const closestX = a.x + abx * t;
  const closestY = a.y + aby * t;
  const dx = point.x - closestX;
  const dy = point.y - closestY;

  return Math.sqrt(dx * dx + dy * dy);
}

export function TraceSubmitMaze({ compact = false }: TraceSubmitMazeProps) {
  const [cursor, setCursor] = useState(START_POINT);
  const [warning, setWarning] = useState("");
  const [successCount, setSuccessCount] = useState(0);

  const wallSets = useMemo(() => [OUTER_WALLS, MIDDLE_WALLS, INNER_WALLS], []);

  useEffect(() => {
    if (!warning) return;

    const timer = window.setTimeout(() => setWarning(""), 1000);
    return () => window.clearTimeout(timer);
  }, [warning]);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nextCursor = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };

    setCursor(nextCursor);

    const cursorPixels = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const strokePadding = compact ? 8 : 10;

    const collided = wallSets.some((points) =>
      points.slice(0, -1).some((point, index) => {
        const start = toPixels(point, rect.width, rect.height);
        const end = toPixels(points[index + 1], rect.width, rect.height);
        return distanceToSegment(cursorPixels, start, end) < strokePadding;
      })
    );

    if (collided) {
      trackChaosInteraction("TraceSubmitMaze", "collision", {
        compact_mode: compact,
      });
      setWarning("경고. 또 선에 닿았네요. 손이 급한 건 이해하지만 실력은 별개입니다.");
      setCursor(START_POINT);
    }
  }

  function handlePointerLeave() {
    setCursor(START_POINT);
  }

  function handleClick() {
    const insideButton =
      cursor.x >= BUTTON_RECT.left &&
      cursor.x <= BUTTON_RECT.right &&
      cursor.y >= BUTTON_RECT.top &&
      cursor.y <= BUTTON_RECT.bottom;

    if (!insideButton) return;

    setSuccessCount((current) => current + 1);
    trackChaosInteraction("TraceSubmitMaze", "success", {
      success_count: successCount + 1,
      compact_mode: compact,
    });
    setWarning("제출은 인정됐습니다. 이번엔 운이 좋았네요.");
    setCursor(START_POINT);
  }

  return (
    <div className="w-full max-w-md">
      <div
        className={[
          "relative w-full rounded-xl border border-border overflow-hidden bg-neutral-950 text-white shadow-lg cursor-none select-none",
          compact ? "h-44" : "h-72",
        ].join(" ")}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={OUTER_WALLS.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.88)"
            strokeWidth={compact ? 1.4 : 1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={INNER_WALLS.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.88)"
            strokeWidth={compact ? 1.4 : 1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={MIDDLE_WALLS.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.88)"
            strokeWidth={compact ? 1.4 : 1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          className={[
            "absolute rounded-md bg-primary text-primary-foreground flex items-center justify-center font-semibold tracking-tight shadow-sm pointer-events-none",
            compact ? "text-sm w-24 h-10" : "text-base w-40 h-14",
          ].join(" ")}
          style={{
            left: `${BUTTON_RECT.left}%`,
            top: `${BUTTON_RECT.top}%`,
            width: `${BUTTON_RECT.right - BUTTON_RECT.left}%`,
            height: `${BUTTON_RECT.bottom - BUTTON_RECT.top}%`,
          }}
        >
          제출하기
        </div>

        <div
          className="absolute w-3 h-3 rounded-full bg-primary border-2 border-white shadow-[0_0_0_3px_rgba(255,0,128,0.22)] pointer-events-none"
          style={{
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="absolute left-3 top-3 text-[11px] text-white/70 font-mono">
          start
        </div>

        {warning ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <div
              className={[
                "max-w-[82%] rounded-xl border border-danger/30 bg-white px-4 py-3 text-center shadow-2xl",
                compact ? "text-xs" : "text-sm",
              ].join(" ")}
            >
              <p className="font-semibold text-[#8b2635]">주의</p>
              <p className="mt-1 text-foreground">{warning}</p>
            </div>
          </div>
        ) : null}
      </div>

      {compact ? null : (
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            선에 닿지 않고 중앙 버튼까지 커서를 이동시켜 클릭해야 합니다.
          </p>
          <span className="text-xs font-mono text-muted-foreground">
            success {successCount}
          </span>
        </div>
      )}
    </div>
  );
}
