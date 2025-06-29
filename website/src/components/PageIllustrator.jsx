import React, { useState } from 'react'

function PageIllustrator() {
  const[multiple,setMultiple] = useState(false);
   return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/4"
        aria-hidden="true"
      >
        {}
      </div>
      {multiple && (
        <>
          <div
            className="pointer-events-none absolute left-1/2 top-[400px] -z-10 -mt-20 -translate-x-full opacity-50"
            aria-hidden="true"
          >
            
          </div>
          
        </>
      )}
    </>
  );
}

export default PageIllustrator