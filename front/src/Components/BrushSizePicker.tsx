import React from 'react';

export default function BrushSizePicker({
  brushSize,
  setBrushSize,
}: {
  brushSize: number;
  setBrushSize: React.Dispatch<React.SetStateAction<number>>;
}) {
  const sizes = [0.8, 2, 4, 7, 16];
  const increaseBrushSize = () => {
    setBrushSize((prev) => {
      const nextIndex = sizes.indexOf(brushSize) + 1;
      if (sizes[nextIndex]) return sizes[nextIndex];
      return prev;
    });
  };
  const decreaseBrushSize = () => {
    setBrushSize((prev) => {
      const nextIndex = sizes.indexOf(brushSize) - 1;
      if (sizes[nextIndex]) return sizes[nextIndex];
      return prev;
    });
  };
  return (
    <div className='brush-size-pickers'>
      <button className='brush-size-btn' onClick={increaseBrushSize}>
        +
      </button>
      {sizes.indexOf(brushSize) + 1}
      <button className='brush-size-btn' onClick={decreaseBrushSize}>
        -
      </button>
    </div>
  );
}
