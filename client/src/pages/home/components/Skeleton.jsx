const Skeleton = () => {
  return (
    <div className="flex gap-2 justify-between px-5 items-end" style={{ width: '600px', height: '300px', backgroundColor: '#f0f0f0' }}>
      {/* Add skeleton styles for bars */}
      <div className="animate-pulse" style={{ width: '10%', height: '80%', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>
      <div className="animate-pulse" style={{ width: '10%', height: '80%', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>
      <div className="animate-pulse" style={{ width: '10%', height: '80%', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>
      <div className="animate-pulse" style={{ width: '10%', height: '80%', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>
      <div className="animate-pulse" style={{ width: '10%', height: '80%', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>
      <div className="animate-pulse" style={{ width: '10%', height: '80%', backgroundColor: '#e0e0e0', marginBottom: '10px' }}></div>

    </div>
  );
};

export default Skeleton