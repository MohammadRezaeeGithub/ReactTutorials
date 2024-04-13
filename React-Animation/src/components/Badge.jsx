import { motion } from "framer-motion";
export default function Badge({ caption }) {
  // here we want the badges to bump up when the amount changes
  return (
    <motion.span
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.3 }}
      className="badge"
    >
      {caption}
    </motion.span>
  );
}
