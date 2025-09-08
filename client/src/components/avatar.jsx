import { useState } from "react";

const Avatar = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-24 h-24">
      {/* Spinner while loading */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Image */}
      <img
        src={src||"/avatar.svg"}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)} // also hide spinner if image fails
        className={`w-24 h-24 rounded-full border-4 border-primary object-cover 
          ${loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
      />
    </div>
  );
};

export default Avatar;