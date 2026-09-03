export type SEOSection = {
  heading: string;
  paragraphs: string[];
};

export type SEOPage = {
  path: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: SEOSection[];
  faqItems?: { question: string; answer: string }[];
};

const passportSections: SEOSection[] = [
  {
    heading: 'What is the correct passport photo size?',
    paragraphs: [
      'The most commonly requested passport photograph size in India and many international applications is 35 × 45 millimetres. That measurement describes the physical rectangle that will be printed, not simply the size of the original phone image. FitMyPhotoA4 uses millimetre-based layout calculations so the finished passport photo can be placed on an A4 sheet without guessing with a mouse or stretching a picture in a word processor. Start by checking the current instructions from the passport office, embassy, visa centre, school, employer, or other authority receiving your application. Requirements can differ even when two destinations both use the words passport photo.',
      'A measured rectangle is only one part of a compliant photograph. The receiving authority may also specify the background colour, face position, expression, head height, clothing, glasses, shadows, age of the image, and whether a digital file or printed copies are required. This page explains how to prepare the print layout; it is not a replacement for the official application instructions. If the authority gives you a different measurement, choose Custom size in the maker and enter that exact width and height in millimetres.',
    ],
  },
  {
    heading: 'Make a passport photo sheet in a few steps',
    paragraphs: [
      'Open the FitMyPhotoA4 maker and choose a clear JPG or PNG from your device. The image is read by your browser and remains in the current browser session. Select Passport size, which is preset to 35 × 45 mm, and look at the live A4 preview. The tool repeats the selected image rectangle across the page, keeps a quiet edge margin, and leaves the cutting space you choose between neighbouring copies. You can adjust the gap when you want an efficient sheet or when you prefer more room for scissors and a ruler.',
      'When the crop looks right, choose PNG for an image-based workflow or Download PDF for a print-shop-friendly A4 document. The PDF is normally the easiest option because it preserves the page format for the printer. Before printing, select A4 paper, portrait orientation, and Actual size or 100% scale. Turn off Fit to page, Shrink oversized pages, Borderless expansion, and similar automatic adjustments. Print one test copy and measure it before producing a complete batch for an appointment.',
    ],
  },
  {
    heading: 'How to choose the right source image',
    paragraphs: [
      'A good passport sheet begins with a good original. Use the largest clear image available rather than a screenshot from social media or a compressed messaging-app copy. The maker can crop an image proportionally to fill 35 × 45 mm, but it cannot restore details that were removed by a low-resolution download. Leave a little space around the head and shoulders when taking a new photograph. A source that is already tightly cropped may lose the top of the head or the required shoulder area when it is fitted to the portrait rectangle.',
      'For a new photograph, place the camera at face height and stand far enough away that the lens does not exaggerate the nose or change the proportions of the face. Use soft light from in front of the person, avoid a strong window behind the subject, and use a plain background with no visible objects. Ask the subject to look directly at the lens with a natural, neutral expression. Keep both eyes visible unless the authority explicitly allows an exception, and remove temporary items that could obscure the face.',
    ],
  },
  {
    heading: 'Background, lighting, and face position',
    paragraphs: [
      'Many passport and visa authorities expect a plain light background, often white or off-white, with even lighting and no hard shadow behind the head. A painted wall can look plain to the eye but still show texture, a corner, or a colour cast in a printed photograph. If you take the image indoors, create distance between the subject and the wall and use diffused light. Check the photograph at full size before placing it on the A4 sheet. The photo maker controls layout and cropping, not official background compliance.',
      'The head should be upright, centred, and large enough for the destination’s stated face-height rule. Do not use a beauty filter, face-slimming effect, artificial blur, or aggressive skin smoothing for an identity document. Those edits can make the person harder to recognise and may lead to rejection. If the official instructions ask for a particular head measurement, compare the original image with the required guidance before printing. FitMyPhotoA4 is deliberately a precise sheet tool, not an automatic authority approval service.',
    ],
  },
  {
    heading: 'Why 35 × 45 mm is not always enough',
    paragraphs: [
      'The phrase passport photo is used for several different applications. A national passport, a foreign visa, a residence permit, a work permit, and a school identity card may each request a different size or a different digital crop. Some destinations use 35 × 45 mm but measure the face differently. Others ask for a square image, a specific pixel size, a biometric file, or a photographer stamp. Never assume that a familiar preset is correct just because it looks similar to an older photograph.',
      'Use the preset as a fast starting point, then confirm the destination’s current checklist. If the requirement says 40 × 50 mm, 2 × 2 inches, or another specification, convert carefully or use the exact millimetre value supplied by the authority. A one or two millimetre difference can matter when a clerk measures a printed photo. The Custom size control is useful for unusual requirements because it updates the number of copies that fit on A4 while keeping the same controlled workflow.',
    ],
  },
  {
    heading: 'Printing passport photos at the correct scale',
    paragraphs: [
      'The preview is a planning view; the print dialog determines the final physical size. PDF readers often show a checkbox labelled Actual size, 100%, or Do not scale. Choose that option and confirm that the selected paper is A4 rather than Letter. If the printer warns that the page is larger than the printable area, use a printer setting that preserves the page dimensions instead of silently reducing the whole sheet. FitMyPhotoA4 reserves a 10 mm edge margin to make the layout more practical for home and shop printers.',
      'After printing, measure one passport rectangle from the outside edge to the outside edge. A small paper trimmer or ruler is more reliable than cutting by eye. If the measurement is wrong, do not compensate by dragging the PDF or changing the photo size inside another program. Review the print scaling setting and repeat the test. Once the first sample is correct, the other copies on the same sheet use the same dimensions. Keep the sheet flat and clean until you are ready to submit the photographs.',
    ],
  },
  {
    heading: 'Passport photo quality checklist',
    paragraphs: [
      'Before you download, check five practical things: the source image is sharp, the face is centred, the crop includes the required head and shoulder area, the background has no distracting shadow, and the selected size matches the current application. Turn on the HD Quality option if you need a larger 600 DPI export and your source image has enough pixels to benefit from it. Higher output resolution does not create detail that was missing from the original, so a clear camera photograph is still more valuable than a tiny file exported at a higher setting.',
      'Before you submit, check the physical print, not only the monitor preview. Colours can look different on screens and on different paper. Look for ink streaks, dust, a clipped head, a tilted face, or a crop that makes the person look unlike the source. Keep a spare copy in a clean envelope and label files by person and application date. If an authority rejects the photograph for a rule other than size, follow its correction instructions rather than repeatedly printing the same layout.',
    ],
  },
  {
    heading: 'Common passport photo mistakes',
    paragraphs: [
      'The most common mistake is printing a correct-looking PDF with Fit to page enabled. That single option can make every 35 × 45 mm rectangle smaller than intended. The next common issue is starting with a compressed image that becomes soft after cropping. Other problems include a patterned background, uneven light, a recent haircut or appearance change that makes an old photo unsuitable, and mixing the photograph size for one application with the rules for another. A measured sheet cannot correct any of those source or authority issues.',
      'Avoid copying the preview into a screenshot, because a screenshot has no dependable physical print dimensions. Download the generated file instead. Avoid opening the PNG in an application that automatically scales it to the window and then saving it again. If a print shop handles the file, tell the operator that the sheet must be printed at 100% on A4. Ask to see the print setting before the job starts, especially when the photographs are for a passport appointment with a fixed deadline.',
    ],
  },
  {
    heading: 'Use the passport photo maker privately',
    paragraphs: [
      'Identity photographs are personal information, so it is useful to understand how this tool works. FitMyPhotoA4 reads a selected JPG or PNG locally in the browser, draws the sheet on a canvas, and creates downloads on your device. The application does not require an account, and the normal photo-making flow does not upload the image to a photo-processing queue. When you finish, close the page or use Reset and remove downloaded copies from shared computers or public print-shop systems.',
      'The browser still has its own storage, history, downloads folder, extensions, and network behaviour, so use a trusted device and check the privacy policy for the full explanation. External resources such as fonts or a PDF library may be loaded by the page, but the photograph itself is handled locally by the maker flow. If you need a different document size, visit the PAN Card Photo Maker or Voter ID Photo Maker pages and confirm the official requirement before selecting a preset.',
    ],
  },
  {
    heading: 'Start your passport photo sheet',
    paragraphs: [
      'FitMyPhotoA4 is designed for the practical last step between a source image and a measured sheet of prints. It helps you avoid manual resizing, repeated copy-and-paste work, and uncertainty about how many passport photos fit on A4. It does not promise that an authority will accept every image, because acceptance depends on rules that can change and on qualities the browser cannot judge reliably. Use the official checklist first, then use the maker to produce a clean, consistent layout.',
      'When you are ready, go to the A4 Photo Maker, choose Passport size, upload the clearest original, inspect the crop, and download the sheet. For more answers about payment, printing, sizes, and browser privacy, read the FitMyPhotoA4 FAQ. If you want to understand how personal images are handled, review the Privacy Policy before using the tool.',
    ],
  },
  {
    heading: 'A final passport appointment checklist',
    paragraphs: [
      'The day before an appointment, open the current official checklist again instead of relying on memory. Confirm whether you need a printed photograph, a digital upload, or both; confirm the number of copies; check whether the image must be recent; and note any instructions about background, glasses, clothing, head coverings, or a photographer stamp. Then compare the requirement with the dimensions shown in FitMyPhotoA4. This small routine prevents a common mistake: using a perfectly measured 35 × 45 mm sheet for an application that actually asks for a different crop or a different delivery format.',
      'Keep the original image, generated PDF, and printed copies separate and clearly labelled. Carry the sheet flat in a paper sleeve, and take a ruler if you want to confirm a print at the appointment or print shop. If the office asks for a correction, follow that specific instruction rather than assuming the same preset will work again. FitMyPhotoA4 makes the repeatable layout step easier, but the safest application is always based on the destination’s latest rules, a natural photograph, and a physical test print checked before the deadline.',
    ],
  },
];

const panSections: SEOSection[] = [
  {
    heading: 'PAN card photo size: what should you use?',
    paragraphs: [
      'A PAN card application commonly asks for a small recent colour photograph, often described as 25 × 35 millimetres or approximately 2.5 × 3.5 centimetres. The exact request can depend on the application channel, form version, correction request, or service provider, so always compare the dimensions and image instructions with the current official guidance before printing. FitMyPhotoA4 includes a PAN Card photo preset at 25 × 35 mm to make the layout quick, but the preset is a starting point rather than a government approval.',
      'The measurement refers to the finished physical photograph. A phone image may be thousands of pixels wide, while the print rectangle is only a few centimetres. The photo maker crops the original proportionally, places repeated copies on an A4 page, and lets you download a PNG or PDF. It does not alter the identity of the subject or decide whether a background, expression, face position, or signature requirement satisfies an application authority. Confirm those details separately before you submit your PAN documents.',
    ],
  },
  {
    heading: 'How to create PAN card photos on A4',
    paragraphs: [
      'Choose a clear JPG or PNG and open the FitMyPhotoA4 maker. Select PAN Card photo from the Photo type menu. The control shows the selected dimensions, and the preview calculates how many copies fit within an A4 portrait sheet with a 10 mm edge margin and your chosen cutting gap. Upload the original once, inspect the crop, and adjust the spacing if you want extra room for a ruler or paper trimmer. A compact gap may save paper, but a wider gap can make careful cutting easier.',
      'Download the PDF when you are taking the sheet to a print shop, or choose PNG when your printer workflow is image based. Print the file on A4 paper using Actual size or 100% scale. Never use Fit to page unless you have confirmed with a ruler that the resulting rectangle remains 25 × 35 mm. Print a test first for an important application. Measuring one copy takes less time than discovering at the form counter that a scaled sheet is too small.',
    ],
  },
  {
    heading: 'Prepare a suitable PAN photograph',
    paragraphs: [
      'Use a recent front-facing image with a sharp focus and enough space around the head and shoulders. A full-resolution phone photograph is usually a better source than a compressed image forwarded through a messaging app. Keep the camera at face level and use soft light from the front. Avoid direct flash that produces harsh shadows, a window behind the person, a visible wall corner, or objects in the background. The smaller the printed rectangle, the more noticeable blur, noise, and uneven lighting can become.',
      'A PAN photograph should make the applicant easy to recognise. Keep the face natural and avoid dramatic filters, beauty retouching, cartoon effects, or artificial background replacements that change the appearance. Follow the form’s instructions for glasses, head coverings, expression, and whether the photograph must be signed or affixed in a particular way. FitMyPhotoA4 will accurately arrange a source image, but it cannot validate the identity, date, background, or other administrative requirements of a PAN application.',
    ],
  },
  {
    heading: 'Crop and background guidance',
    paragraphs: [
      'The PAN preset has a portrait ratio of 5:7. If your original image is very wide, the proportional crop may remove more from the left and right sides. If it is extremely tall, it may remove some space above and below. This is intentional: stretching the photo would distort the face. Use an original with comfortable space around the subject, or retake the image at a more natural distance. Look at the preview and make sure the full head remains visible before you download.',
      'A plain, evenly lit background is generally safer than a busy room, patterned wall, or outdoor scene. The application instructions should control if they specify white, off-white, or another exact background. Do not assume that a background removal tool is needed; an artificial cutout can create a bright outline around hair and shoulders. A clean source photograph with soft light often produces a more convincing result and reduces the chance that the print will look harsh at the small PAN photo size.',
    ],
  },
  {
    heading: 'The print scale matters more than the screen',
    paragraphs: [
      'A web preview is measured internally, but monitors and browser zoom levels do not represent physical centimetres. The only dependable check is the printed file. In the PDF viewer, select A4 paper and Actual size, then check the print preview for a page scale of 100 percent. Disable automatic options named Fit, Scale to printable area, Reduce large pages, or Borderless enlargement. If a shop prints the sheet, tell the operator not to resize it and ask whether the machine has a non-printable edge.',
      'Place a ruler beside the first printed PAN photo. Measure the photo rectangle before cutting multiple copies. If it is not close to the requested dimension, inspect the print dialogue rather than editing the source image. A print shop may default to Letter paper or shrink a page to avoid its margins. FitMyPhotoA4 leaves a quiet border for this reason, but no browser tool can force an operator’s printer setting after the file has been downloaded.',
    ],
  },
  {
    heading: 'When the PAN requirement is different',
    paragraphs: [
      'Online forms may ask for a digital photograph with a maximum file size, a particular pixel range, a square crop, or a specific file format instead of printed copies. A physical 25 × 35 mm sheet is useful when the instructions ask for photographs to be attached to a paper form, but it is not automatically the correct upload for an online portal. Read the line next to the photograph box carefully. If a service centre gives you another measurement, use Custom size and enter the stated dimensions rather than forcing the PAN preset.',
      'PAN applications and correction processes can change their instructions over time. An old photograph accepted for one application does not prove that it is suitable for another. Check whether the photograph must be recent, whether the applicant must sign across it, how many copies are needed, and whether the photograph must be in colour. The tool helps with repeatable measurement and A4 arrangement; the applicant remains responsible for matching the current official checklist.',
    ],
  },
  {
    heading: 'How many PAN photos fit on A4?',
    paragraphs: [
      'The number of copies depends on the selected width, height, edge margin, and cutting gap. At 25 × 35 mm, an A4 portrait page normally has room for many small rectangles, but the exact count shown by the maker is the count you should use because changing the gap changes the grid. The software reserves a 10 mm edge margin and lays out rows and columns using millimetres. That creates a predictable sheet instead of an arrangement that only looks evenly spaced on screen.',
      'More copies are not always better. If the photographs are for one person and one form, a moderate number of spares is usually enough. A wider cutting gap makes it easier to trim without touching a neighbouring face. Keep different people’s images on separate labelled sheets so the wrong photograph is not attached to the wrong application. If you are preparing a family batch, use a clear filename for each download and store the files on a private device.',
    ],
  },
  {
    heading: 'Quality and paper tips',
    paragraphs: [
      'For small identity photos, a sharp source and a clean print surface usually matter more than decorative paper. Use a good colour printer or a reputable shop, and choose matte or satin paper when the form does not specify a finish. Glossy paper may reflect light during inspection, while very thin office paper can curl or show ink bleed. Avoid repeatedly exporting and recompressing the image. FitMyPhotoA4 creates a fresh sheet from the browser preview, so keep the generated PDF or PNG as the print master.',
      'HD Quality can create a larger 600 DPI export, which may be helpful for a professional printer, but it cannot increase the detail in a small original. Keep colour management simple and avoid filters after export. Examine one test print in normal light for a neutral skin tone, clear eyes, an even background, and a sharp outline. If the source is dark, grainy, or out of focus, retake it instead of expecting a higher DPI setting to repair it.',
    ],
  },
  {
    heading: 'Privacy while preparing PAN photos',
    paragraphs: [
      'A PAN photograph is sensitive personal information. FitMyPhotoA4 is built so the normal upload, crop, preview, and export work happens in the browser on your device. The application does not need an account or a photo upload queue. Use Reset when you finish, close the page, and remove downloaded files from shared machines or public print-shop computers. Also check the Downloads folder, browser history, temporary files, and any synced folders if you used a shared or cloud-connected device.',
      'Local processing reduces the need to send the face image to a server, but it does not replace ordinary device security. Keep your operating system and browser updated, use a private device where possible, and do not install unknown extensions that can inspect pages or files. Review the Privacy Policy for the treatment of page requests and external resources such as fonts or the PDF library. For related requirements, read the Passport Photo Size Maker and Voter ID Photo Maker guides.',
    ],
  },
  {
    heading: 'Create your PAN card photo sheet',
    paragraphs: [
      'The simplest reliable workflow is: verify the current PAN instructions, select the 25 × 35 mm preset if it matches, upload a sharp original, inspect the crop, download an A4 PDF, print at 100 percent, and measure one copy. This avoids hand-drawing rectangles and avoids the common mistake of resizing a photograph by eye inside a document editor. If the instructions differ, use Custom size and treat the official measurement as the source of truth.',
      'FitMyPhotoA4 is free to use in the browser and is intended to make the measured printing step less stressful. It does not submit your PAN application, guarantee acceptance, or replace an official service centre. For general questions about whether the tool is free, how to print, and where your image goes, visit the FAQ page. For legal and data-handling information, read the Terms of Use and Privacy Policy.',
    ],
  },
  {
    heading: 'Before attaching a PAN photograph',
    paragraphs: [
      'A printed photograph is often handled several times during a paper application, so prepare more carefully than the tiny final rectangle might suggest. Let fresh ink dry completely, keep the sheet flat, and cut with a clean blade or scissors. Do not fold the face, write across the image unless the form specifically says to sign there, or use adhesive that damages the paper. Read the form’s placement diagram: some processes ask for a photograph in a marked box, some ask for a signature partly across the photograph, and online processes may not want a physical photograph at all.',
      'Check the applicant name, form number, signature instructions, payment receipt, identity proof, and photograph count as one bundle before leaving for a service centre. Keep a spare print in a separate envelope, not loose in a wallet where it can bend or collect fingerprints. If you prepare photographs for several people, label each sheet immediately and delete unnecessary copies from shared devices. These organisational details do not change the 25 × 35 mm layout, but they reduce the chance of attaching the right photograph to the wrong PAN request.',
    ],
  },
];

const voterSections: SEOSection[] = [
  {
    heading: 'Voter ID photo size and the official instructions',
    paragraphs: [
      'A voter identity card photograph is often prepared as a small portrait image, and many Indian photo workflows use 25 × 35 millimetres as a practical print size. The correct requirement can vary by the form, election office, online portal, state process, or service centre. Before printing, check the latest instructions for the application you are completing. FitMyPhotoA4 includes a Voter ID photo preset at 25 × 35 mm so you can begin quickly, but the tool cannot promise that a preset is accepted by every authority.',
      'The physical dimensions are only one part of a good identity photograph. The authority may specify a recent image, a plain background, a colour photograph, a particular face position, or a digital file rather than printed copies. Use this guide for the measured A4 arrangement, then use the official checklist for the identity and application rules. If the instruction gives a different size, use Custom size in the maker and enter the exact values rather than relying on a similar preset.',
    ],
  },
  {
    heading: 'Make a Voter ID sheet with FitMyPhotoA4',
    paragraphs: [
      'Start with a clear JPG or PNG on your device. In the maker, select Voter ID photo and confirm the displayed width and height. Upload the image, then review the live A4 preview. The maker places the photo in repeated rows and columns, keeps a 10 mm edge margin, and applies the cutting gap selected on the control panel. A smaller gap can use the paper efficiently, while a wider gap provides more room for trimming with scissors or a compact paper cutter.',
      'Choose Download PDF when a print shop will produce the page because the PDF keeps the A4 document together. Choose PNG when your own printer or image application needs a raster file. In both cases, print at 100 percent or Actual size on A4 paper. Do not copy the preview into a screenshot or paste it into a word processor and drag the corners. Those actions can remove the physical dimensions that make a 25 × 35 mm layout useful.',
    ],
  },
  {
    heading: 'Take a clear voter identity photograph',
    paragraphs: [
      'The source photograph should be sharp enough to show the face clearly at a small printed size. Use the original file from a phone or camera whenever possible. Stand several steps from the camera, keep the lens at face height, and leave space around the head and shoulders. Wide-angle selfies taken too close can change facial proportions and make the centre of the crop less natural. A recent, well-lit image is easier to inspect than a heavily edited or repeatedly compressed file.',
      'Use soft light from in front of the subject and avoid a bright window behind the person. A plain wall can work if it is evenly lit and does not show a corner, picture frame, curtain, or strong shadow. Keep the subject facing the camera and use a natural expression unless the application says otherwise. The maker handles the rectangle and proportional crop; it does not assess whether the person, date, background, or expression satisfies the election office’s requirements.',
    ],
  },
  {
    heading: 'Crop without stretching the face',
    paragraphs: [
      'The Voter ID preset uses a portrait rectangle, so the software may trim some of the left and right sides of a wide original or some empty space around a tall original. This protects the face from distortion. If the crop feels too tight, return to the original photograph and choose one with more space around the subject. Do not stretch the photo manually to fill the rectangle. A stretched face may look obviously unnatural and can be more difficult to recognise during document processing.',
      'Look closely at the top, bottom, left, and right edges of the crop. The full head should not touch the frame unless the authority’s instructions specifically require a close crop. Check that both eyes and the important facial features are visible. If the person wears glasses, a head covering, or another permitted item, compare the image with the official instructions. If the item is not permitted, retaking the photograph is safer than trying to remove it with an artificial edit.',
    ],
  },
  {
    heading: 'Measure the print after downloading',
    paragraphs: [
      'The screen is not a ruler. Browser zoom, monitor size, and responsive layout change how large a rectangle appears, while the downloaded file contains the actual page measurement. In your PDF viewer, choose A4 and Actual size. Turn off Fit to page, Scale, Shrink, Enlarge, and Borderless expansion settings unless your printer documentation explicitly tells you to use them. A shop operator should also know that the page must not be resized to Letter or to an arbitrary custom paper setting.',
      'Print one test page and measure one photograph with a ruler. If the width or height is wrong, inspect the printer scale first. Do not change the preset simply to compensate for a printer that is shrinking the whole sheet. When the test is correct, cut the copies along the visible photo edges and keep spares in a flat envelope. This simple check is valuable when an application has a deadline or when a service centre charges for each new print.',
    ],
  },
  {
    heading: 'When a portal wants a digital file',
    paragraphs: [
      'Some voter registration or correction processes accept an online upload instead of a printed photograph. An upload instruction may specify pixels, maximum file size, file type, aspect ratio, or a plain-background rule. A physical A4 sheet is intended for situations where photographs must be attached or carried to an office; it is not automatically the right digital asset for a portal. Read the instruction beside the upload control rather than assuming the printed dimensions will be converted correctly by the website.',
      'If the authority specifies a different physical size or a digital ratio, use Custom size or follow its digital preparation instructions. Keep the original image separate from the print sheet so you can make a new export without repeated recompression. Do not submit a screenshot of the A4 page when the portal asks for a face photograph. The best file for an online form is usually the original or a carefully cropped copy that meets the portal’s stated pixel and file-size limits.',
    ],
  },
  {
    heading: 'How many copies should you make?',
    paragraphs: [
      'At 25 × 35 mm, many copies can fit on one A4 page. FitMyPhotoA4 calculates the count from the usable A4 area, the selected photo size, and the gap between rectangles. If you move the spacing control, the number can change. A compact layout is useful when paper cost matters, but do not reduce the gap so far that a pair of scissors can no longer separate the photos cleanly. The application may only need one photo, yet a few clean spares can save a second trip.',
      'Create one sheet per person when preparing family documents. Label each downloaded file with the person’s name and the application purpose, and do not mix photos from different document requirements on one unlabeled sheet. Store the images privately and avoid leaving them on public computers. If the subject’s appearance changes or the authority asks for a recent photograph, make a new sheet rather than relying on a file saved from a previous application.',
    ],
  },
  {
    heading: 'Paper, colour, and print quality',
    paragraphs: [
      'Unless the authority specifies a paper finish, a clean matte or satin sheet is often easy to handle and inspect. Glossy paper can create reflections under office lighting, while thin office paper may curl or absorb ink unevenly. Use a reliable printer or tell the print shop that the file is a measured A4 layout. Avoid artistic filters, extra sharpening, or colour changes after the sheet is generated. A natural face and an even background are more useful than a dramatic high-contrast edit.',
      'The HD Quality option can produce a larger export for a high-quality printer, but a higher DPI setting cannot repair an out-of-focus original. Check the first print in neutral light. Look for a clipped head, coloured cast, streaks, dust, or a crop that differs from the preview. If the source is poor, take a new photograph. Keeping the original file means you can regenerate a clean sheet without lowering the quality through several rounds of editing.',
    ],
  },
  {
    heading: 'Privacy for voter photographs',
    paragraphs: [
      'A voter identity photograph is personal data. In the normal FitMyPhotoA4 workflow, the browser reads the selected JPG or PNG, draws the preview, and prepares the PNG or PDF on your device. The maker does not require an account or a server upload for arranging the photo sheet. When finished, use Reset, close the tab, and remove files from the Downloads folder on any shared or public device. Check synced folders as well if your browser or operating system copies downloads to cloud storage.',
      'Local browser processing is helpful, but your device, browser extensions, network, and external resources still have their own privacy behaviour. Use a trusted browser and review the Privacy Policy for a plain-language description of page requests, fonts, and the PDF library. FitMyPhotoA4 cannot decide whether an image is legally sufficient for an election office. It only helps make a consistent sheet after you have checked the current requirement.',
    ],
  },
  {
    heading: 'Prepare your Voter ID photo sheet',
    paragraphs: [
      'For a dependable result, verify the current election-office instruction, select Voter ID photo only if 25 × 35 mm matches it, upload the clearest recent original, inspect the face and background, download the A4 PDF, print at 100 percent, and measure one copy. This workflow avoids the uncertainty of manually arranging images in a document editor. When the instruction differs, Custom size keeps the process just as useful without pretending that a familiar preset is universal.',
      'Visit the FAQ page for answers about free use, printing, PAN photographs, and browser privacy. The Passport Photo Size Maker page covers a 35 × 45 mm workflow, while the PAN Card Photo Maker page explains the 25 × 35 mm preset in its own context. For data handling and limitations, read the Privacy Policy and Terms of Use before relying on any generated sheet.',
    ],
  },
  {
    heading: 'Keep your voter application organised',
    paragraphs: [
      'A voter registration or correction request can involve more than a photograph. Before travelling to an office or submitting a form, check the current identity, address, age, signature, appointment, and document-copy requirements for your area. Put the photograph sheet in a flat sleeve with the form so it does not become separated from the applicant’s papers. If a field asks for a photograph to be attached, follow the instructions for glue, staples, signature, or placement. Do not write on the face or trim away a required border just to make the photo look neater.',
      'When preparing multiple applications, use a separate folder for each person. A 25 × 35 mm photo can look similar across a family, and an unlabeled stack can create a serious mix-up. Name the private file with the person and purpose, inspect every crop, and remove the files after the task is complete. If the election office gives a local instruction that differs from this guide, the local instruction wins. The value of FitMyPhotoA4 is consistency: once the correct size is known, it helps you repeat that size without relying on manual placement.',
      'Take the final photograph sheet with enough time to correct a mistake. Check that the name on the folder matches the person in the image, that the page has not been folded, and that the selected paper is suitable for the printer. If an office asks for a different background or a digital version, do not try to make the printed page serve both purposes. Keep a clean original so you can create a new version without losing quality. A careful file name, a private folder, and one measured test copy make the rest of the voter application much easier to manage.',
    ],
  },
];

const faqSections: SEOSection[] = [
  {
    heading: 'What is FitMyPhotoA4?',
    paragraphs: [
      'FitMyPhotoA4 is a browser-based tool for arranging one JPG or PNG into a measured A4 photo sheet. You choose a preset such as passport, PAN Card, Voter ID, stamp, US visa, Canada passport, China passport, or UAE passport, or enter a custom width and height in millimetres. The tool displays the expected number of copies, previews the page, and lets you download a PNG or PDF. It is designed to make the layout step predictable when you want to print several small photos on one sheet.',
      'The tool does not decide whether a photograph meets every rule of a passport office, embassy, election authority, school, employer, or government form. Dimensions, background, head position, expression, paper, and recency rules can change. Check the current official instructions first. If the stated measurement is different from a preset, use Custom size and enter the official width and height. Treat the maker as a layout and print-preparation assistant, not as an authority approval service.',
    ],
  },
  {
    heading: 'What photo size is needed for a PAN card?',
    paragraphs: [
      'Many PAN card workflows use a 25 × 35 mm colour photograph, but the exact requirement depends on the application route and current instructions. FitMyPhotoA4 includes a PAN Card photo preset at 25 × 35 mm. Confirm the form or service provider before printing, especially if you are applying online and the portal requests pixels or a maximum file size instead of printed copies. A physical A4 sheet is appropriate only when the application asks for attached or carried photographs.',
      'Use a sharp, recent, front-facing image with an appropriate background. Select the PAN preset, inspect the crop, download the PDF, and print at 100 percent on A4 paper. Measure one copy before cutting the rest. If an authority gives another size, Custom size is safer than trying to compensate for a different requirement by changing the printer scale.',
    ],
  },
  {
    heading: 'Is FitMyPhotoA4 free or paid?',
    paragraphs: [
      'The photo sheet maker is intended to be free to use in the browser. The normal workflow does not ask you to create an account or pay before arranging a photo. You can select a size, preview the sheet, and download a PNG or PDF. If a future version introduces a separate paid service, the price and terms should be shown clearly before a charge is made. Do not enter payment details into an unexpected popup or third-party page that is not part of the official site.',
      'Free does not mean that printing materials are free. You may still pay for paper, ink, a photo printer, a print shop, or an internet connection. The tool also cannot guarantee acceptance by an authority, so check the official requirement before printing a large batch. A one-page test print and a ruler are usually cheaper than correcting a full set after a printer has applied the wrong scale.',
    ],
  },
  {
    heading: 'Does my photo get uploaded?',
    paragraphs: [
      'The normal photo-making flow is local to your browser. When you choose a JPG or PNG, the browser reads the file, creates an image object, draws the sheet on a canvas, and prepares the download on your device. FitMyPhotoA4 does not need an account or a photo-processing queue for this workflow. This is why the interface says local-only and no upload. Use Reset after you finish and remove downloaded files from shared computers.',
      'Local processing does not mean that your entire device is invisible to the internet. The page may load external resources such as web fonts or a PDF library, and your browser, extensions, history, and network provider have their own policies. The photo file itself is handled by the maker in the browser. Read the full Privacy Policy for the distinction between the image workflow, page requests, and files you choose to download.',
    ],
  },
  {
    heading: 'How do I print the generated sheet?',
    paragraphs: [
      'Download PDF is usually the simplest option for a print shop because the file preserves an A4 page. Open it in a PDF viewer, select A4 paper and portrait orientation, and choose Actual size or 100% scale. Turn off Fit to page, Shrink oversized pages, Scale to printable area, and borderless expansion. If the viewer shows a scaling percentage, confirm it is 100. If a print shop handles the job, tell the operator that the measured page must not be resized.',
      'Print one test sheet and measure one photo from edge to edge with a ruler. If the measurement is wrong, correct the print setting rather than changing the selected photo size. For PNG, use an application that respects physical dimensions or print resolution. Do not paste the image into a document and resize it by dragging. The page preview helps you see the arrangement, but the print dialogue controls the final physical result.',
    ],
  },
  {
    heading: 'What if my authority uses a different size?',
    paragraphs: [
      'Choose Custom size and enter the exact width and height supplied by the official instructions. Use millimetres, and keep the width and height in the same orientation as the requested photo. FitMyPhotoA4 recalculates the grid and tells you how many copies fit on A4. This is useful for less common visa, school, employment, residence-permit, or local form requirements. Do not select the closest preset simply because the visual shape looks similar.',
      'The authority may also request a digital crop rather than a printed sheet. In that case, follow its pixel, file-size, format, and upload instructions. A measured physical rectangle does not automatically become a compliant digital file. Keep the original source file so you can prepare another version without repeatedly compressing the image.',
    ],
  },
  {
    heading: 'Why does the crop remove part of my image?',
    paragraphs: [
      'The tool fills the selected rectangle without stretching the source. If the source has a different aspect ratio, some edges must be cropped to avoid distorting the face. A 35 × 45 mm portrait rectangle may remove the sides of a wide landscape image, while a tall image may lose empty space above or below. Start with a source that has room around the subject and keep the camera at face height. Review the live preview before downloading.',
      'If a required feature is too close to the edge, use another original or retake the photo from a little farther away. Do not stretch the image manually or use a face filter to force a fit. A natural proportional crop is easier to recognise and usually prints more cleanly. The maker does not know which parts of a face an authority requires, so you must compare the crop with the official guide.',
    ],
  },
  {
    heading: 'Can I create a black-and-white or HD sheet?',
    paragraphs: [
      'Yes. The controls include a Black & White option and an HD Quality option. Black & White applies a grayscale treatment to the generated sheet, while HD Quality prepares a larger export at 600 DPI instead of the standard 300 DPI. Use these options only when they suit the receiving authority and printer. A higher DPI value is not a substitute for a sharp original, and a grayscale photograph may be rejected when a colour image is required.',
      'The live preview updates as you change the settings. Check the result before downloading, and print one sample if the application is important. Keep the original colour file so you can create a different sheet later. The PDF and PNG controls are disabled until a valid image has loaded, which prevents an empty planning preview from being mistaken for a finished photo sheet.',
    ],
  },
  {
    heading: 'How many photos fit on A4?',
    paragraphs: [
      'The count depends on the photo width, photo height, 10 mm edge margin, and cutting gap. Smaller photos generally allow more copies, but a wider gap reduces the count while making cutting easier. The maker calculates rows and columns using millimetres and shows the result below the preview. If you choose Custom size, the count changes immediately as you edit the dimensions. Use the displayed count rather than estimating from the size of the preview on your screen.',
      'The most efficient layout is not always the most practical. Leave enough space to cut without nicking the next photograph, especially when a face is close to an edge. Make separate sheets for different people or document types, use descriptive filenames, and keep spares flat and clean. A print shop may also need a quiet outer margin, which is why the maker does not fill every last millimetre of the page.',
    ],
  },
  {
    heading: 'What are the most important privacy tips?',
    paragraphs: [
      'Use a trusted, updated browser on a private device when preparing identity photographs. Avoid unknown browser extensions, public computers, and shared Downloads folders. Reset the tool when finished, close the tab, and remove generated files from places where another person could access them. If the device syncs downloads to cloud storage, review that folder too. The app’s local image workflow reduces server upload, but it cannot control the security of your device or the software installed on it.',
      'Read the Privacy Policy for details about local processing, external page resources, and information you choose to send voluntarily. Do not upload a photograph to a random website simply because it promises automatic compliance. A local measured layout is often enough when the source image and official requirements are already correct. If you have questions about limitations or acceptable use, the Terms of Use explains the service boundaries.',
    ],
  },
  {
    heading: 'What should I check before an important application?',
    paragraphs: [
      'Open the current official instructions and confirm whether the application wants a printed photo or a digital upload. Check the exact width and height, background, head position, expression, glasses or head-covering rules, recency requirement, paper, number of copies, and any stamp or signature instruction. Then select a clear recent original, choose a matching preset or Custom size, inspect the crop, download the sheet, print at 100 percent, and measure one copy. This sequence catches both layout mistakes and requirement mistakes before you reach the office.',
      'Keep the original, generated PDF, and spares labelled separately for each person. Use a private device, remove files from public computers, and do not send identity photographs through an unnecessary online editor. If the authority gives an instruction that conflicts with a FitMyPhotoA4 guide, the official instruction wins. For document-specific details, read the Passport Photo Size Maker, PAN Card Photo Maker, and Voter ID Photo Maker pages. The FAQ is a practical starting point, while the Privacy Policy and Terms of Use explain the service boundaries.',
    ],
  },
  {
    heading: 'Can I use it on a phone?',
    paragraphs: [
      'Yes, the maker is designed to run in a modern browser on a phone, tablet, laptop, or desktop. A larger screen can make the crop and print controls easier to inspect, while a phone is convenient when the original image is already in your gallery. Select the image carefully, check that the browser has loaded it completely, and keep the generated file in a private folder. The same print rule applies on every device: choose A4 and Actual size or 100 percent when printing.',
      'If the browser or print application changes the page scale, use a test print and a ruler before an important submission. The device may also automatically back up photographs or downloads, so review sync settings when privacy matters. For a document-specific workflow, start with the Passport Photo Size Maker, PAN Card Photo Maker, or Voter ID Photo Maker page. If you are unsure about the legal or data-handling limits, read the Privacy Policy and Terms of Use rather than guessing.',
    ],
  },
];

const privacySections: SEOSection[] = [
  {
    heading: 'Overview',
    paragraphs: [
      'This Privacy Policy explains how FitMyPhotoA4 is designed to handle information when you use the browser-based photo sheet maker. The service arranges selected images into print-ready A4 layouts for passport, PAN Card, Voter ID, visa, and custom photo sizes. The central privacy design is local processing: the selected JPG or PNG is read by your browser and used to draw a preview and prepare a download on your device. The normal maker flow does not require an account and does not place your photograph in an upload queue.',
      'This policy is written for plain understanding, not as a promise that the internet, your device, or third-party services are risk-free. The page may load technical resources needed to display the interface or generate a PDF. Your browser can keep history, cache, temporary data, and downloads, and extensions can have their own permissions. Read this policy together with the security settings of your device and the policies of any third-party service that you choose to use.',
    ],
  },
  {
    heading: 'Photo files are processed in your browser',
    paragraphs: [
      'When you choose a JPG or PNG, the browser receives access to that file through the file picker or drag-and-drop action you initiate. FitMyPhotoA4 creates a temporary browser object for the image, draws the selected crop on a canvas, and uses that canvas to create the PNG or PDF download. The image-processing steps are intended to occur locally in the active browser session. The service does not need a user account, profile, or server-side photo library to arrange a standard sheet.',
      'Because the work happens in the browser, refreshing or closing the page normally ends the active working session. The maker may keep a temporary object URL while the image is being used, and the interface provides Reset so you can clear the current selection. You should still delete downloaded sheets and original images from shared devices. Local processing reduces the need for a remote copy, but it does not automatically remove files that your operating system, browser, backup software, or cloud-sync folder has saved.',
    ],
  },
  {
    heading: 'Information the page may receive',
    paragraphs: [
      'A web server or hosting platform may receive ordinary technical information when a browser requests the page, such as an IP address, request time, browser type, device type, referrer, and the files needed to respond. The exact records depend on the hosting and operational tools used to serve the site. These technical records are different from the photograph selected inside the page. FitMyPhotoA4 is intended to keep the photo itself in the browser during the maker workflow, rather than sending it as an application upload.',
      'If you contact the site owner directly, the information you include in that message may be used to respond, investigate a problem, or maintain the service. Do not send identity photographs, government document numbers, passwords, payment details, or other sensitive data in a support message unless a clearly identified process specifically requests it. The site may also receive information that you voluntarily provide through a form or an external service, which will be governed by the notice shown at that point.',
    ],
  },
  {
    heading: 'Fonts, scripts, and external resources',
    paragraphs: [
      'The interface can request external resources such as web fonts so the design displays consistently. The current page may also load a client-side PDF library from a content delivery network to support PDF export. A request for a font or script can reveal normal technical request information to the provider serving that resource. Those providers may have their own privacy notices, retention practices, and regional processing locations. You can use browser controls or content-blocking settings to limit external requests, although that may change the appearance or functionality of the page.',
      'The selected photograph is handled by the maker code in your browser. A font request and a client-side library request are not the same as an image upload. If a future version adds analytics, advertising, accounts, cloud storage, or an online editing service, this policy should be updated before those features are used for personal photographs. Review the live policy and the browser permission prompts rather than relying on an old copy saved elsewhere.',
    ],
  },
  {
    heading: 'Cookies, storage, and downloads',
    paragraphs: [
      'FitMyPhotoA4 does not need an account cookie for the basic photo arrangement flow. Your browser may nevertheless store ordinary cache entries, session information, local state, or history as part of displaying a website. The operating system and browser also control the Downloads folder. The generated PDF or PNG is a file you choose to create; it is not automatically a secure vault. Anyone with access to the device or a synced folder may be able to open it.',
      'Use a private device when working with identity photographs, remove files after printing, and check cloud backup or automatic sync settings. If you use a public print shop, do not leave the original photograph or generated sheet in its Downloads folder. Clear the browser tab and ask the operator to delete any temporary copy created during printing. These practical steps are important even when the web application itself does not upload the image.',
    ],
  },
  {
    heading: 'Why we process technical information',
    paragraphs: [
      'Technical request information may be used to deliver the site, keep the service available, diagnose failures, detect abuse, understand broad operational performance, and protect the hosting environment. Any analytics or logging should be limited to what is reasonably needed for those purposes and handled according to the systems that operate the site. FitMyPhotoA4 does not need to identify the person in a photograph to calculate dimensions or generate a sheet.',
      'The service does not use the face in your selected image to build a biometric profile, train a recognition model, or make an identity decision as part of the normal maker flow. It also does not verify that a photograph meets a government authority’s rules. If you voluntarily contact the owner with a support question, the contents of that communication may be retained for as long as reasonably needed to answer and improve the service, subject to applicable law.',
    ],
  },
  {
    heading: 'Advertising and future changes',
    paragraphs: [
      'If advertising, affiliate links, analytics, sign-in, payments, cloud storage, or other tracking technologies are introduced, the service should describe them clearly and update this policy. Advertising providers can use cookies or similar technologies, and their processing may be different from the local photo workflow. Do not assume that an advertisement or external link is endorsed, secure, or subject to this policy. Open third-party pages with the same care you would use for any online service.',
      'This policy may change when the product, legal requirements, hosting arrangements, or privacy practices change. A new version should be posted on this page with an updated effective date. The policy that applies to a particular visit is the version available at that time, subject to any rights you have under applicable data protection law. Material changes should be described in a way that a normal visitor can understand rather than hidden in technical language.',
    ],
  },
  {
    heading: 'Your choices and rights',
    paragraphs: [
      'You can choose not to select a photograph, close the page, clear the browser session, delete downloaded files, block external resources, or stop using the service. If you voluntarily provide personal information through a contact channel, you may ask what information was received and request correction or deletion where applicable. The response may depend on the law that applies, the identity verification needed to protect someone else’s information, and whether a record must be kept for security or legal reasons.',
      'If you are using the service for another person, make sure you have permission to handle and print that person’s photograph. Do not use FitMyPhotoA4 to process images in a way that violates a person’s privacy, a document authority’s rules, or applicable law. Parents, guardians, employers, and service providers should consider their own duties before preparing someone else’s identity image on a shared device.',
    ],
  },
  {
    heading: 'Security limits and contact',
    paragraphs: [
      'No website can guarantee absolute security. A browser vulnerability, malicious extension, compromised device, unsafe network, or mistaken download can expose a file outside the control of the maker. Keep the browser and operating system updated, use screen lock and device protection, avoid unknown extensions, and print from a trusted environment. If you see an unexpected upload prompt, permission request, or payment screen, stop and verify that you are on the intended site.',
      'For a privacy question, use the site’s available contact method and describe the issue without attaching identity photographs or document numbers. Include only the technical detail needed to investigate. The Privacy Policy describes the intended standard photo flow; it does not override a specific notice shown by a third-party service or a separate future feature. If this page conflicts with a current legal requirement, the applicable law controls.',
    ],
  },
  {
    heading: 'Important reminder for identity photographs',
    paragraphs: [
      'Local browser processing is a meaningful privacy feature, but it is only one part of responsible document preparation. Confirm that the image meets the authority’s current size and appearance rules, keep the source file private, print at the correct scale, and dispose of spare copies safely. Do not upload a government photograph to an unrelated online editor simply to change a background or add a filter. When possible, take a new clean photograph instead of sharing a sensitive file with an unknown service.',
      'By using the maker, you acknowledge that your browser and device are involved in processing the selected file and that you are responsible for the copies you download, print, share, or store. Read the Terms of Use for the service limitations and the FAQ for practical answers about printing, sizes, and free use. If you do not agree with this privacy approach, do not select a photograph or continue using the maker.',
    ],
  },
  {
    heading: 'Data minimisation in everyday use',
    paragraphs: [
      'The safest identity-photo workflow is usually the smallest one: select only the image you intend to use, prepare the sheet, download only the format you need, and remove temporary copies after printing. Do not upload a whole photo folder, a scan of an identity document, or a form containing unrelated personal information merely to make one small photo. If you are helping a family member, ask which file is approved and avoid keeping extra versions on your own device. When a print shop asks for a file, transfer only the generated sheet and confirm how its temporary copy will be deleted.',
      'Remember that privacy can be lost through ordinary habits even when an app is designed for local processing. A browser history entry can reveal a visit, a cloud backup can copy a download, a messaging application can retain an attachment, and a shared printer can keep a job in memory. Use private devices, review the selected file before opening the picker, and check the output folder after completion. This policy describes the intended behaviour of FitMyPhotoA4; it cannot remove records created by software, hardware, networks, or services outside the maker’s control.',
    ],
  },
  {
    heading: 'How to make a privacy-conscious print',
    paragraphs: [
      'Before selecting a file, close unrelated tabs and choose a private device that you control. After the sheet is generated, download only the format you need and give the file a neutral name if the device is shared. Print from a trusted viewer, collect every page, and ask a print shop how it handles temporary files or printer job history. When the print is finished, use Reset, close the browser tab, empty the relevant download or temporary folder, and check whether automatic backup has copied the output elsewhere.',
      'These steps are recommendations for reducing exposure, not a guarantee of secrecy. Your browser may keep history, your operating system may create temporary data, and third-party software may have permissions that the website cannot inspect. If you use a work or school device, follow its information-security rules. If a person has asked you to prepare their photograph, get permission and tell them where the output will be stored. The goal of local processing is to avoid an unnecessary server copy while leaving the user in control of ordinary device and file-handling choices.',
    ],
  },
];

const termsSections: SEOSection[] = [
  {
    heading: 'Acceptance and purpose',
    paragraphs: [
      'These Terms of Use describe the basic conditions for using FitMyPhotoA4, a browser-based tool that arranges photographs on A4 sheets. By opening the maker, selecting a file, downloading an output, or using related pages, you agree to use the service lawfully and responsibly. If you do not agree with these terms, do not use the tool. These terms are written for a simple client-side utility and do not create a contract for government application processing, professional photography, legal advice, or document approval.',
      'FitMyPhotoA4 is provided to help with measurement, layout, and printing. It does not submit forms, communicate with an authority, verify identity, certify a photograph, guarantee acceptance, or replace the current instructions of a passport office, embassy, visa centre, election authority, school, employer, or other organisation. You remain responsible for checking the destination’s requirements before relying on a generated sheet.',
    ],
  },
  {
    heading: 'Permitted use',
    paragraphs: [
      'You may use the maker to prepare photographs that you have the right to handle and print. You may download and print the resulting PNG or PDF for personal, family, educational, employment, travel, or administrative purposes, provided your use follows the rules of the receiving authority and applicable law. If you prepare a photograph for another person, you should have that person’s permission or another lawful basis to process and print it.',
      'You must not use the service to impersonate another person, create deceptive identity documents, evade an authority’s requirements, harass someone, violate copyright or privacy rights, distribute unlawful material, attack the site, bypass technical limits, or interfere with another visitor’s access. You must not attempt to reverse engineer, scrape, overload, or automate the service in a way that creates unreasonable traffic or risk. The owner may limit access when needed to protect the service or visitors.',
    ],
  },
  {
    heading: 'Photo requirements and authority rules',
    paragraphs: [
      'Presets such as Passport size, PAN Card photo, and Voter ID photo are convenience settings based on commonly used measurements. They are not official endorsements and may not match every current application. Requirements can vary by country, document type, application channel, state, date, or receiving office. Confirm the current width, height, background, face position, expression, paper, number of copies, and recency rule before printing. If the official measurement is different, use Custom size or follow the authority’s digital upload instructions.',
      'A photograph can be physically exact and still be rejected for an unsuitable background, shadow, crop, expression, clothing, glasses, head covering, age, paper, or identity issue. FitMyPhotoA4 cannot reliably inspect those details or predict a clerk’s decision. A generated sheet is not proof of compliance. You should print a test, measure the result, and compare the photograph with the current checklist before using it for an important appointment.',
    ],
  },
  {
    heading: 'Your files and local processing',
    paragraphs: [
      'The standard maker flow is designed to read your selected JPG or PNG in the browser and create the preview and download on your device. You are responsible for the files you choose, the device you use, and the copies you save. Do not select files that you are not allowed to process. Use a private and updated device, remove downloaded copies from shared computers, and check cloud-synced folders. The Privacy Policy explains the local processing design and the difference between the image workflow and ordinary technical page requests.',
      'The service does not promise that a browser session, cache, download folder, extension, operating system, backup service, or network is private or secure. If a future feature asks you to upload, sign in, pay, or store a file online, read the notice presented for that feature. You should not assume that a third-party link, font provider, PDF library, print shop, or external website is controlled by FitMyPhotoA4.',
    ],
  },
  {
    heading: 'Downloads, printing, and output quality',
    paragraphs: [
      'The PNG and PDF are generated from the settings you choose. You are responsible for checking the selected dimensions, crop, spacing, paper, and output option before downloading. When printing, choose A4 paper, portrait orientation where appropriate, and Actual size or 100 percent. Printer software can shrink or enlarge a page without changing the source file. FitMyPhotoA4 cannot control a printer, print shop, browser, PDF reader, paper, ink, or cutting tool after you download the output.',
      'Print one sample and measure one rectangle before producing a batch. Keep the output master unchanged and avoid putting it into another program that resizes the page. If a destination requires a particular format, resolution, colour mode, paper, stamp, signature, or photographer information, follow that requirement first. You accept that your final result depends on the source image, device, printer, paper, and authority rules as well as the maker’s layout.',
    ],
  },
  {
    heading: 'No professional or legal advice',
    paragraphs: [
      'The guides, FAQ answers, size tables, and examples on the site are general educational information. They are not legal advice, immigration advice, government advice, photography certification, or a promise that a specific authority currently uses a particular measurement. Rules can change without notice, and a local office may apply a different process from a general online guide. Always consult the official source for the application you are making.',
      'The service also does not judge whether a face is suitable, whether a person is the subject shown, whether a document is genuine, or whether an image meets biometric or identity standards. Do not represent a generated sheet as an official document or certificate. If you need professional photography or an authority-approved digital capture, use the channel named by that authority rather than relying only on a browser layout tool.',
    ],
  },
  {
    heading: 'Availability and changes',
    paragraphs: [
      'The owner may update, suspend, remove, or change the maker, presets, copy, designs, external resources, or download behaviour at any time. A browser or hosting failure may temporarily make the service unavailable. New versions may change calculations, supported formats, output quality, or page content. The current version of these terms and the current official application instructions should be checked before an important use.',
      'The owner may also restrict traffic, block abusive requests, or discontinue a feature without guaranteeing advance notice. No update creates an obligation to preserve an old result or keep a particular preset available. If a generated file is important, keep a private copy and verify it before the relevant deadline. Do not rely on the website as your only copy of an image, appointment document, or application record.',
    ],
  },
  {
    heading: 'Third-party services and links',
    paragraphs: [
      'The page can use third-party resources to load fonts, scripts, or other technical assets. You may also choose to follow a link to an external printer, authority, payment provider, social platform, or information source. Those services have separate terms, privacy policies, security practices, and availability. FitMyPhotoA4 does not control and does not guarantee third-party content, accuracy, accessibility, or transaction handling. Review the destination before sharing a photograph or personal information.',
      'An external resource may be unavailable, altered, or blocked by your browser or network. The maker may still provide a local PNG or may show an error when a required PDF library has not loaded. Do not bypass security warnings or install an unknown extension to make a third-party feature work. Contact the relevant provider for issues inside its service, and keep the image local whenever an online upload is not required.',
    ],
  },
  {
    heading: 'Disclaimers and limitation of liability',
    paragraphs: [
      'To the extent allowed by law, the service is provided on an as-is and as-available basis without a promise that it will be uninterrupted, error-free, current, compatible with every browser, or suitable for a particular application. The owner does not guarantee the accuracy of a preset, the acceptance of an image, the physical output from a printer, the security of a device, or the availability of an external resource. You use the service at your own judgment and risk.',
      'To the extent allowed by law, FitMyPhotoA4 and its owner are not responsible for indirect loss, missed appointments, rejected applications, wasted paper or ink, incorrect printer scaling, lost files, device problems, third-party failures, or consequences of using an outdated requirement. Nothing in these terms removes a consumer right or liability that cannot legally be excluded. Where liability cannot be excluded, it is limited to the minimum extent permitted by applicable law.',
    ],
  },
  {
    heading: 'Questions and responsible use',
    paragraphs: [
      'If you have a question about the site, use the available contact method and share only the information needed to describe the issue. Do not send identity photographs, government document numbers, passwords, or payment details in an unsolicited message. For data handling, read the Privacy Policy. For practical questions about PAN size, free use, printing, local processing, and custom dimensions, read the FAQ and the dedicated document pages.',
      'Responsible use means checking the official rule, protecting the original photograph, using the correct print scale, measuring a test copy, and keeping the result only as long as needed. These terms do not turn a general-purpose layout tool into a document authority. If any part of these terms is found unenforceable, the remaining parts continue to apply to the extent allowed by law. Continued use after an update indicates acceptance of the updated terms where that acceptance is legally valid.',
    ],
  },
  {
    heading: 'Your responsibility for decisions',
    paragraphs: [
      'You decide whether to use a source photograph, a preset, a custom measurement, a colour mode, a paper type, or a generated file. Before an important application, you should independently verify each decision against the receiving authority’s current instructions. You should also allow enough time for a test print, a replacement source image, a printer problem, or a request for a different number of copies. A fast browser result is not a substitute for planning an appointment or confirming a form’s acceptance criteria.',
      'If you share an output with another person, tell them what settings you used and remind them to check the print scale. Do not remove a warning, disclaimer, file label, or official instruction from a document in a way that makes the output misleading. If you discover that a guide or preset is outdated, stop relying on it and use the authority’s current source. The service is intentionally general-purpose: it can help with the mechanical arrangement of pixels and millimetres, while the user remains responsible for lawful, accurate, and considerate use.',
    ],
  },
  {
    heading: 'Reading these terms with the site pages',
    paragraphs: [
      'The dedicated Passport, PAN Card, and Voter ID pages explain practical workflows and commonly used starting measurements. The FAQ answers everyday questions in shorter form, while the Privacy Policy explains the local browser design and ordinary technical page requests. None of those pages changes the authority, disclaimer, or responsibility terms here. They are support content for using a general-purpose layout tool, and they should be read together with the current instructions for the document you are preparing.',
      'If you are unsure whether a photograph should be uploaded, printed, signed, attached, or replaced, pause and ask the receiving authority or an appropriately qualified professional. Do not treat search ranking, a page heading, an old form, or another user’s successful application as proof of a current rule. FitMyPhotoA4 aims to be clear about what it can do: arrange pixels on a measured A4 page. The final choice to use, share, print, or submit that page belongs to you.',
      'Keep a copy of the official instruction you relied on when you prepared the sheet, especially if your appointment is weeks away. A website, form, or local process may change before you return to it. If you share the output with a printer or helper, share only the necessary file and explain that it must be printed at 100 percent. You are also responsible for checking that any person assisting you has permission to handle the photograph. These simple controls help prevent misuse while keeping the service focused on its limited purpose.',
    ],
  },
];

const howItWorksSections: SEOSection[] = [
  {
    heading: 'What FitMyPhotoA4 does',
    paragraphs: [
      'FitMyPhotoA4 turns one clear JPG or PNG into a measured A4 photo sheet. Instead of opening a word processor, dragging an image by eye, copying it several times, and hoping the printer keeps the same dimensions, you choose a photo size in millimetres and let the maker calculate a repeatable grid. The live preview shows the page before you download it, and the fit count tells you how many copies are available at the current size and cutting gap. The result is a simple sheet you can take to a home printer or a local print shop.',
      'The tool is a layout assistant, not an official approval checker. It can keep a 35 × 45 mm passport rectangle or a 25 × 35 mm PAN Card or Voter ID rectangle consistent, but it cannot know whether your authority wants a particular background, head height, expression, paper, age of photograph, signature, or digital file. Start with the receiving authority’s current instructions. Then use this tutorial to move through the three practical stages: upload the right original, arrange and inspect the measured sheet, and download and print it without accidental resizing.',
    ],
  },
  {
    heading: 'Before you begin: prepare the right original',
    paragraphs: [
      'The first step happens before you open the file picker. Choose the largest clear original photograph available on your device. A full-resolution camera image is usually a better starting point than a screenshot, a social-media download, or a picture forwarded through a messaging app. Those copies may look fine on a phone but can become soft when the face is printed at a few centimetres. Leave comfortable space around the head and shoulders so a portrait crop does not cut into the hair or required shoulder area.',
      'Use a recent, front-facing image with soft light from in front of the subject. Avoid strong shadows, a bright window behind the person, a visible wall corner, patterned backgrounds, beauty filters, or face-shaping edits. If an office or portal gives a precise rule for glasses, head coverings, expression, background, or image date, check that rule before using the maker. A clear source makes every later stage easier: the crop is more natural, the preview is easier to inspect, and the final print has better detail.',
    ],
  },
  {
    heading: 'Step 1 — Upload your photo',
    paragraphs: [
      'Open the maker and look for the Build your sheet panel. You can drag a JPG or PNG into the dashed upload area, or choose Choose photo to open your device’s file picker. The interface accepts JPG and PNG files so the browser can read a common camera or phone image without a conversion step. Select one image at a time and watch for the filename and check mark that confirm the photo has loaded. If the image is not accepted, choose a valid JPG or PNG rather than renaming a different file type.',
      'The upload is designed around local browser processing. The selected image is read by the active browser session so it can be cropped, previewed, and used to create the download on your device. You do not need an account or a photo-processing queue for the normal flow. Even so, use a private device when working with an identity photograph. When you finish, use Reset, close the tab, and remove the downloaded sheet from a shared computer or print-shop machine. Local processing helps, while device and file security remain your responsibility.',
    ],
  },
  {
    heading: 'Step 2 — Choose the correct photo size',
    paragraphs: [
      'After the image loads, open the Photo type menu. Choose Passport size for a 35 × 45 mm starting layout, PAN Card photo for 25 × 35 mm, or Voter ID photo for 25 × 35 mm when that matches the current application instructions. The tool also includes stamp, US visa, Canada passport, China passport, and UAE passport starting sizes. The value beside the control shows the selected width and height in millimetres, so you do not have to remember which preset is active.',
      'If your form asks for another measurement, choose Custom size and enter the exact width and height in millimetres. Do not select the closest-looking preset or change the printer scale to compensate for a different authority rule. As you change the size, the number of columns, rows, and total photos updates in the preview area. This immediate feedback is useful when a less common visa, school, employment, residence, or local form asks for a particular rectangle.',
    ],
  },
  {
    heading: 'Step 3 — Arrange the A4 sheet',
    paragraphs: [
      'The A4 live preview is the main arrangement screen. It shows a portrait page measuring 210 × 297 mm, with a 10 mm quiet edge margin and repeated copies of your selected rectangle. The maker calculates rows and columns using the physical measurements rather than the size of the browser window. That is why the fit count is more useful than estimating how many images appear to fit visually on a monitor. The preview is a working view of the page, not a screenshot that you should copy into another document.',
      'Use the Cutting space control to decide how much room sits between neighbouring photos. A small gap makes efficient use of paper, while a wider gap gives scissors, a ruler, or a small paper trimmer more room. Four to six millimetres is a practical starting point for many home-print workflows, but the best choice depends on your tool and the print shop’s cutter. Watch the fit count as you adjust the gap. Do not remove the outer safety margin just to fit one extra copy.',
    ],
  },
  {
    heading: 'Step 4 — Inspect the crop and quality',
    paragraphs: [
      'Look at the face in the A4 preview before downloading. FitMyPhotoA4 fills the selected rectangle proportionally, so it will crop the sides of a wide image or remove unused space from a tall image instead of stretching the face. Confirm that the head remains inside the frame, both eyes and important facial features are visible, and the background is even. If the crop is too tight, return to the original image and choose one with more space around the subject. Retaking the photograph is usually safer than forcing a poor source to fit.',
      'The optional Black & White setting applies grayscale to the generated sheet, and HD Quality prepares a larger 600 DPI export instead of the standard 300 DPI output. Use those settings only when they suit the destination and printer. HD cannot restore detail that was missing from a tiny or blurry original, and a grayscale image may be unsuitable when colour is required. Keep the original colour file so you can create another version later without repeated compression.',
    ],
  },
  {
    heading: 'Step 5 — Download PNG or PDF',
    paragraphs: [
      'When the crop, size, spacing, and output settings look correct, choose the format that matches your next step. Download PDF is usually the easiest choice for a print shop because it keeps the A4 page together as a print document. PNG is useful when your printer or image application expects a raster file, or when you want to inspect the sheet before sending it elsewhere. Both files are prepared locally in the browser after a valid image has loaded, and the controls stay disabled until there is a photo to export.',
      'Give the downloaded file a clear name that identifies the person and purpose without placing unnecessary personal information in a shared folder. Keep the original and the generated sheet separate so you can create a new size if the authority’s instructions change. Do not take a screenshot of the preview as your final file. A screenshot has no reliable physical relationship to A4 and can lose the exact page dimensions that the PDF or generated PNG preserves.',
    ],
  },
  {
    heading: 'Step 6 — Print at actual size',
    paragraphs: [
      'Open the downloaded PDF in a reliable viewer and choose A4 paper with portrait orientation. Select Actual size, 100%, or Do not scale. Turn off Fit to page, Shrink oversized pages, Scale to printable area, Borderless expansion, and similar automatic options unless your printer documentation specifically requires one of them. If you use a PNG, print from an application that respects the intended physical dimensions or print resolution. Do not paste the image into a document and resize it by dragging the corners.',
      'Print one test page before producing a complete batch for a passport appointment, PAN application, Voter ID request, visa, or school form. Measure one finished photo from outside edge to outside edge with a ruler. If the size is wrong, correct the printer dialogue rather than changing the photo preset. Print-shop software sometimes defaults to Letter paper or silently shrinks a page to avoid its margins. Tell the operator that the file is an A4 layout and must be printed at 100 percent.',
    ],
  },
  {
    heading: 'Cut, store, and troubleshoot with confidence',
    paragraphs: [
      'Once the test print measures correctly, cut along the photo edges using clean scissors, a ruler, or a paper trimmer. A wider cutting gap can help you avoid touching the next face. Let fresh ink dry before stacking the copies, keep them flat in a clean envelope, and avoid folding the face. If the sheet is empty, make sure a valid image finished loading. If the crop looks wrong, choose a better original. If the PDF button reports that its library is still loading, wait briefly and try again instead of opening an unknown replacement website.',
      'Keep different people and different document types on separate, labelled sheets. A 25 × 35 mm photo for one application may look almost identical to another small ID photo, and an unlabeled stack can lead to a mix-up. Before an appointment, check the official form, payment, identity documents, signatures, photograph count, and any digital-upload requirement. Delete extra files from shared devices after printing. For detailed document-specific advice, use the Passport, PAN Card, and Voter ID guides alongside this tutorial.',
    ],
  },
  {
    heading: 'A calm three-stage workflow',
    paragraphs: [
      'The whole process can be remembered as Upload, Arrange, Download. Upload means selecting a clear, recent original and confirming the filename. Arrange means choosing the authority’s measurement, checking the proportional crop, setting a sensible cutting gap, and reading the A4 fit count. Download means choosing PDF or PNG, printing at 100 percent on A4, and measuring a test copy before you make spares. Each stage has a simple checkpoint, so you do not have to trust a result that you have not inspected.',
      'This workflow saves time because it separates image quality, physical measurement, and printer behaviour instead of trying to fix all three at once. It also builds trust through visible steps: the upload panel confirms what was selected, the live preview shows how the sheet is arranged, and the download controls make the final format explicit. FitMyPhotoA4 does not promise official acceptance, but it makes the mechanical part of preparing a repeatable photo sheet clear, local, and easy to verify.',
    ],
  },
];

const howItWorksFaqs = [
  {
    question: 'Do I need to upload my photo to a server?',
    answer: 'No account or photo-processing queue is needed for the normal workflow. The browser reads the selected JPG or PNG locally to create the preview and download. Use a private device, then reset the maker and remove downloaded copies from shared computers.',
  },
  {
    question: 'Which size should I choose first?',
    answer: 'Choose the preset that matches the current instructions for your application: Passport is 35 × 45 mm, while PAN Card and Voter ID start at 25 × 35 mm. If the authority gives another measurement, use Custom size in millimetres.',
  },
  {
    question: 'Why does my photo look cropped?',
    answer: 'The maker fills the selected rectangle without stretching the image. When the original and selected rectangle have different proportions, some edges are cropped. Use a sharper original with more space around the subject instead of stretching the face.',
  },
  {
    question: 'Should I download PNG or PDF?',
    answer: 'PDF is usually best for a print shop because it keeps the A4 page together. PNG works well when an image-based printer workflow is required. Whichever format you choose, print at 100% or Actual size and measure one copy.',
  },
  {
    question: 'How can I trust the final physical size?',
    answer: 'The maker calculates the layout in millimetres, but your printer can still resize a page. Select A4 and 100% / Actual size, turn off Fit to page, and measure one test photo with a ruler before printing the full batch.',
  },
];

export const SEO_PAGES: Record<string, SEOPage> = {
  '/passport-photo-size-maker': {
    path: '/passport-photo-size-maker',
    navLabel: 'Passport',
    title: 'Passport Photo Size Maker | 35 × 45 mm A4 Sheet',
    description: 'Create measured 35 × 45 mm passport photo sheets on A4. Print at 100% with FitMyPhotoA4 and keep your image processing local in the browser.',
    eyebrow: 'Passport photo guide',
    intro: 'Prepare a clean, measured passport photo sheet without resizing by eye. Confirm the official rules, choose 35 × 45 mm when it matches, and print the result at actual size.',
    sections: passportSections,
  },
  '/pan-card-photo-maker': {
    path: '/pan-card-photo-maker',
    navLabel: 'PAN Card',
    title: 'PAN Card Photo Maker | 25 × 35 mm A4 Sheet',
    description: 'Make 25 × 35 mm PAN Card photo sheets on A4 with a local browser workflow, clear print instructions, and a PDF download.',
    eyebrow: 'PAN Card photo guide',
    intro: 'Arrange a sharp PAN Card photograph on a measured A4 page. Use the 25 × 35 mm preset when it matches your current form instructions, then verify one print with a ruler.',
    sections: panSections,
  },
  '/voter-id-photo-maker': {
    path: '/voter-id-photo-maker',
    navLabel: 'Voter ID',
    title: 'Voter ID Photo Maker | Measured A4 Photo Sheet',
    description: 'Prepare Voter ID photo copies on A4 with a 25 × 35 mm starting preset, local browser processing, and actual-size print guidance.',
    eyebrow: 'Voter ID photo guide',
    intro: 'Create a consistent Voter ID photo sheet for printing, while keeping the original image in your browser. Always compare the preset with the latest election-office instructions.',
    sections: voterSections,
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    navLabel: 'Privacy',
    title: 'Privacy Policy | FitMyPhotoA4',
    description: 'Read how FitMyPhotoA4 handles browser-based photo processing, downloads, technical page requests, fonts, scripts, and privacy choices.',
    eyebrow: 'Privacy and data',
    intro: 'FitMyPhotoA4 is designed for local photo-sheet creation. This policy explains what happens in your browser, what technical information a website may receive, and how to protect identity photographs on your device.',
    sections: privacySections,
  },
  '/terms-of-use': {
    path: '/terms-of-use',
    navLabel: 'Terms',
    title: 'Terms of Use | FitMyPhotoA4',
    description: 'Read the FitMyPhotoA4 terms for photo-sheet creation, official requirements, local processing, printing, limitations, and responsible use.',
    eyebrow: 'Terms of use',
    intro: 'These terms explain the intended use and limits of FitMyPhotoA4, a browser tool for measured A4 photo layouts. The official authority’s current rules always come first.',
    sections: termsSections,
  },
};

export const FAQ_PAGE: SEOPage = {
  path: '/faq',
  navLabel: 'FAQ',
  title: 'FAQ | PAN, Passport, Voter ID Photo Sizes and Printing',
  description: 'Answers about PAN Card photo size, passport photos, Voter ID sheets, free use, local processing, A4 printing, custom sizes, and privacy.',
  eyebrow: 'Frequently asked questions',
  intro: 'Find practical answers before you upload, download, or print. FitMyPhotoA4 helps with measured layouts, while each authority’s current instructions decide what is acceptable.',
  sections: faqSections,
};

export const ALL_SEO_PAGES: Record<string, SEOPage> = {
  ...SEO_PAGES,
  '/faq': FAQ_PAGE,
  '/how-it-works': {
    path: '/how-it-works',
    navLabel: 'How it works',
    title: 'How It Works | Upload, Arrange and Download A4 Photos',
    description: 'Learn how to use FitMyPhotoA4 step by step: upload a photo, arrange exact-size copies on A4, download, print, and check the result.',
    eyebrow: 'How it works',
    intro: 'Follow a calm three-stage workflow with visual guides: upload your original, arrange a measured A4 sheet, then download and print it at actual size.',
    sections: howItWorksSections,
    faqItems: howItWorksFaqs,
  },
};