import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Download,
  FileDown,
  FileImage,
  Grid3X3,
  Info,
  LockKeyhole,
  Printer,
  RefreshCcw,
  Ruler,
  ScanLine,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';

type Preset = {
  key: string;
  label: string;
  detail: string;
  width: number;
  height: number;
};

type Faq = {
  question: string;
  answer: string;
};

declare global {
  interface Window {
    jspdf?: {
      jsPDF: new (options?: { orientation?: string; unit?: string; format?: string }) => {
        addImage: (imageData: string, format: string, x: number, y: number, width: number, height: number) => void;
        save: (filename: string) => void;
      };
    };
  }
}

const A4_WIDTH = 210;
const A4_HEIGHT = 297;
const DEFAULT_MARGIN = 10;
const EXPORT_SCALE = 300 / 25.4;

const PRESETS: Preset[] = [
  { key: 'stamp', label: 'Stamp size', detail: '20 × 25 mm', width: 20, height: 25 },
  { key: 'passport', label: 'Passport size', detail: '35 × 45 mm', width: 35, height: 45 },
  { key: 'pan', label: 'PAN Card photo', detail: '25 × 35 mm', width: 25, height: 35 },
  { key: 'voter', label: 'Voter ID photo', detail: '25 × 35 mm', width: 25, height: 35 },
  { key: 'us-visa', label: 'Visa photo (US)', detail: '51 × 51 mm', width: 51, height: 51 },
  { key: 'canada', label: 'Canada passport', detail: '50 × 70 mm', width: 50, height: 70 },
  { key: 'china', label: 'China passport', detail: '33 × 48 mm', width: 33, height: 48 },
  { key: 'uae', label: 'UAE passport', detail: '43 × 55 mm', width: 43, height: 55 },
];

const FAQS: Faq[] = [
  {
    question: 'Will my photo be the exact size I selected?',
    answer:
      'Yes. The sheet is laid out using millimetre measurements and exported at 300 DPI. When you print, choose 100% scale or “actual size” and turn off options such as “fit to page”.',
  },
  {
    question: 'What paper size does FitMyPhotoA4 use?',
    answer:
      'Every sheet is exactly A4: 210 × 297 mm, or 8.27 × 11.69 inches. The preview shows the full portrait sheet so you can see the spacing before you download it.',
  },
  {
    question: 'Does my photo leave my device?',
    answer:
      'No. JPG and PNG files are read by your browser and stay on your device. There is no account, upload queue, or server copy. Refreshing this page clears the working photo.',
  },
  {
    question: 'What image format should I upload?',
    answer:
      'Use a clear JPG or PNG. A larger original gives you more room to crop. The maker centres and crops the image to fill your chosen photo rectangle without stretching it.',
  },
  {
    question: 'How do I get the best print quality?',
    answer:
      'Use a well-lit, sharp source image, export the PNG or PDF, and print from a reliable PDF or image viewer at 100% scale. Matte or satin photo paper usually handles official photos well.',
  },
  {
    question: 'Can I use a custom photo size?',
    answer:
      'Yes. Choose Custom size and enter the width and height in millimetres. The fit count and A4 preview update immediately, so you can test an unusual specification before printing.',
  },
  {
    question: 'Why is the number of photos on my sheet different from another tool?',
    answer:
      'Fit count depends on both photo size and spacing. This tool uses a clear 10 mm safety margin around the A4 sheet, then applies your selected gap between photos so cuts do not crowd the edge.',
  },
  {
    question: 'What does the spacing control change?',
    answer:
      'Spacing is the gap between adjacent photo rectangles. A wider gap is easier to cut accurately; a smaller gap can fit more photos. The edge safety margin stays at 10 mm.',
  },
  {
    question: 'Can I download a PDF for a print shop?',
    answer:
      'Yes. Download PDF creates a print-ready A4 PDF locally in your browser. It is a simple, portable file that most print shops can open. Always ask the shop to print at 100% scale.',
  },
  {
    question: 'How many copies should I print?',
    answer:
      'Print one sheet first if the photo is for an important application. Check the physical measurement with a ruler, then print extra sheets once the crop, paper, and scaling are confirmed.',
  },
];

function drawPhoto(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;
  context.save();
  context.beginPath();
  context.rect(x, y, width, height);
  context.clip();
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  context.restore();
}

function drawSheet(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement | null,
  widthMm: number,
  heightMm: number,
  spacingMm: number,
  scale = 4,
) {
  const width = Math.round(A4_WIDTH * scale);
  const height = Math.round(A4_HEIGHT * scale);
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) return 0;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.fillStyle = '#fbfaf5';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = '#d9d7cf';
  context.lineWidth = Math.max(1, scale / 2);
  context.strokeRect(DEFAULT_MARGIN * scale, DEFAULT_MARGIN * scale, (A4_WIDTH - DEFAULT_MARGIN * 2) * scale, (A4_HEIGHT - DEFAULT_MARGIN * 2) * scale);

  const columns = Math.max(0, Math.floor((A4_WIDTH - DEFAULT_MARGIN * 2 + spacingMm) / (widthMm + spacingMm)));
  const rows = Math.max(0, Math.floor((A4_HEIGHT - DEFAULT_MARGIN * 2 + spacingMm) / (heightMm + spacingMm)));
  const photoWidth = widthMm * scale;
  const photoHeight = heightMm * scale;
  const gap = spacingMm * scale;

  context.setLineDash([scale * 1.5, scale * 1.5]);
  context.lineWidth = Math.max(1, scale / 3);
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = (DEFAULT_MARGIN + column * (widthMm + spacingMm)) * scale;
      const y = (DEFAULT_MARGIN + row * (heightMm + spacingMm)) * scale;
      if (image) {
        context.setLineDash([]);
        drawPhoto(context, image, x, y, photoWidth, photoHeight);
        context.setLineDash([scale * 1.5, scale * 1.5]);
        context.strokeStyle = 'rgba(31, 53, 61, .28)';
        context.strokeRect(x, y, photoWidth, photoHeight);
      } else {
        context.strokeStyle = '#b6d2ce';
        context.strokeRect(x, y, photoWidth, photoHeight);
      }
    }
  }
  context.setLineDash([]);
  return columns * rows;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function Home() {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('');
  const [objectUrl, setObjectUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const [presetKey, setPresetKey] = useState('passport');
  const [customWidth, setCustomWidth] = useState(35);
  const [customHeight, setCustomHeight] = useState(45);
  const [spacing, setSpacing] = useState(4);
  const [dragging, setDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedPreset = useMemo(
    () => PRESETS.find((preset) => preset.key === presetKey),
    [presetKey],
  );
  const photoWidth = presetKey === 'custom' ? customWidth : selectedPreset?.width ?? 35;
  const photoHeight = presetKey === 'custom' ? customHeight : selectedPreset?.height ?? 45;
  const columns = Math.max(0, Math.floor((A4_WIDTH - DEFAULT_MARGIN * 2 + spacing) / (photoWidth + spacing)));
  const rows = Math.max(0, Math.floor((A4_HEIGHT - DEFAULT_MARGIN * 2 + spacing) / (photoHeight + spacing)));
  const fitCount = columns * rows;

  useEffect(() => {
    document.title = 'FitMyPhotoA4 — Professional A4 Photo Sheet Maker';
    const description = 'Make exact-size passport and ID photo sheets for A4 printing. Local-only, precise, and free.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    const openGraph = [
      ['og:title', document.title],
      ['og:description', description],
      ['og:type', 'website'],
    ];
    openGraph.forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, []);

  useEffect(() => {
    if (!previewCanvasRef.current) return;
    drawSheet(previewCanvasRef.current, image, photoWidth, photoHeight, spacing, 4);
  }, [image, photoWidth, photoHeight, spacing]);

  useEffect(() => () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }, [objectUrl]);

  const loadFile = (file?: File) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setFileError('Please choose a JPG or PNG image.');
      return;
    }
    setFileError('');
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    const nextUrl = URL.createObjectURL(file);
    const nextImage = new Image();
    nextImage.onload = () => setImage(nextImage);
    nextImage.onerror = () => {
      setImage(null);
      setFileError('That image could not be read. Try another JPG or PNG.');
      URL.revokeObjectURL(nextUrl);
    };
    nextImage.src = nextUrl;
    setObjectUrl(nextUrl);
    setFileName(file.name);
  };

  const reset = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl('');
    setImage(null);
    setFileName('');
    setFileError('');
    setPresetKey('passport');
    setCustomWidth(35);
    setCustomHeight(45);
    setSpacing(4);
  };

  const exportSheet = (type: 'png' | 'pdf') => {
    if (!image || !image.complete || image.naturalWidth === 0) {
      setFileError('Please wait for the photo to finish loading, then try the download again.');
      return;
    }
    // Use a fresh offscreen canvas for every export. This avoids browser print
    // viewers reusing the tiny visually-hidden preview canvas dimensions.
    const exportCanvas = document.createElement('canvas');
    const copies = drawSheet(exportCanvas, image, photoWidth, photoHeight, spacing, EXPORT_SCALE);
    if (copies === 0) {
      setFileError('This photo size is too large to fit on an A4 sheet.');
      return;
    }
    if (type === 'png') {
      exportCanvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, `a4-photo-sheet-${photoWidth}x${photoHeight}mm.png`);
      }, 'image/png');
      return;
    }
    const pdfConstructor = window.jspdf?.jsPDF;
    if (!pdfConstructor) {
      setFileError('PDF export is still loading. Please try again in a moment.');
      return;
    }
    const pdf = new pdfConstructor({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    pdf.addImage(exportCanvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, A4_WIDTH, A4_HEIGHT);
    pdf.save(`a4-photo-sheet-${photoWidth}x${photoHeight}mm.pdf`);
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" data-testid="link-brand">
          <span className="brand-mark"><span>A4</span></span>
          <span className="brand-copy">
            <span className="brand-name">FitMyPhotoA4</span>
            <span className="brand-tagline">professional photo sheets</span>
          </span>
        </a>
        <div className="header-note"><ShieldCheck size={14} /> Local-only · no upload</div>
      </header>

      <main id="top" className="main-wrap">
        <section className="hero" aria-labelledby="page-title">
          <div>
            <div className="eyebrow">Exact sizes · less waste</div>
            <h1 id="page-title">Professional sheets.<br /><em>Perfectly measured.</em></h1>
            <p className="hero-intro">
              Turn one photo into a precisely measured A4 print sheet for passports, visas, and ID cards. Set the size, leave a sensible cutting gap, and take the file to any affordable printer.
            </p>
          </div>
          <div className="hero-side">
            <div className="hero-stamp" aria-label="A4 paper dimensions">
              <div className="hero-stamp-inner">
                <strong>210<br />× 297</strong>
                <small>millimetres<br />A4 portrait</small>
              </div>
            </div>
          </div>
        </section>

        <section className="workspace" aria-label="Photo sheet maker">
          <div className="panel controls">
            <div className="panel-label"><span>Build your sheet</span><span className="panel-index">01 / 02</span></div>
            <div
              className={`upload-zone${dragging ? ' dragging' : ''}`}
              onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); loadFile(event.dataTransfer.files[0]); }}
              data-testid="dropzone-photo"
            >
              <div className="upload-icon"><UploadCloud size={19} /></div>
              <strong>{image ? 'Replace your photo' : 'Drop a photo here'}</strong>
              <p>JPG or PNG · your image stays in this browser</p>
              <button className="button button-primary" type="button" onClick={() => fileInputRef.current?.click()} data-testid="button-upload-photo">
                <FileImage size={14} /> Choose photo
              </button>
              <input
                ref={fileInputRef}
                className="sr-only"
                type="file"
                accept="image/jpeg,image/png"
                onChange={(event) => loadFile(event.target.files?.[0])}
                data-testid="input-photo-file"
              />
              {fileName && <div className="file-name" data-testid="text-uploaded-filename"><Check size={13} /> {fileName}</div>}
              {fileError && <div className="file-name" style={{ color: 'hsl(var(--destructive))' }} role="alert" data-testid="status-file-error">{fileError}</div>}
            </div>

            <div className="control-group">
              <div className="control-heading"><label htmlFor="photo-type">Photo type</label><span className="control-value" data-testid="text-photo-size">{photoWidth} × {photoHeight} mm</span></div>
              <select id="photo-type" className="select-input" value={presetKey} onChange={(event) => setPresetKey(event.target.value)} data-testid="select-photo-type">
                {PRESETS.map((preset) => <option key={preset.key} value={preset.key}>{preset.label} — {preset.detail}</option>)}
                <option value="custom">Custom size — enter your own mm</option>
              </select>
              {presetKey === 'custom' && (
                <div className="custom-fields">
                  <div><label className="field-label" htmlFor="custom-width">Width</label><input id="custom-width" className="number-input" type="number" min="10" max="100" value={customWidth} onChange={(event) => setCustomWidth(Math.max(10, Number(event.target.value) || 10))} data-testid="input-custom-width" /></div>
                  <div><label className="field-label" htmlFor="custom-height">Height</label><input id="custom-height" className="number-input" type="number" min="10" max="120" value={customHeight} onChange={(event) => setCustomHeight(Math.max(10, Number(event.target.value) || 10))} data-testid="input-custom-height" /></div>
                </div>
              )}
            </div>

            <div className="control-group">
              <div className="control-heading"><label htmlFor="spacing">Cutting space</label><span className="control-value" data-testid="text-spacing">{spacing} mm gap</span></div>
              <input id="spacing" type="range" min="2" max="16" step="1" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} data-testid="input-spacing" />
              <div className="range-scale"><span>2 mm · compact</span><span>16 mm · easy cuts</span></div>
            </div>
            <div className="tip"><Info size={15} /><span>A 10 mm edge margin is reserved on every side. It keeps your sheet inside the printable area of most home and shop printers.</span></div>
            <div className="control-actions">
              <button className="button button-line" type="button" onClick={reset} data-testid="button-reset"><RefreshCcw size={13} /> Reset</button>
              <span className="header-note"><Ruler size={13} /> 300 DPI export</span>
            </div>
          </div>

          <div className="panel preview-panel">
            <div className="preview-top">
              <div className="panel-label"><span>A4 live preview</span><span className="panel-index">02 / 02</span></div>
              <span className="preview-meta">portrait / 100%</span>
            </div>
            <div className="canvas-stage">
              <canvas ref={previewCanvasRef} className="a4-canvas" aria-label="Live A4 photo sheet preview" data-testid="canvas-a4-preview" />
              {!image && <div className="preview-empty"><ScanLine size={26} /><div>Your measured sheet will appear here after you choose a photo.</div></div>}
            </div>
            <div className="preview-bottom">
              <div className="fit-count" data-testid="status-fit-count"><strong>{fitCount}</strong><span>photos fit on this A4 sheet ({columns} × {rows})</span></div>
              <div className="download-actions">
                <button className="button button-quiet" type="button" onClick={() => exportSheet('png')} disabled={!image} data-testid="button-download-png"><Download size={14} /> PNG</button>
                <button className="button button-primary" type="button" onClick={() => exportSheet('pdf')} disabled={!image} data-testid="button-download-pdf"><FileDown size={14} /> Download PDF</button>
              </div>
            </div>
            <div className="privacy-line"><LockKeyhole size={13} /> Everything happens locally. Nothing is sent or stored.</div>
          </div>
        </section>

        <section className="content" aria-label="A4 photo printing guide">
          <div className="content-intro">
            <div>
              <div className="section-kicker">The practical bit</div>
              <h2>Print more.<br /><em>Pay less.</em></h2>
            </div>
            <div>
              <p>A photo shop may charge for every individual print. An A4 sheet gives you a measured, cut-ready layout you can print at home or take to a low-cost copy shop. One sheet can hold a whole set of spares.</p>
              <div className="metric-row">
                <div className="metric"><strong>10 mm</strong><span>quiet edge margin<br />for reliable printing</span></div>
                <div className="metric"><strong>300 DPI</strong><span>high-resolution<br />download output</span></div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <div className="section-head">
              <h3>Common official sizes</h3>
              <p>Requirements vary by authority. Check your application before you print; this table is a useful starting point.</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="size-table">
                <thead><tr><th>Country / document</th><th>Photo size</th><th>Typical background</th></tr></thead>
                <tbody>
                  <tr><td>United Kingdom · passport</td><td>35 × 45 mm</td><td>Plain light grey or cream</td></tr>
                  <tr><td>United States · passport / visa</td><td>51 × 51 mm</td><td>White or off-white</td></tr>
                  <tr><td>Canada · passport</td><td>50 × 70 mm</td><td>White or light</td></tr>
                  <tr><td>Australia · passport</td><td>35 × 45 mm</td><td>Plain light background</td></tr>
                  <tr><td>India · passport / visa</td><td>35 × 35 mm</td><td>White background</td></tr>
                  <tr><td>Schengen · visa</td><td>35 × 45 mm</td><td>Light, even background</td></tr>
                  <tr><td>Japan · passport</td><td>35 × 45 mm</td><td>Plain, light background</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-section">
            <div className="money-layout">
              <div className="money-note"><strong>The small maths<br />behind the saving.</strong><p>At a print shop, five identical ID photos can cost more than a full colour A4 page. Arrange them yourself, pay for one sheet, and keep the file for the next application.</p></div>
              <div className="steps">
                <div className="step"><span className="step-num">01</span><div><strong>Choose a clear original</strong><p>Upload the largest, sharpest photo you have. The tool crops the edges to fit without stretching your face.</p></div></div>
                <div className="step"><span className="step-num">02</span><div><strong>Set the authority’s size</strong><p>Pick a preset or enter the exact width and height in millimetres. The count updates as you work.</p></div></div>
                <div className="step"><span className="step-num">03</span><div><strong>Print at actual size</strong><p>Download PNG or PDF, then select 100% / actual size in your print dialog. Never choose “fit to page”.</p></div></div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <div className="section-head">
              <h3>Small mistakes, expensive reprints</h3>
              <p>A quick check before you press print can save a trip, a fee, and an awkward passport appointment.</p>
            </div>
            <div className="mistakes-grid">
              <div className="mistake"><div className="mistake-mark">01 /</div><strong>Wrong physical scale</strong><p>“Fit to page” changes the size. Use actual size and measure one finished photo with a ruler.</p></div>
              <div className="mistake"><div className="mistake-mark">02 /</div><strong>Low-resolution source</strong><p>A tiny messaging-app download can look soft when printed. Start with an original camera file.</p></div>
              <div className="mistake"><div className="mistake-mark">03 /</div><strong>Background or shadows</strong><p>Check the destination’s rules. A pale wall is not always the same as a compliant plain background.</p></div>
            </div>
          </div>

          <div className="content-section" id="faq">
            <div className="section-head">
              <h3>Questions, answered</h3>
              <p>Ten useful answers for the moment between downloading your sheet and putting it in the printer.</p>
            </div>
            <div className="faq-list">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className="faq-item" key={faq.question}>
                    <button className={`faq-button${isOpen ? ' open' : ''}`} type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} data-testid={`button-faq-${index + 1}`}>
                      <span>{String(index + 1).padStart(2, '0')} · {faq.question}</span><ChevronDown size={15} />
                    </button>
                    {isOpen && <div className="faq-answer" data-testid={`text-faq-answer-${index + 1}`}>{faq.answer}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="footer">
          <span><Printer size={12} style={{ verticalAlign: 'middle', marginRight: 7 }} /> A quiet tool for the print counter.</span>
          <span><Grid3X3 size={12} style={{ verticalAlign: 'middle', marginRight: 7 }} /> Check your authority’s requirements · print at 100%</span>
        </footer>
      </main>
      <canvas ref={exportCanvasRef} className="sr-only" aria-hidden="true" />
    </div>
  );
}

export default Home;