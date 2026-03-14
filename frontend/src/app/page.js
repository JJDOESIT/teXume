"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./page.module.css";

import Link from "next/link";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import Review from "../../components/review/review";

export default function Home() {
  const imageRef = useRef(null);
  const [imageHeight, setImageHeight] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    variableWidth: true,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (imageRef.current) {
        setImageHeight(
          imageRef.current.offsetHeight - imageRef.current.offsetHeight / 4,
        );
      }
    });
    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p>
              Land your dream job with our <span>powerful</span> resume builder
            </p>
            <p>
              Create a professional resume using our free builder and templates.
            </p>
          </div>
          <div className={styles.headerButtons}>
            <Link className="secondaryEmeraldButton" href="/browse">
              <p> Browse Templates</p>
            </Link>
            <Link className="secondaryGrayButton" href="/user-info">
              <p>Build Resume</p>
            </Link>
          </div>
          <div className={styles.headerImages} style={{ height: imageHeight }}>
            <img src="/professional.png" ref={imageRef} alt="CV"></img>
            <img src="/italic.png" alt="CV"></img>
            <img src="/split.png" alt="CV"></img>
          </div>
        </div>
        <div className={styles.body}>
          <Slider {...settings} className={styles.slider}>
            <Review
              name="Zoe A."
              message="Made updating my resume quick and painless."
              date="February 1 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Henry Paschke"
              message="This made building my resume way easier than I expected. The templates look professional and it only took me about 10 minutes to finish."
              date="February 18 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="James G."
              message="Really clean interface and simple to use. I liked how quickly I could switch between templates and see the changes instantly."
              date="January 27 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Harley S."
              message="I tried a few other resume builders before this one and this is definitely the easiest. Everything is straightforward and the result looks great."
              date="March 2 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Natalie R."
              message="Super helpful tool. I updated my resume in one sitting and it looks much better than the one I had before."
              date="February 6 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Marcus T."
              message="The templates are really clean and modern. I sent my resume out the same day and already got a couple responses."
              date="January 14 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Olivia P."
              message="Very easy to use and the formatting stayed perfect when I downloaded the PDF. Definitely recommend it."
              date="March 5 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Daniel K."
              message="I liked how simple everything was. No unnecessary steps and the final resume looked great."
              date="February 9 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Rachel M."
              message="Helped me organize my experience in a way that actually looks professional. Took less time than I expected."
              date="January 30 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Ethan L."
              message="Fast and straightforward. I built my resume in about 15 minutes and it looks way better than my old one."
              date="February 22 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Sophia C."
              message="Great templates and easy editing. I liked being able to quickly adjust sections without messing up the layout."
              date="March 8 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Tyler B."
              message="Simple, clean, and actually helpful. I used it to redo my resume before applying for internships."
              date="January 19 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Emma D."
              message="I’ve never made a resume before and this made the whole process really easy to understand."
              date="February 3 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Lucas W."
              message="Very smooth experience. Everything loads fast and the preview updates instantly."
              date="March 1 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Chloe H."
              message="The templates look modern and not outdated like some other builders I tried."
              date="February 12 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Brandon J."
              message="Perfect for quickly updating a resume. I finished mine during a lunch break."
              date="January 25 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Isabella F."
              message="I liked how simple the editor was. No confusing menus or settings."
              date="March 6 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Nathan S."
              message="Very helpful for restructuring my resume. It looks much cleaner now."
              date="February 15 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Ava L."
              message="The preview feature is great. Being able to see the final layout while editing helped a lot."
              date="January 22 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Logan R."
              message="Quick and efficient. I had a new resume ready in less than 20 minutes."
              date="March 4 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Grace T."
              message="Really nice designs and everything exported perfectly."
              date="February 28 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Andrew M."
              message="This saved me a lot of time compared to formatting everything manually in Word."
              date="January 11 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Lily K."
              message="Very intuitive. I didn’t need any instructions to figure it out."
              date="February 19 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Jacob C."
              message="Clean templates and easy editing. Exactly what I needed."
              date="March 7 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Mia V."
              message="I liked how simple it was to add and rearrange sections."
              date="January 29 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Noah P."
              message="Great tool for quickly creating a professional resume."
              date="February 24 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Ella G."
              message="Very polished templates. My resume looks much better now."
              date="March 3 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Ryan D."
              message="Fast and straightforward builder. No unnecessary steps."
              date="January 16 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Hannah B."
              message="Really liked the layout options. Easy to customize without breaking anything."
              date="February 7 2026"
              width="400px"
              height="255px"
            />
            <Review
              name="Caleb N."
              message="The builder is simple but powerful. Great balance of features."
              date="March 9 2026"
              width="400px"
              height="255px"
            />
          </Slider>
        </div>
      </div>
    </section>
  );
}
