"use client";
import React, { useEffect, useMemo, useState } from "react";
import ImageGallery from "../components/Gallery/ImageGallery";
import Lottie from "lottie-react";
import AnimationData from "../assets/loader.json";

const GalleryPage: React.FC = () => {
  const imageUrls = useMemo(
    () => [
      "/capture/1.jpg",
      "/capture/2.jpg",
      "/capture/3.jpg",
      "/capture/4.jpg",
      "/capture/5.jpg",
      "/capture/6.jpg",
      "/capture/7.jpg",
      "/capture/8.jpg",
      "/capture/9.jpg",
      "/capture/10.jpg",
      "/capture/11.jpg",
      "/capture/12.jpg",
      "/capture/13.jpg",
      "/capture/14.jpg",
      "/capture/15.jpg",
      "/capture/16.jpg",
      "/capture/17.jpg",
      "/capture/18.jpg",
      "/capture/19.jpg",
      "/capture/20.jpg",
      "/capture/21.jpg",
      "/capture/22.jpg",
      "/capture/23.jpg",
      "/capture/24.jpg",
      "/capture/25.jpg",
      "/capture/26.jpg",
      "/capture/27.jpg",
      "/capture/28.jpg",
      "/capture/29.jpg",
      "/capture/30.jpg",
      "/capture/31.jpg",
      "/capture/32.jpg",
      "/capture/33.jpg",
      "/capture/34.jpg",
      "/capture/35.jpg",
      "/capture/36.jpg",
      "/capture/37.jpg",
      "/capture/38.jpg",
      "/capture/39.jpg",
      "/capture/40.jpg",
      "/capture/41.jpg",
      "/capture/42.jpg",
      "/capture/43.jpg",
      "/capture/44.jpg",
      "/capture/45.jpg",
      "/capture/46.jpg",
      "/capture/47.jpg",
      "/capture/48.jpg",
      "/capture/49.jpg",
      "/capture/50.jpg",
      "/capture/51.jpg",
      "/capture/52.jpg",
      "/capture/53.jpg",
      "/capture/54.jpg",
      "/capture/55.jpg",
    ],
    []
  );

  const images = useMemo(
    () =>
      imageUrls.map((src, index) => ({
        src,
        alt: `Image ${index + 1}`,
      })),
    [imageUrls]
  );

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div className="w-full">
      <h3 className="tracking-[15px] text-center mt-10 uppercase text-slate-400 text-xl md:text-3xl">
        Photo Gallery
      </h3>
      {!imagesLoaded ? (
        <div className="mx-auto px-5 ">
          <div className="-mx-2 h-screen flex items-start justify-center">
            <Lottie animationData={AnimationData} loop={true} />
          </div>
        </div>
      ) : (
        <ImageGallery images={images} />
      )}
    </div>
  );
};

export default React.memo(GalleryPage);
