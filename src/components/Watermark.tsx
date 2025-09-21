import logo from '@/assets/logo.jpg';

export default function Watermark() {
  return (
    <div className="fixed bottom-4 right-4 pointer-events-none z-0">
      <img 
        src={logo} 
        alt="MealBridge Watermark" 
        className="w-32 h-32 object-contain select-none"
        style={{ opacity: 0.08 }}
      />
    </div>
  );
}
