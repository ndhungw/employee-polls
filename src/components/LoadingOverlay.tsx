const LoadingOverlay = () => {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-500 opacity-80 transition"></div>
      <div className="fixed inset-0 z-50 grid place-items-center transition">
        <div className="text-white text-2xl">Loading . . .</div>
      </div>
    </>
  );
};

export default LoadingOverlay;
