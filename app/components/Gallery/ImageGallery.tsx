/* eslint-disable @next/next/no-img-element */
import React from "react";

export interface ImageProps {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: ImageProps[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const numColumns = 4;
  const rowsPerColumn = Math.ceil(images.length / numColumns);

  const columns = Array.from({ length: numColumns }, (_, colIndex) => {
    return images.slice(colIndex * rowsPerColumn, (colIndex + 1) * rowsPerColumn);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5">
      {columns.map((columnImages, colIndex) => (
        <div key={colIndex} className="grid gap-4">
          {columnImages.map((image, index) => (
            <div key={index}>
              <img
                className="h-auto max-w-full rounded-lg object-cover object-center"
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
