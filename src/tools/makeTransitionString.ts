import { ImagePositionType } from "@types";

export function makeTransitionString(showEntireMode: ImagePositionType) {
  // Scale 조정에 사용할 값
  const scaleValue = showEntireMode.width ? Math.min(window.innerWidth / showEntireMode.width, window.innerHeight / showEntireMode.height) : 1;
  const centerX = window.innerWidth / 2 - showEntireMode.width / 2;
  const centerY = window.innerHeight / 2 - showEntireMode.height / 2;
  return `translate(${centerX - showEntireMode.left}px, ${centerY - showEntireMode.top}px) scale(${scaleValue})`;
}
