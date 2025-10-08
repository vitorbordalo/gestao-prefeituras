export default function cx(...c) {
  return c.filter(Boolean).join(" ");
}