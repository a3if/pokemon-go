import React, { useState } from 'react'
import BounceLoader from "react-spinners/BounceLoader";
const Loading = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#fcba03");
  return (
    <div className='flex justify-center mt-[150px]'>
    <BounceLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
   
  </div>
  )
}

export default Loading