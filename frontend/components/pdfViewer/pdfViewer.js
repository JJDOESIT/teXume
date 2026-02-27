import styles from "./pdfViewer.module.css";

import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PdfViewer(props) {
  const [previousPdfUrl, setPreviousPdfUrl] = useState(null);
  const [previousPages, setPreviousPages] = useState(null);
  const [currentPages, setCurrentPages] = useState(null);

  const pdfUpdated = previousPdfUrl === props.pdfUrl;
  const shouldShowPreviousDocument = previousPdfUrl != null && !pdfUpdated;

  return (
    <div className={styles.pdfContainer}>
      {shouldShowPreviousDocument && previousPdfUrl && previousPages && (
        <Document key={previousPdfUrl} file={previousPdfUrl} loading={null}>
          {Array.from(new Array(previousPages), (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              renderTextLayer={false}
              loading={null}
              renderAnnotationLayer={false}
              onRenderSuccess={() => setPreviousPdfUrl(props.pdfUrl)}
            />
          ))}
        </Document>
      )}

      <Document
        key={props.pdfUrl}
        className={shouldShowPreviousDocument && styles.loadingNewPdf}
        file={props.pdfUrl}
        loading={null}
        onLoadSuccess={({ numPages }) => {
          setCurrentPages(numPages);
        }}
      >
        {currentPages != null &&
          Array.from(new Array(currentPages), (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              renderTextLayer={false}
              loading={null}
              renderAnnotationLayer={false}
              onRenderSuccess={() => {
                setPreviousPages(currentPages);
                setPreviousPdfUrl(props.pdfUrl);
              }}
            />
          ))}
      </Document>
    </div>
  );
}
