import { useEffect, useRef, useState } from "react";
import { getCatImages } from "@api/controller/CatViewer.controller";
import { CatViewerImageType, ImagePositionType } from "@types";
import { useMediaQuery } from "react-responsive";
import { DEFAULT_IMAGES } from "./default_images";
import { makeTransitionString } from "@tools/makeTransitionString";

export default function CatViewer() {
  const [originalImages, setOriginalImages] = useState<CatViewerImageType[]>(DEFAULT_IMAGES);
  const [images, setImages] = useState<CatViewerImageType[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [showEntireMode, setShowEntireMode] = useState<ImagePositionType>({
    show: false,
    url: "",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isTablet = useMediaQuery({
    query: "(max-width:768px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  // 리렌더링을 방지해야 함
  useEffect(() => {
    const getImagesFn = async () => {
      setIsLoading(true);
      const data = await getCatImages({ limit: 20 });
      setOriginalImages(data.data);
      setIsLoading(false);
    };
    getImagesFn();
  }, []);

  useEffect(() => {
    let columnCount = 3;
    if (isTablet) columnCount = 2;
    if (isMobile) columnCount = 1;

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

  if (isLoading || images.length === 0) return <div>Loading...</div>;

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
