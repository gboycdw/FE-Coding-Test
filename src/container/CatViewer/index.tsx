import { useEffect, useState } from "react";
import { getCatImages } from "@api/controller/CatViewer.controller";
import { CatViewerImageType } from "@types";
import { useMediaQuery } from "react-responsive";
import { DEFAULT_IMAGES } from "./default_images";

export default function CatViewer() {
  const [originalImages, setOriginalImages] = useState<CatViewerImageType[]>(DEFAULT_IMAGES);
  const [images, setImages] = useState<CatViewerImageType[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEntireMode, setShowEntireMode] = useState({ show: false, url: "" });
  const isTablet = useMediaQuery({
    query: "(max-width:768px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:480px)",
  });

  // useEffect(() => {
  //   // 이 useEffect 훅은 새로 api를 패칭할 때가 아니면 바뀌면 안 됨.
  //   const getImagesFn = async () => {
  //     setIsLoading(true);
  //     const data = await getCatImages({ limit: 20 });
  //     setOriginalImages(data.data);
  //     setIsLoading(false);
  //   };
  //   getImagesFn();
  // }, []);

  useEffect(() => {
    // MediaQuery가 바뀔 때마다 레이아웃을 바꾸는 로직
    let columnCount = 3;
    if (isTablet) columnCount = 2;
    if (isMobile) columnCount = 1;

    const columns: CatViewerImageType[][] = Array.from({ length: columnCount }, () => []);
    originalImages.forEach((image: CatViewerImageType, index: number) => {
      columns[index % columnCount].push(image);
    });
    setImages(columns);
  }, [isTablet, isMobile]);

  if (isLoading || images.length === 0) return <div>Loading...</div>;

  return (
    <div className="w-full relative">
      <div className={`flex space-x-4 justify-center`}>
        {images.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 space-y-4">
            {column.map((image, rowIndex) => (
              <div key={rowIndex} className={`${showEntireMode.show ? "" : "overflow-hidden"}`}>
                <img
                  src={image.url}
                  alt={`Cat ${columnIndex}-${rowIndex}`}
                  className={`w-full cursor-pointer duration-300 transform`}
                  onClick={() =>
                    setShowEntireMode((prev) => {
                      return { show: !prev.show, url: image.url };
                    })
                  }
                />
              </div>
            ))}
          </div>
        ))}
        {!images && <div>No images</div>}
      </div>
    </div>
  );
}
