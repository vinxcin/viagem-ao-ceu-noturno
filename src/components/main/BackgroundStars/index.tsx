import { useStarfield } from '@/hooks/useStarfield';

export default function BackgroundStars() {
  const canvasRef = useStarfield(200);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-[-1] w-full h-full pointer-events-none bg-transparent"
      aria-hidden="true"
    />
  );
}