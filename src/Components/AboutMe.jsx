import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";

const AboutMe = ({ reviews }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const genres = reviews?.map((review) => review?.genre);
    setData(genres);
  }, []);
  return (
    <div className="text-center text-2xl">
      <h1
        style={{ paddingTop: "5rem", margin: "auto 0", fontWeight: "normal" }}
      >
        Review Genre added{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>
          {/* Style will be inherited from the parent element */}
          <Typewriter
            words={data?.length>0 && data}
            loop={5}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h1>
      <Fade>
  <p>I will gently appear as I enter the viewport</p>
</Fade>
    </div>
  );
};

export default AboutMe;
