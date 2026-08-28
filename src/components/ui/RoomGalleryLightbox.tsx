"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface RoomGalleryLightboxProps {
  roomName: string;
  images: string[];
  heroTag?: string;
  renderLocation?: "hero" | "thumbnails";
  activeLightboxIndex?: number | null;
  onOpenLightbox?: (index: number) => void;
}

export function RoomGalleryView({
  roomName,
  images,
  heroTag,
}: {
  roomName: string;
  images: string[];
  heroTag?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;

  const handleOpen = (index: number) => {
    setLightboxIndex(index);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1));
  }, [lightboxIndex, images.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1));
  }, [lightboxIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handlePrev, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  return {
    handleOpen,
    lightboxModal: isOpen ? (
      <div
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn"
        onClick={handleClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar */}
        <div
          className="flex items-center justify-between text-white z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-white/70 block">
              {roomName}
            </span>
            <span className="text-sm font-semibold">
              Photo {lightboxIndex! + 1} of {images.length}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Image in Viewport */}
        <div
          className="relative flex-1 flex items-center justify-center my-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full max-w-5xl h-full max-h-[78vh] flex items-center justify-center">
            <Image
              src={images[lightboxIndex!]}
              alt={`${roomName} view ${lightboxIndex! + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all shadow-lg active:scale-95"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all shadow-lg active:scale-95"
            aria-label="Next Image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>

        {/* Bottom Thumbnails */}
        <div
          className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10 max-w-2xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className={`relative w-14 h-10 rounded-md overflow-hidden shrink-0 transition-all border-2 ${
                lightboxIndex === idx
                  ? "border-white scale-110 shadow-md"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`thumb ${idx + 1}`}
                fill
                sizes="60px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    ) : null,
  };
}

export function RoomHeroGrid({
  roomName,
  images,
  heroTag,
  onImageClick,
}: {
  roomName: string;
  images: string[];
  heroTag?: string;
  onImageClick: (index: number) => void;
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 h-[45vh] sm:h-[55vh] md:h-[62vh]">
        {/* Main Hero Image */}
        <div
          onClick={() => onImageClick(0)}
          className="md:col-span-8 h-full relative clip-a-frame overflow-hidden rounded-2xl bg-surface-container cursor-pointer group shadow-sm"
        >
          <Image
            src={images[0]}
            alt={roomName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

          {heroTag && (
            <div className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow">
              {heroTag}
            </div>
          )}

          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow opacity-90 group-hover:opacity-100">
            <span className="material-symbols-outlined text-[16px]">photo_library</span>
            <span>View all {images.length} photos</span>
          </div>
        </div>

        {/* Supporting 2 Images */}
        <div className="hidden md:flex md:col-span-4 flex-col gap-3.5 h-full">
          {images[1] && (
            <div
              onClick={() => onImageClick(1)}
              className="flex-1 rounded-2xl overflow-hidden relative bg-surface-container cursor-pointer group shadow-sm"
            >
              <Image
                src={images[1]}
                alt={`${roomName} interior`}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          )}
          {images[2] && (
            <div
              onClick={() => onImageClick(2)}
              className="flex-1 rounded-2xl overflow-hidden relative bg-surface-container cursor-pointer group shadow-sm"
            >
              <Image
                src={images[2]}
                alt={`${roomName} view`}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function RoomGallerySmallGrid({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (index: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl font-bold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">collections</span>
          Cabin Gallery ({images.length} Photos)
        </h3>
        <span className="text-xs text-on-surface-variant font-medium">Tap photo to expand</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, idx) => (
          <div
            key={idx}
            onClick={() => onImageClick(idx)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-container cursor-pointer group shadow-sm hover:shadow-md border border-outline/10"
          >
            <Image
              src={src}
              alt={`Cabin gallery photo ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">
                zoom_in
              </span>
            </div>
            <div className="absolute bottom-1.5 left-1.5 bg-black/55 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {idx + 1}/{images.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
