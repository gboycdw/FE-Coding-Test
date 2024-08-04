import { useCallback, useEffect, useRef, useState } from "react";
import { getCatImages } from "@api/controller/CatViewer.controller";
import { CatViewerImageType, ImagePositionType } from "@types";
import { useMediaQuery } from "react-responsive";

import { makeTransitionString } from "@tools/makeTransitionString";
import SkeletonImages from "./skeletonImages";

export default function CatViewer() {
  const [originalImages, setOriginalImages] = useState<CatViewerImageType[]>([]);
  const [images, setImages] = useState<CatViewerImageType[][]>([]);
  const [columnCount, setColumnCount] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isTablet = useMediaQuery({
    query: "(max-width:768px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  const [showEntireMode, setShowEntireMode] = useState<ImagePositionType>({
    show: false,
    url: "",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // 이미지 클릭 시 확대 관련 ref
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 무한스크롤 관련 ref
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchImages = async () => {
    setIsLoading(true);
    const data = await getCatImages({ limit: 30, page });
    setOriginalImages((prevImages) => [...prevImages, ...data.data]);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  };

  // 이미지 최초 로딩
  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (isTablet) setColumnCount(2);
    if (isMobile) setColumnCount(1);

    const columns: CatViewerImageType[][] = Array.from({ length: columnCount }, () => []);
    originalImages.forEach((image: CatViewerImageType, index: number) => {
      columns[index % columnCount].push(image);
    });
    setImages(columns);
  }, [isTablet, isMobile, originalImages]);

  // 이미지 확대 핸들러
  const handleClick = (image: CatViewerImageType, index: number) => {
    const rect = imageRefs.current[index]?.getBoundingClientRect();
    if (rect) {
      setShowEntireMode({
        show: true,
        url: image.url,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  };

  // 이미지 축소 핸들러
  const handleClose = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      setShowEntireMode({ show: false, url: "", top: 0, left: 0, width: 0, height: 0 });
    }, 500);
  };

  // 무한스크롤 콜백 함수
  const loadMore = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        fetchImages();
      }
    },
    [isLoading],
  );

  // 무한스크롤 옵저버 훅
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(loadMore, {
      rootMargin: "40px",
      threshold: 1.0,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore]);

  // 스켈레톤 UI 관련 상수
  const skeletonMinWidth = `min-w-[${900 / columnCount}px]`;

  if (images.length === 0) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="flex space-x-4 justify-center">
        {images.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 space-y-4">
            {column.map((image, rowIndex) => (
              <div key={rowIndex} className="overflow-hidden" ref={(el) => (imageRefs.current[columnIndex * column.length + rowIndex] = el)}>
                <img
                  src={image.url}
                  alt={`Cat ${columnIndex}-${rowIndex}`}
                  className="w-full cursor-pointer duration-300 transform hover:scale-105"
                  onClick={() => handleClick(image, columnIndex * column.length + rowIndex)}
                />
              </div>
            ))}
          </div>
        ))}
        {!images && <div>No images</div>}
      </div>
      {/* 무한스크롤 옵저버 */}
      <div ref={loadMoreRef} className="h-10"></div>

      {/* 스켈레톤 UI */}
      {isLoading && (
        <div className="flex space-x-4 justify-center mt-4">
          {Array.from({ length: columnCount }).map((_, columnIndex) => (
            <div key={columnIndex} className={`flex-1 space-y-4 ${skeletonMinWidth}`}>
              {Array.from({ length: 2 }).map((_, rowIndex) => (
                <SkeletonImages key={rowIndex} />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* 이미지 확대 기능 */}
      {showEntireMode.show && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${isTransitioning ? "bg-black bg-opacity-75" : "bg-transparent"}`}
          onClick={handleClose}
        >
          <img
            src={showEntireMode.url}
            alt="Full screen cat"
            className={`fixed transition-all duration-500 transform`}
            style={{
              top: showEntireMode.top,
              left: showEntireMode.left,
              width: showEntireMode.width,
              height: showEntireMode.height,
              transform: isTransitioning ? makeTransitionString(showEntireMode) : "",
            }}
          />
        </div>
      )}
    </div>
  );
}
