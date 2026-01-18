"use client";

export const BorderOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <img 
        src="/border.svg" 
        alt="" 
        className="w-full h-full object-cover opacity-100"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))',
          opacity: 1
        }}
      />
    </div>
  );
};
