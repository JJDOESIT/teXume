import styles from "./tos.module.css";

export default function Tos() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.updated}>Last updated: 03/22/2026</p>

          <section className={styles.section}>
            <h2 className={styles.heading}>1. Overview</h2>
            <p className={styles.text}>
              Welcome to TeXume. By using our website, you agree to these Terms
              of Service. TeXume provides tools to build, manage, and export
              resumes.
            </p>
          </section>

          <div className="lineSpacer"></div>

          <section className={styles.section}>
            <h2 className={styles.heading}>2. Use of Service</h2>
            <p className={styles.text}>
              You agree to use TeXume only for lawful purposes. You are
              responsible for the content you create and upload.
            </p>
          </section>

          <div className="lineSpacer"></div>

          <section className={styles.section}>
            <h2 className={styles.heading}>3. User Content</h2>
            <p className={styles.text}>
              You retain ownership of your resume data. By using TeXume, you
              grant us permission to store and process your content to provide
              the service.
            </p>
          </section>

          <div className="lineSpacer"></div>

          <section className={styles.section}>
            <h2 className={styles.heading}>4. Accounts</h2>
            <p className={styles.text}>
              You are responsible for maintaining the security of your account
              and any activity under it.
            </p>
          </section>

          <div className="lineSpacer"></div>

          <section className={styles.section}>
            <h2 className={styles.heading}>5. Availability</h2>
            <p className={styles.text}>
              We strive to keep TeXume available at all times but do not
              guarantee uninterrupted access.
            </p>
          </section>

          <div className="lineSpacer"></div>

          <section className={styles.section}>
            <h2 className={styles.heading}>6. Limitation of Liability</h2>
            <p className={styles.text}>
              TeXume is provided "as is" without warranties of any kind. We are
              not responsible for any damages resulting from use of the service.
            </p>
          </section>

          <div className="lineSpacer"></div>

          <section className={styles.section}>
            <h2 className={styles.heading}>7. Changes</h2>
            <p className={styles.text}>
              We may update these Terms at any time. Continued use of the
              service means you accept the updated terms.
            </p>
          </section>

          <div className="lineSpacer"></div>

          <section className={styles.section}>
            <h2 className={styles.heading}>8. Contact</h2>
            <p className={styles.text}>
              If you have questions, contact us at texume.net@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
