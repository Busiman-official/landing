"use client";

import { useRef, useState } from "react";
import { moveRow, removeRow, updateRow } from "@/lib/free/rows";
import s from "./free.module.css";

type Props<T> = {
  rows: T[];
  onChange: (rows: T[]) => void;
  /** Stable key per row (give every row an id, e.g. rowId()). */
  getKey: (row: T) => string;
  /** Build a new blank row. */
  makeRow: () => T;
  /** Render the inputs of one row. `patch` merges fields into that row. */
  renderRow: (row: T, index: number, patch: (p: Partial<T>) => void) => React.ReactNode;
  max?: number;
  min?: number;
  /** Singular name for labels: "item", "employee". */
  itemName?: string;
  addLabel?: string;
};

/**
 * Add / remove / move up / move down, with real buttons (44px, keyboard focus, announced to screen readers).
 * Rows are kept in your state; this component only calls onChange with the new array.
 */
export function RowsEditor<T>({
  rows,
  onChange,
  getKey,
  makeRow,
  renderRow,
  max = 30,
  min = 1,
  itemName = "row",
  addLabel,
}: Props<T>) {
  const [msg, setMsg] = useState("");
  const root = useRef<HTMLUListElement>(null);
  const full = rows.length >= max;

  const focusMove = (index: number, dir: "up" | "down") => {
    requestAnimationFrame(() => {
      root.current?.querySelector<HTMLButtonElement>(`[data-i="${index}"] [data-act="${dir}"]`)?.focus();
    });
  };

  return (
    <div>
      <ul className={s.rows} ref={root}>
        {rows.map((row, i) => (
          <li key={getKey(row)} className={s.rowItem} data-i={i}>
            <div className={s.rowHead}>
              <strong>
                {itemName} {i + 1}
              </strong>
              <div className={`${s.rowTools} noPrint`}>
                <button
                  type="button"
                  data-act="up"
                  className={s.iconBtn}
                  disabled={i === 0}
                  aria-label={`Move ${itemName} ${i + 1} up`}
                  onClick={() => {
                    onChange(moveRow(rows, i, -1));
                    setMsg(`${itemName} ${i + 1} moved up to position ${i}.`);
                    focusMove(i - 1, "up");
                  }}
                >
                  Up
                </button>
                <button
                  type="button"
                  data-act="down"
                  className={s.iconBtn}
                  disabled={i === rows.length - 1}
                  aria-label={`Move ${itemName} ${i + 1} down`}
                  onClick={() => {
                    onChange(moveRow(rows, i, 1));
                    setMsg(`${itemName} ${i + 1} moved down to position ${i + 2}.`);
                    focusMove(i + 1, "down");
                  }}
                >
                  Down
                </button>
                <button
                  type="button"
                  className={s.iconBtn}
                  disabled={rows.length <= min}
                  aria-label={`Remove ${itemName} ${i + 1}`}
                  onClick={() => {
                    onChange(removeRow(rows, i, min));
                    setMsg(`${itemName} ${i + 1} removed.`);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
            {renderRow(row, i, (p) => onChange(updateRow(rows, i, p)))}
          </li>
        ))}
      </ul>
      <div className={`${s.btnRow} noPrint`} style={{ marginTop: 12 }}>
        <button
          type="button"
          className="btn btn-line"
          disabled={full}
          onClick={() => {
            onChange([...rows, makeRow()]);
            setMsg(`${itemName} ${rows.length + 1} added.`);
          }}
        >
          {addLabel ?? `Add ${itemName}`}
        </button>
        <span className={s.status}>
          {rows.length} of {max} {itemName}s{full ? ". That is the most this page can hold." : ""}
        </span>
      </div>
      <span className={s.sr} role="status" aria-live="polite">
        {msg}
      </span>
    </div>
  );
}
