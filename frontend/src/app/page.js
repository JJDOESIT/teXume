"use client";

import styles from "./page.module.css";

import Link from "next/link";
import Review from "../../components/review/review";
import Loading from "../../components/loading/loading";
import Question from "../../components/question/question";
import Marquee from "react-fast-marquee";
import year from "year";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageHeight, setImageHeight] = useState(0);

  // Set the image height on resize and disable loading
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (imageRef && imageRef.current) {
        setImageHeight(
          imageRef.current.offsetHeight - imageRef.current.offsetHeight / 4,
        );
        setIsLoading(false);
      }
    });
    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.container}
      style={isLoading ? { overflow: "hidden" } : {}}
    >
      <div
        className={styles.wrapper}
        style={isLoading ? { opacity: 0, height: 0 } : {}}
      >
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
              <p>Browse Templates</p>
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
          <div className={styles.testimonial}>
            <p>Our resumes have helped people get hired at</p>
            <div className={styles.logos}>
              <img src="/logos/amazon.svg"></img>
              <img src="/logos/apple.svg"></img>
              <img src="/logos/metlife.svg"></img>
              <img src="/logos/microsoft.svg"></img>
              <img src="/logos/rockwell.svg"></img>
              <img src="/logos/southwest.svg"></img>
            </div>
          </div>
          <Marquee>
            <Review
              name="Zoe A."
              message="Made updating my resume quick and painless."
              date="February 1 2026"
            />
            <Review
              name="Henry P."
              message="This made building my resume way easier than I expected. The templates look professional and it only took me about 10 minutes to finish."
              date="February 18 2026"
            />
            <Review
              name="James G."
              message="Really clean interface and simple to use. I liked how quickly I could switch between templates and see the changes instantly."
              date="January 27 2026"
            />
            <Review
              name="Harley S."
              message="I tried a few other resume builders before this one and this is definitely the easiest. Everything is straightforward and the result looks great."
              date="March 2 2026"
            />
            <Review
              name="Natalie R."
              message="Super helpful tool. I updated my resume in one sitting and it looks much better than the one I had before."
              date="February 6 2026"
            />
            <Review
              name="Marcus T."
              message="The templates are really clean and modern. I sent my resume out the same day and already got a couple responses."
              date="January 14 2026"
            />
            <Review
              name="Olivia P."
              message="Very easy to use and the formatting stayed perfect when I downloaded the PDF. Definitely recommend it."
              date="March 5 2026"
            />
            <Review
              name="Daniel K."
              message="I liked how simple everything was. No unnecessary steps and the final resume looked great."
              date="February 9 2026"
            />
            <Review
              name="Rachel M."
              message="Helped me organize my experience in a way that actually looks professional. Took less time than I expected."
              date="January 30 2026"
            />
            <Review
              name="Ethan L."
              message="Fast and straightforward. I built my resume in about 15 minutes and it looks way better than my old one."
              date="February 22 2026"
            />
            <Review
              name="Sophia C."
              message="Great templates and easy editing. I liked being able to quickly adjust sections without messing up the layout."
              date="March 8 2026"
            />
            <Review
              name="Tyler B."
              message="Simple, clean, and actually helpful. I used it to redo my resume before applying for internships."
              date="January 19 2026"
            />
            <Review
              name="Emma D."
              message="I’ve never made a resume before and this made the whole process really easy to understand."
              date="February 3 2026"
            />
            <Review
              name="Lucas W."
              message="Very smooth experience. Everything loads fast and the preview updates instantly."
              date="March 1 2026"
            />
            <Review
              name="Chloe H."
              message="The templates look modern and not outdated like some other builders I tried."
              date="February 12 2026"
            />
            <Review
              name="Brandon J."
              message="Perfect for quickly updating a resume. I finished mine during a lunch break."
              date="January 25 2026"
            />
            <Review
              name="Isabella F."
              message="I liked how simple the editor was. No confusing menus or settings."
              date="March 6 2026"
            />
            <Review
              name="Nathan S."
              message="Very helpful for restructuring my resume. It looks much cleaner now."
              date="February 15 2026"
            />
            <Review
              name="Ava L."
              message="The preview feature is great. Being able to see the final layout while editing helped a lot."
              date="January 22 2026"
            />
            <Review
              name="Logan R."
              message="Quick and efficient. I had a new resume ready in less than 20 minutes."
              date="March 4 2026"
            />
            <Review
              name="Grace T."
              message="Really nice designs and everything exported perfectly."
              date="February 28 2026"
            />
            <Review
              name="Andrew M."
              message="This saved me a lot of time compared to formatting everything manually in Word."
              date="January 11 2026"
            />
            <Review
              name="Lily K."
              message="Very intuitive. I didn’t need any instructions to figure it out."
              date="February 19 2026"
            />
            <Review
              name="Jacob C."
              message="Clean templates and easy editing. Exactly what I needed."
              date="March 7 2026"
            />
            <Review
              name="Mia V."
              message="I liked how simple it was to add and rearrange sections."
              date="January 29 2026"
            />
            <Review
              name="Noah P."
              message="Great tool for quickly creating a professional resume."
              date="February 24 2026"
            />
            <Review
              name="Ella G."
              message="Very polished templates. My resume looks much better now."
              date="March 3 2026"
            />
            <Review
              name="Ryan D."
              message="Fast and straightforward builder. No unnecessary steps."
              date="January 16 2026"
            />
            <Review
              name="Hannah B."
              message="Really liked the layout options. Easy to customize without breaking anything."
              date="February 7 2026"
            />
            <Review
              name="Caleb N."
              message="The builder is simple but powerful. Great balance of features."
              date="March 9 2026"
            />
          </Marquee>
        </div>

        <div className={styles.questions}>
          <div className={styles.questionsTitle}>
            <p>Frequently Asked Questions</p>
          </div>
          <div className={styles.questionsList}>
            <Question
              question="What is TeXume?"
              answer={
                <p>
                  Texume is a web-based resume builder that helps users quickly
                  create clean, professional resumes using modern templates.
                  Users can enter their information, customize sections, and
                  instantly generate a formatted resume ready for job
                  applications.
                </p>
              }
            ></Question>
            <div className="lineSpacer"></div>
            <Question
              question="What are the advantages of TeXume?"
              answer={
                <p>
                  TeXume uses a LaTeX-based backend that allows resumes to be
                  exported as both PDF and LaTeX files. This ensures consistent
                  formatting and produces structured documents that work well
                  with ATS used by many employers to scan and parse resumes.
                  <br></br>
                  <br></br>
                  The platform supports a full set of resume features, including
                  customizable sections and professional layouts, while making
                  it easy to switch between multiple templates without losing
                  your content.
                </p>
              }
            ></Question>
            <div className="lineSpacer"></div>
            <Question
              question="What is an ATS?"
              answer={
                <p>
                  ATS stands for Applicant Tracking System. It is software that
                  companies use to collect, scan, and organize job applications.
                  When you submit a resume online, it is often processed by an
                  ATS before a recruiter ever sees it. The system scans resumes
                  for keywords, formatting, and relevant experience to determine
                  whether a candidate matches the job description. Because of
                  this, using clear formatting and ATS-friendly templates can
                  improve the chances that your resume is properly parsed and
                  reviewed by a hiring manager.
                </p>
              }
            ></Question>
            <div className="lineSpacer"></div>
            <Question
              question="What resume file format can I export?"
              answer={
                <p>
                  You can download your resume as a PDF or as LaTeX source
                  files.
                  <br></br>
                  <br></br>
                  PDF is the most common format for submitting resumes because
                  it preserves the layout and formatting across all devices and
                  is widely accepted by job applications.
                  <br></br>
                  <br></br>
                  LaTeX export allows you to download the underlying source code
                  used to generate the resume, which is useful if you want to
                  further customize the template, edit it manually, or compile
                  it yourself.
                </p>
              }
            ></Question>
            <div className="lineSpacer"></div>
            <Question
              question="How do I choose the right template?"
              answer={
                <p>
                  The best template depends on the type of job you are applying
                  for and the style you prefer. For most professional or
                  technical roles, a clean and simple template works best
                  because it is easy for recruiters and ATS to read.
                  <br></br>
                  <br></br>
                  Creative fields may allow for more visually styled templates.
                  In general, prioritize clear section headings, readable fonts,
                  and a layout that highlights your experience and skills
                  without being cluttered.
                </p>
              }
            ></Question>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerGrid}>
            <div className={styles.columnOne}>
              <div className={styles.footerLogo}>
                <img src="/logo.png" alt="Logo" />
                <p>TeXume.net</p>
              </div>
              <div className={styles.columnOneText}>
                <p>
                  A powerful online resume builder with PDF and LaTeX export
                  features to help you create a professional resume easily.
                </p>
                <p>© {year()} TeXume All rights reserved</p>
              </div>
            </div>
            <div className={styles.column}>
              <p className={styles.columnTitle}>Explore</p>
              <Link href="/browse">Templates</Link>
              <Link href="/user-info">Build resume</Link>
            </div>
            <div className={styles.column}>
              <p className={styles.columnTitle}>Company</p>
              <Link
                href="https://www.linkedin.com/in/james-gaboriault-whitcomb/"
                target="_blank"
              >
                Contact
              </Link>
              <Link href="/tos">Terms of service</Link>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading></Loading>}
    </section>
  );
}
