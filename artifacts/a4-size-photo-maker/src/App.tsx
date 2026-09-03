import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Download,
  FileDown,
  FileImage,
  Info,
  LockKeyhole,
  Printer,
  RefreshCcw,
  Ruler,
  ScanLine,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import { ALL_SEO_PAGES, type SEOPage } from './seoContent';

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
const STANDARD_DPI = 300;
const HD_DPI = 600;

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
  blackAndWhite: boolean,
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
  context.filter = blackAndWhite ? 'grayscale(1)' : 'none';
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
  blackAndWhite = false,
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
  context.setLineDash([scale * 1.5, scale * 1.5]);
  context.lineWidth = Math.max(1, scale / 3);
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = (DEFAULT_MARGIN + column * (widthMm + spacingMm)) * scale;
      const y = (DEFAULT_MARGIN + row * (heightMm + spacingMm)) * scale;
      if (image) {
        context.setLineDash([]);
        drawPhoto(context, image, x, y, photoWidth, photoHeight, blackAndWhite);
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

function setMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function setPropertyMeta(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function SiteHeader({ currentPath }: { currentPath: string }) {
  const homeLink = currentPath === '/' ? '#top' : '/';
  const toolLink = currentPath === '/' ? '#tool' : '/#tool';
  const guideLink = '/how-it-works';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand" href={homeLink} data-testid="link-brand">
          <svg className="brand-logo" viewBox="0 0 40 34" aria-hidden="true">
            <rect x="1.5" y="7.5" width="37" height="25" rx="2" />
            <path d="M12 7.5 14.8 2h10.4L28 7.5" />
            <circle cx="20" cy="20" r="7" />
            <circle className="brand-logo-dot" cx="32.5" cy="12.5" r="1.5" />
          </svg>
          <span className="brand-copy">
            <span className="brand-name">FitMyPhotoA4</span>
            <span className="brand-tagline">professional photo sheets</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href={toolLink}>Maker</a>
          <a href={guideLink}>Guide</a>
          <a href="/faq">FAQ</a>
        </nav>
        <div className="header-note"><ShieldCheck size={14} /> Local-only · no upload</div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <span><Printer size={12} style={{ verticalAlign: 'middle', marginRight: 7 }} /> A quiet tool for the print counter.</span>
      <span className="footer-links">
        <a href="/passport-photo-size-maker">Passport</a>
        <a href="/pan-card-photo-maker">PAN Card</a>
        <a href="/voter-id-photo-maker">Voter ID</a>
        <a href="/how-it-works">How it works</a>
        <a href="/privacy-policy">Privacy</a>
        <a href="/terms-of-use">Terms</a>
      </span>
    </footer>
  );
}

function TutorialVisualGuide() {
  return (
    <section className="tutorial-visuals" aria-labelledby="tutorial-visual-title">
      <div className="tutorial-visual-intro">
        <div>
          <div className="section-kicker">See the workflow</div>
          <h2 id="tutorial-visual-title">Three calm steps.<br /><em>One clean sheet.</em></h2>
        </div>
        <p>These visual screens mirror the controls inside FitMyPhotoA4, so you know what to look for before you start. The photo stays in your browser while you move from upload to a measured A4 preview and finally to a print-ready download.</p>
      </div>

      <div className="tutorial-step-grid">
        <article className="tutorial-step-card">
          <div className="tutorial-step-heading"><span>01</span><div><strong>Upload</strong><small>Choose one clear JPG or PNG</small></div></div>
          <figure className="tutorial-screen upload-screen" aria-label="Upload screen showing the Choose photo button">
            <div className="screen-bar"><span>Build your sheet</span><span>01 / 02</span></div>
            <div className="screen-upload-zone">
              <div className="screen-upload-icon"><UploadCloud size={17} /></div>
              <strong>Drop a photo here</strong>
              <span>JPG or PNG · local in this browser</span>
              <span className="screen-button screen-button-primary"><FileImage size={12} /> Choose photo</span>
              <div className="screen-check"><Check size={11} /> passport-original.jpg</div>
            </div>
            <div className="screen-note"><ShieldCheck size={12} /> Nothing is sent or stored.</div>
          </figure>
          <p className="tutorial-caption">Pick the largest, sharpest original you have. A full-resolution camera or phone photo gives the crop more detail.</p>
        </article>

        <article className="tutorial-step-card">
          <div className="tutorial-step-heading"><span>02</span><div><strong>Arrange</strong><small>Set the size and inspect the crop</small></div></div>
          <figure className="tutorial-screen arrange-screen" aria-label="Arrange screen showing the A4 live preview and measured photo grid">
            <div className="screen-bar"><span>A4 live preview</span><span>portrait / 100%</span></div>
            <div className="mini-a4">
              <div className="mini-a4-label">FitMyPhotoA4 <span>210 × 297 mm</span></div>
              <div className="mini-photo-grid">
                {Array.from({ length: 12 }, (_, index) => <span key={index} className="mini-photo" />)}
              </div>
            </div>
            <div className="screen-preview-footer"><strong>24</strong><span>photos fit on this A4 sheet</span><Ruler size={13} /></div>
          </figure>
          <p className="tutorial-caption">Choose Passport, PAN Card, Voter ID, or Custom size. Then adjust the cutting gap and check that the face is comfortably inside each rectangle.</p>
        </article>

        <article className="tutorial-step-card">
          <div className="tutorial-step-heading"><span>03</span><div><strong>Download</strong><small>Print at actual size</small></div></div>
          <figure className="tutorial-screen download-screen" aria-label="Download screen showing PNG and Download PDF actions">
            <div className="screen-bar"><span>Ready to print</span><span>300 DPI</span></div>
            <div className="download-sheet">
              <div className="pdf-icon"><FileDown size={22} /></div>
              <strong>a4-photo-sheet-35x45mm.pdf</strong>
              <span>A4 portrait · measured layout</span>
            </div>
            <div className="screen-download-actions"><span className="screen-button">PNG</span><span className="screen-button screen-button-primary"><Download size={12} /> Download PDF</span></div>
            <div className="print-rule"><Printer size={12} /><strong>Print at 100%</strong><span>Actual size · A4 paper</span></div>
          </figure>
          <p className="tutorial-caption">Download PDF for a print shop or PNG for an image workflow. In the print dialog, turn off “Fit to page” and measure one test copy.</p>
        </article>
      </div>
    </section>
  );
}

function ContentPage({ page }: { page: SEOPage }) {
  useEffect(() => {
    document.title = page.title;
    setMeta('description', page.description);
    setPropertyMeta('og:title', page.title);
    setPropertyMeta('og:description', page.description);
    setMeta('twitter:title', page.title);
    setMeta('twitter:description', page.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', new URL(page.path, window.location.origin).toString());
  }, [page]);

  return (
    <div className="app-shell">
      <SiteHeader currentPath={page.path} />
      <main className="main-wrap seo-page">
        <section className="seo-hero" aria-labelledby="seo-page-title">
          <div className="seo-hero-copy">
            <div className="eyebrow">{page.eyebrow}</div>
            <h1 id="seo-page-title">{page.title}</h1>
            <p className="hero-intro">{page.intro}</p>
            <div className="seo-hero-actions">
              <a className="button button-primary" href="/#tool">Open the photo maker</a>
              <a className="button button-line" href={page.faqItems ? '#tutorial-faq' : '/faq'}>Read common questions</a>
            </div>
          </div>
          <div className="seo-hero-card">
            <span className="section-kicker">FitMyPhotoA4</span>
            <strong>Measured in millimetres.</strong>
            <p>Local browser processing, practical print guidance, and a clean A4 layout for your next document photo.</p>
            <span className="seo-hero-card-mark">210 × 297 mm</span>
          </div>
        </section>

        {page.path === '/how-it-works' && <TutorialVisualGuide />}

        <article className="seo-article">
          {page.sections.map((section, index) => (
            <section className="seo-section" key={section.heading}>
              <div className="seo-section-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="seo-section-copy">
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </article>

        {page.faqItems && (
          <section className="tutorial-faq" id="tutorial-faq" aria-labelledby="tutorial-faq-title">
            <div className="section-head">
              <div>
                <div className="section-kicker">Tutorial FAQ</div>
                <h2 id="tutorial-faq-title">Questions before<br /><em>your first sheet.</em></h2>
              </div>
              <p>Quick answers for new users who want to upload, arrange, download, and print without guesswork.</p>
            </div>
            <div className="faq-list">
              {page.faqItems.map((faq, index) => (
                <details className="tutorial-faq-item" key={faq.question} open={index === 0}>
                  <summary><span>{String(index + 1).padStart(2, '0')} · {faq.question}</span><ChevronDown size={15} /></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="seo-related" aria-label="Related FitMyPhotoA4 pages">
          <div>
            <div className="section-kicker">Keep exploring</div>
            <h2>One tool.<br /><em>Every useful size.</em></h2>
          </div>
          <div className="seo-related-links">
            <a href="/passport-photo-size-maker">Passport photo size maker <span>→</span></a>
            <a href="/pan-card-photo-maker">PAN Card photo maker <span>→</span></a>
            <a href="/voter-id-photo-maker">Voter ID photo maker <span>→</span></a>
            <a href="/how-it-works">How it works tutorial <span>→</span></a>
            <a href="/privacy-policy">Privacy Policy <span>→</span></a>
            <a href="/terms-of-use">Terms of Use <span>→</span></a>
          </div>
        </section>
      </main>
      <div className="main-wrap"><SiteFooter /></div>
    </div>
  );
}

function Home() {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('');
  const [objectUrl, setObjectUrl] = useState('');
  const [fileError, setFileError] = useState('');
  const [presetKey, setPresetKey] = useState('passport');
  const [customWidth, setCustomWidth] = useState(35);
  const [customHeight, setCustomHeight] = useState(45);
  const [spacing, setSpacing] = useState(4);
  const [blackAndWhite, setBlackAndWhite] = useState(false);
  const [hdQuality, setHdQuality] = useState(false);
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
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', new URL('/', window.location.origin).toString());
  }, []);

  useEffect(() => {
    if (!previewCanvasRef.current) return;
    drawSheet(previewCanvasRef.current, image, photoWidth, photoHeight, spacing, 4, blackAndWhite);
  }, [image, photoWidth, photoHeight, spacing, blackAndWhite]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

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
    setBlackAndWhite(false);
    setHdQuality(false);
  };

  const exportSheet = (type: 'png' | 'pdf') => {
    if (!image || !image.complete || image.naturalWidth === 0) {
      setFileError('Please wait for the photo to finish loading, then try the download again.');
      return;
    }
    // Use a fresh offscreen canvas for every export. This avoids browser print
    // viewers reusing the tiny visually-hidden preview canvas dimensions.
    const exportCanvas = document.createElement('canvas');
    const exportScale = (hdQuality ? HD_DPI : STANDARD_DPI) / 25.4;
    const copies = drawSheet(exportCanvas, image, photoWidth, photoHeight, spacing, exportScale, blackAndWhite);
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
      <SiteHeader currentPath="/" />

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

        <section id="tool" className="workspace" aria-label="Photo sheet maker">
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
              <div className="quality-settings" aria-label="Photo output settings">
                <label className="setting-toggle">
                  <input type="checkbox" checked={blackAndWhite} onChange={(event) => setBlackAndWhite(event.target.checked)} data-testid="checkbox-black-and-white" />
                  <span className="toggle-switch" aria-hidden="true" />
                  <span className="toggle-copy"><strong>Black &amp; White</strong><small>{blackAndWhite ? 'Grayscale enabled' : 'Keep original color'}</small></span>
                </label>
                <label className="setting-toggle">
                  <input type="checkbox" checked={hdQuality} onChange={(event) => setHdQuality(event.target.checked)} data-testid="checkbox-hd-quality" />
                  <span className="toggle-switch" aria-hidden="true" />
                  <span className="toggle-copy"><strong>HD Quality</strong><small>{hdQuality ? 'HD (600 DPI)' : 'Standard (300 DPI)'}</small></span>
                </label>
              </div>
            <div className="tip"><Info size={15} /><span>A 10 mm edge margin is reserved on every side. It keeps your sheet inside the printable area of most home and shop printers.</span></div>
            <div className="control-actions">
              <button className="button button-line" type="button" onClick={reset} data-testid="button-reset"><RefreshCcw size={13} /> Reset</button>
                <span className="header-note"><Ruler size={13} /> {hdQuality ? '600 DPI HD export' : '300 DPI export'}</span>
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

        <section id="guide" className="content" aria-label="A4 photo printing guide">
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

          <div className="content-section reveal size-section">
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

          <div className="content-section reveal">
            <div className="money-layout">
              <div className="money-note"><strong>The small maths<br />behind the saving.</strong><p>At a print shop, five identical ID photos can cost more than a full colour A4 page. Arrange them yourself, pay for one sheet, and keep the file for the next application.</p></div>
              <div className="steps">
                <article className="step"><span className="step-num">01</span><div><strong>Choose a clear original</strong><p>Upload the largest, sharpest photo you have. The tool crops the edges to fit without stretching your face.</p></div></article>
                <article className="step"><span className="step-num">02</span><div><strong>Set the authority’s size</strong><p>Pick a preset or enter the exact width and height in millimetres. The count updates as you work.</p></div></article>
                <article className="step"><span className="step-num">03</span><div><strong>Print at actual size</strong><p>Download PNG or PDF, then select 100% / actual size in your print dialog. Never choose “fit to page”.</p></div></article>
              </div>
            </div>
          </div>

          <div className="content-section reveal">
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

          <div className="content-section reveal">
            <div className="section-head">
              <h3>From camera to counter</h3>
              <p>A little preparation makes the final sheet cleaner, sharper, and much easier to approve.</p>
            </div>
            <div className="guide-cards">
              <article className="guide-card"><h4>Start with the right source.</h4><p>FitMyPhotoA4 can arrange almost any clear JPG or PNG, but the quality of the finished sheet still depends on the original photograph. A recent camera photo or a full-resolution phone image gives the best result. Avoid screenshots taken from social media, images forwarded through messaging apps, or pictures that have already been cropped several times. Those copies may look acceptable on a phone but become soft when they are printed and cut down to a small official size.</p></article>
              <article className="guide-card"><h4>Pay attention to the face and background.</h4><p>The tool controls the physical rectangle and crops the image proportionally so the face is not stretched. It does not, however, decide whether a photograph meets the rules of a particular passport office, embassy, school, employer, or identity-card authority. Before downloading, check whether the destination expects a white or off-white background, a particular head size, a neutral expression, visible shoulders, uncovered eyes, or a recent photograph. A perfectly measured picture can still be rejected if the background, lighting, clothing, or facial position does not meet the official specification.</p></article>
              <article className="guide-card"><h4>Use the gap as a cutting guide.</h4><p>The spacing control changes the distance between neighbouring photos, while the tool keeps a 10 mm edge margin around the sheet. A small gap uses the paper efficiently, but it can make trimming harder if you are cutting with scissors. A larger gap gives you more room for a ruler, guillotine, or paper trimmer. For a home printer, four to six millimetres is a useful starting point. If you take the file to a print shop, ask whether their cutter needs a wider border around the outside of the page.</p></article>
              <article className="guide-card"><h4>Print without accidental resizing.</h4><p>The most common reason an otherwise correct photo becomes the wrong size is the print dialog. When you print the downloaded PDF, choose A4 paper, portrait orientation, and 100% scale or Actual size. Disable Fit, Shrink oversized pages, Borderless expansion, and similar automatic options unless your printer documentation specifically requires them. If you use the PNG, open it in an application that lets you set the physical output size or print resolution. Do not paste the image into a document and drag its corners by eye; that can change the millimetre dimensions.</p></article>
              <article className="guide-card"><h4>Check one copy before printing a full batch.</h4><p>Place a ruler beside the first printed photo and measure its width and height from edge to edge. This quick check confirms that the printer has not scaled the sheet. It is especially worthwhile for visa applications, passport renewals, exam forms, and government appointments where a rejected photograph can cost more time than a sheet of paper. Once one copy is correct, the remaining photos on the A4 page will have the same dimensions and can be trimmed with confidence.</p></article>
              <article className="guide-card"><h4>Keep a sensible digital file.</h4><p>FitMyPhotoA4 processes your image in the browser and does not require an account or an upload. After downloading, keep the original photo and the generated sheet in clearly named folders if you expect to use them again. Requirements change, so use an older sheet only when its size and image date are still accepted by the organisation receiving it. For privacy, avoid leaving personal identity photographs in a shared computer’s Downloads folder after printing, and delete temporary copies from public print-shop machines when you are finished.</p></article>
            </div>
          </div>

          <div className="content-section reveal">
            <div className="section-head">
              <h3>Print quality, explained simply</h3>
              <p>Good results come from combining accurate dimensions with a sharp, well-prepared original image.</p>
            </div>
            <div className="guide-cards">
              <article className="guide-card"><h4>What 300 DPI means.</h4><p>DPI, or dots per inch, describes how much image detail is available for printing. A small identity photograph still needs enough pixels to show clean edges, natural skin tones, and fine details such as hair and glasses. FitMyPhotoA4 prepares its export canvas around the A4 dimensions at 300 DPI, which is a common professional print setting. This does not magically add detail to a low-quality source, but it gives a good original the right space to reproduce clearly on paper.</p></article>
              <article className="guide-card"><h4>Why the PDF is useful.</h4><p>A PDF is often the easiest format for a print shop because it preserves the A4 page size and keeps the sheet together as one document. It is also less likely than a casually opened image to be resized by an application that is trying to fit content inside a window. The PNG download is useful when you want to inspect the sheet, place it into a document, or use an image-focused printer workflow. Whichever format you choose, the final print dialog is still important: a file can be perfectly measured and then be printed incorrectly if automatic scaling is applied.</p></article>
              <article className="guide-card"><h4>Colour and paper choices.</h4><p>Use the colour settings recommended by your printer and avoid applying artistic filters after the sheet has been generated. A neutral, evenly lit photo usually looks more natural on matte or satin paper than on highly glossy paper. Glossy paper can produce reflections that make a small face difficult to inspect, while very thin office paper may show ink bleed or curl. If an office or embassy specifies a paper type, follow that instruction first. For a normal application photo, a clean bright sheet with good contrast is usually preferable to an over-saturated or heavily sharpened print.</p></article>
              <article className="guide-card"><h4>Lighting matters more than editing.</h4><p>If you are taking a new source photo, face a large window or use soft light from in front of the subject. Avoid strong light from above, which can create shadows under the eyes, nose, and chin. Stand several steps away from the camera instead of using an extreme wide-angle selfie view. Keep the camera level with the face, leave enough space around the head, and ask the subject to look directly at the lens. A simple, well-lit original needs less correction and will look more professional after it is arranged on the A4 sheet.</p></article>
              <article className="guide-card"><h4>Use the size table as a starting point, not a legal guarantee.</h4><p>Passport and visa authorities can change their requirements, and different document types in the same country may use different dimensions. Some organisations ask for a digital upload with pixel dimensions rather than a physical print. Others require a photographer’s stamp, a specific paper finish, or a particular number of copies. Always compare the destination’s current instructions with the selected preset. When there is a difference, choose Custom size and enter the official measurement in millimetres instead of relying on a similar-looking preset.</p></article>
              <article className="guide-card"><h4>Troubleshooting a sheet that looks wrong.</h4><p>If the preview contains empty outlines, choose a photo first; those outlines are only a planning view. If the photo looks cropped, remember that the tool fills the selected rectangle without stretching it, so a portrait rectangle may trim the sides of a landscape original. Choose a source with a similar orientation or retake the photo with more space around the subject. If a downloaded image looks dark, check the original file in a normal image viewer and compare it with the preview. A very dark source, a display colour profile, or a paint application preview at a tiny zoom can make a correct image look different on screen.</p></article>
              <article className="guide-card"><h4>Plan for the whole appointment.</h4><p>A photo sheet is one part of a document application. Before you leave for an appointment, check the form, payment method, identity documents, copies, photographs, and any appointment confirmation. Keep a few spare prints in a flat envelope so they do not bend or collect fingerprints. If you are preparing photos for a family, create one sheet per person or label separate downloads clearly. This keeps different document sizes from being mixed together and makes the cutting stage faster.</p></article>
            </div>
          </div>

          <div className="content-section reveal" id="faq">
            <div className="section-head">
              <h3>Questions, answered</h3>
              <p>Ten useful answers for the moment between downloading your sheet and putting it in the printer.</p>
            </div>
            <div className="faq-list">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <article className={`faq-item${isOpen ? ' open' : ''}`} key={faq.question}>
                    <button id={`faq-question-${index + 1}`} className={`faq-button${isOpen ? ' open' : ''}`} type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`faq-answer-${index + 1}`} data-testid={`button-faq-${index + 1}`}>
                      <span>{String(index + 1).padStart(2, '0')} · {faq.question}</span><ChevronDown size={15} />
                    </button>
                    {isOpen && <div id={`faq-answer-${index + 1}`} className="faq-answer" role="region" aria-labelledby={`faq-question-${index + 1}`} data-testid={`text-faq-answer-${index + 1}`}>{faq.answer}</div>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname.replace(/\/+$/, '');
    return path || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/+$/, '');
      setCurrentPath(path || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const page = ALL_SEO_PAGES[currentPath];
  return page ? <ContentPage page={page} /> : <Home />;
}

export default App;