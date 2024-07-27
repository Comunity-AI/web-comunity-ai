"use client";

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

export default function ViewerPDF({ data }: { data: string }) {
  const pdfData = Uint8Array.from(data.split(',').map(v => Number(v)))
  const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
  const pdf = URL.createObjectURL(pdfBlob)

  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
  const options = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  };

  return (
    <div className='h-max flex m-auto justify-center'>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            ))}
      </Document>
    </div>
  );
}