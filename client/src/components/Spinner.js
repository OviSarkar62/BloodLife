import React, { useEffect, useState } from "react";

function Spinner() {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (showSpinner) {
    return (
      <div className="fixed inset-0 bg-black opacity-70 z-[9999] flex justify-center items-center">
        <div className="border-4 h-8 w-8 border-red-500 border-solid border-t-transparent rounded-full animate-spin">
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Spinner;
