export function leftPad(n: number, w: number, p: string = "0") {
  return n.toString().padStart(w, p);
}
