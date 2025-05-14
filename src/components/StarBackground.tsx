import React from 'react';

const generateStars = (count: number, _size: number, areaWidth: number, areaHeight: number) => {
  const stars: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * areaWidth);
    const y = Math.floor(Math.random() * areaHeight);
    stars.push(`${x}px ${y}px white`);
  }
  return stars.join(', ');
};

const StarLayer = ({ size, count, duration }: { size: number; count: number; duration: number }) => {
  const boxShadow = generateStars(count, size, 2000, 2000);
  const afterBoxShadow = generateStars(count, size, 2000, 2000);

  return (
    <div
      className="absolute top-0 left-0 w-[1px] h-[1px] bg-transparent animate-[starMove_linear_infinite]"
      style={{
        boxShadow,
        animationDuration: `${duration}s`
      }}
    >
      <div
        className="absolute"
        style={{
          top: '2000px',
          width: `${size}px`,
          height: `${size}px`,
          background: 'transparent',
          boxShadow: afterBoxShadow
        }}
      />
    </div>
  );
};

const StarBackground: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0d141c] to-[#050607]">
      <StarLayer size={1} count={100} duration={1000} />
      <StarLayer size={2} count={100} duration={1000} />
      <StarLayer size={3} count={100} duration={200} />
    </div>
  );
};

export default StarBackground;