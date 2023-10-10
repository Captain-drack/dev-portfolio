import React from 'react';

export interface ImageProps {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: ImageProps[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="mx-auto px-5 py-2 lg:pt-24">
      <div className="-mx-2 flex items-center flex-wrap">
        {images.map((image, index) => {
          const isLarge = index === 0; // Check if it's the first image

          return (
            <div
              key={index}
              className={`w-full sm:w-1/2 md:w-1/3 ${isLarge ? 'sm:px-2 py-2' : 'md:px-2 md:py-2'}`}
            >
              <div
                style={{
                  height: '500px', 
                  overflow: 'hidden',
                  borderRadius: '10px', 
                  objectFit: 'cover',
                }}
              >
                <img
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: '100%', // This will make the image fill the container without stretching
                    objectFit: 'cover', // This ensures the image maintains its aspect ratio and covers the container
                  }}
                  src={image.src}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;