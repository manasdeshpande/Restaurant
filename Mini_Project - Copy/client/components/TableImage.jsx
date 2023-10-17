import Image from "next/image";
import React from "react";

const TableImage = () => {
  return (
    <div
      className="hidden md:block" // Hide on mobile, show on small screens and larger
      style={{
        border: "0.5em solid white",
        borderRadius: "60px",
        overflow: "hidden",
        marginTop: "9em",
        marginLeft:'4em'
      }}
    >
      <Image
        src={"https://images.unsplash.com/photo-1599458252573-56ae36120de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudCUyMHRhYmxlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"}
        alt="example"
        width={800}
        height={800}
        quality={100}
      />
    </div>
  );
};

export default TableImage;
