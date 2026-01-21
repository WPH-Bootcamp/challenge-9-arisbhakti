import { motion } from "framer-motion";

type Props = {
  trailerKey: string;
  onClose: () => void;
};

const TrailerModal = ({ trailerKey, onClose }: Props) => {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-[90%] max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center hover:brightness-110"
          aria-label="Close trailer"
        >
          ✕
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default TrailerModal;
