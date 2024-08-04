import { useEffect, useState } from "react";
import { getCatImages } from "../../api/controller/CatViewer.controller";

export default function CatViewer() {
  const [images, setImages] = useState<any>();

  const columnCount = 3;

  useEffect(() => {
    const data = getCatImages({ limit: 20 });
    data.then((res) => {
      const images = res.data;
      const columns: any = Array.from({ length: columnCount }, () => []);
      images.forEach((image: any, index: number) => {
        columns[index % columnCount].push(image);
      });

      setImages(columns);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex space-x-4 justify-center">
        {images &&
          images.map((column: any, columnIndex: number) => (
            <div key={columnIndex} className="flex-1 space-y-4">
              {column.map((image: any, rowIndex: number) => (
                <div key={rowIndex} className="overflow-hidden">
                  <img src={image.url} alt={`Cat ${rowIndex}`} className="w-full" />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
