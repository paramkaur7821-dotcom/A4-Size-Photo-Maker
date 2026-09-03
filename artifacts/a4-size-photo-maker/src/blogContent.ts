import type { SEOPage } from './seoContent';

type BlogPost = {
  path: string;
  category: string;
  readTime: string;
  title: string;
  description: string;
};

const passportIndiaSections = [
  {
    heading: 'Passport photo dimensions in India: the short answer',
    paragraphs: [
      'For many Indian passport and visa photo workflows, the commonly used printed size is 35 × 45 millimetres. That is a portrait rectangle with a width of 35 mm and a height of 45 mm. The number describes the physical photograph that goes on paper, not the size of the original image in your phone. A phone camera may produce a file thousands of pixels wide, but the finished print can still be only a few centimetres tall. FitMyPhotoA4 includes a 35 × 45 mm Passport size preset so you can arrange repeated copies on an A4 sheet without dragging an image by eye.',
      'The short answer is useful, but it should not be treated as a universal rule for every passport, visa, or government form. An Indian passport application, an overseas visa centre, an embassy, a residence permit, and an employer identity process may use different measurements or digital requirements. Always compare the dimensions with the latest instructions for your exact application. If the authority gives a different size, use the Custom size option and enter its width and height in millimetres. The official checklist remains the source of truth; this article explains the practical printing workflow.',
    ],
  },
  {
    heading: 'Why 35 × 45 mm is a physical measurement',
    paragraphs: [
      'When a form says 35 × 45 mm, it is describing the rectangle that will be cut from the printed sheet. It is not asking you to resize the original camera file to 35 pixels by 45 pixels. A file with only a few dozen pixels would be too small to print clearly. The original should have enough detail for the face, hair, glasses, and edges of the head to remain recognisable after the image is cropped and placed on paper. FitMyPhotoA4 separates the source file from the printed layout: it uses the original to fill the selected physical rectangle and prepares an A4 page around it.',
      'This difference also explains why a screenshot of the tool is not a finished passport photograph. A screenshot is tied to the display size and browser window, while a generated PDF or PNG is prepared for a measured page. The PDF is especially useful for a print shop because it keeps the A4 page together. The PNG can work for an image-based workflow, but it must still be printed by software that respects the intended dimensions. In either case, the printer dialogue decides whether the physical result stays at the size you selected.',
    ],
  },
  {
    heading: 'How to choose a suitable source image',
    paragraphs: [
      'Start with the largest clear JPG or PNG available. A full-resolution camera photograph or original phone image is normally better than a social-media download, a screenshot, or a file forwarded through several messaging apps. Compression removes fine detail and can create blocks around hair and glasses. Leave some breathing room around the head and shoulders when taking a new image. A portrait crop needs enough space to keep the top of the head and the required shoulder area inside the frame. A source that is already tightly cropped may look acceptable on a phone but fail when it is fitted to a 35 × 45 mm rectangle.',
      'Take the image with the camera at face height and use soft light from in front of the subject. Avoid an intense window behind the face, a hard flash that makes a dark shadow, or a visible wall corner. Ask the subject to look towards the lens with a natural expression. Do not use a beauty filter, face-slimming effect, artificial blur, or an edit that changes the person’s appearance. The maker can keep the rectangle exact and crop proportionally, but it cannot decide whether a particular face, background, expression, or image date meets an authority’s biometric or administrative rule.',
    ],
  },
  {
    heading: 'Background and face position requirements',
    paragraphs: [
      'Many passport and visa instructions expect a plain light background, often white or off-white, with even illumination and no strong shadow behind the head. A pale wall is not automatically a compliant background if it shows texture, a corner, a curtain, furniture, or a colour cast. Stand a short distance away from the wall so the light can spread and the shadow does not sit directly behind the subject. Check the full original before you create the sheet. A layout tool can show you what will be printed, but it does not remove a distracting background or verify the exact shade required by a destination.',
      'The face should be upright and centred, while the head height and visible shoulders should follow the official instructions for your application. Keep both eyes visible unless an authority gives a documented exception. Remove sunglasses and avoid anything that hides the important features of the face. Rules about religious head coverings, spectacles, medical items, and expression can differ, so do not copy a rule from a different country or an older application. The safest process is to check the official image guide first, then use FitMyPhotoA4 only for the measured arrangement and print preparation.',
    ],
  },
  {
    heading: 'Passport photo size for Indian applications and visas',
    paragraphs: [
      'People often use the phrase Indian passport photo size when they are actually preparing one of several related applications. A passport renewal may use one instruction, while a visa application for another country may use a square image, a different portrait ratio, a particular pixel range, or a digital upload. A residence permit, OCI application, school record, employment file, and embassy appointment can also ask for separate dimensions. Never assume that the size printed on a previous form applies to the new one. Confirm the exact document, office, application channel, and date before printing.',
      'If the current instruction says 35 × 45 mm, the Passport size preset is a convenient starting point. If it says 2 × 2 inches, convert only when the authority has clearly asked for a physical square print, and consider using Custom size with the exact millimetre equivalent. If it asks for pixels or a maximum file size, use the portal’s digital instructions instead of uploading a screenshot of an A4 sheet. FitMyPhotoA4 can help with a physical page, but it should not be used to guess a digital upload specification.',
    ],
  },
  {
    heading: 'Make an A4 sheet without resizing by eye',
    paragraphs: [
      'Open FitMyPhotoA4, select the clearest JPG or PNG, and choose Passport size from the Photo type menu. The control shows 35 × 45 mm, and the A4 live preview fills with repeated copies using a 10 mm edge margin. You can change the Cutting space value to leave more room between neighbouring photos. A small gap uses paper efficiently, while a wider gap makes trimming with scissors or a paper cutter easier. The photo count updates as the size and spacing change, so you can plan the number of spares before you download.',
      'Review the crop in the preview rather than judging the size of the page on your screen. When the face, background, and dimensions look right, choose Download PDF for a print shop or PNG for an image workflow. Keep the generated file unchanged. Do not copy the preview into a word processor and drag the corners, because that can remove the physical relationship between the image and the page. If you later discover that the authority wants another size, return to the original and create a new sheet with Custom size.',
    ],
  },
  {
    heading: 'Print 35 × 45 mm photos at actual size',
    paragraphs: [
      'The most important print setting is scale. In your PDF viewer, select A4 paper, portrait orientation, and Actual size or 100%. Turn off Fit to page, Shrink oversized pages, Scale to printable area, and borderless expansion unless your printer documentation specifically requires one of those options. A print shop may default to Letter paper or reduce a page to fit its margins, so tell the operator that the file is an A4 layout and must not be resized. The ten-millimetre outer margin gives the page a better chance of fitting inside common printable areas.',
      'Always print one test sheet before producing a full batch. Measure one photograph from outside edge to outside edge with a ruler. If the result is not close to 35 × 45 mm, inspect the print dialogue first; changing the photo preset to compensate for a scaled printer only makes the source layout harder to understand. Once the sample is correct, cut the remaining copies along the rectangle edges and keep them flat in a clean envelope. A five-minute ruler check can prevent a rejected appointment photograph and an unnecessary second print.',
    ],
  },
  {
    heading: 'Common mistakes with Indian passport photographs',
    paragraphs: [
      'A familiar mistake is treating the screen preview as a ruler. Browser zoom, display size, and responsive layout do not tell you the physical size of a paper photograph. Another is choosing the right 35 × 45 mm preset but using a background or face position that the receiving authority does not accept. Low-resolution source files, heavy filters, hard shadows, old photographs, and a crop that clips the head are also common causes of rejection. A measured rectangle is necessary for a clean sheet, but it is not a guarantee of approval.',
      'Avoid printing the same sheet repeatedly without checking the first copy. Ink streaks, a colour cast, a low-quality paper, or automatic printer scaling can change the result. Do not fold a face, write on it, or add a signature unless the form specifically explains where that mark belongs. Keep the original file separate from the sheet so you can prepare a new version if the office asks for a different crop or a more recent photograph. The current authority checklist should always come before an older file or a general internet guide.',
    ],
  },
  {
    heading: 'Privacy and file handling for passport photos',
    paragraphs: [
      'A passport photograph is sensitive personal information. FitMyPhotoA4 is designed so the normal selection, crop, preview, and export happen in the browser on your device rather than in an online upload queue. You do not need to create an account for the standard workflow. Use a trusted and updated device, and do not select unrelated identity documents or a whole folder when one image is enough. When you finish, use Reset, close the tab, and remove generated files from a shared computer or public print-shop machine.',
      'Local processing does not control every other part of a device. A browser may keep history or temporary data, a cloud folder may sync downloads, and extensions may have permissions to inspect pages or files. Review the Privacy Policy for the distinction between the local image workflow and normal technical page resources such as fonts or a PDF library. If you are preparing a photograph for someone else, make sure you have permission to handle it and tell them where the file will be stored.',
    ],
  },
  {
    heading: 'Final checklist for a 35 × 45 mm print',
    paragraphs: [
      'Before downloading, confirm the application type, physical dimensions, background, head position, expression, recency requirement, paper, and number of copies. Then check that the source is sharp, the face is centred, and no required part of the head or shoulders is clipped. Select Passport size only when 35 × 45 mm matches the current instruction. If it does not, use Custom size. Use HD Quality only when a larger export suits the printer and the original has enough pixels to benefit from it; higher DPI cannot repair blur.',
      'After downloading, select A4 and 100% / Actual size, print one sample, and measure it. Keep the correct sheet flat, label it for the person and application, and carry a few clean spares. If the receiving office asks for a different image format, size, background, or signature method, follow that instruction rather than relying on a general preset. For the simple tool workflow, visit the How It Works page. For the actual maker, open the Passport Photo Size Maker and begin with one clear original.',
    ],
  },
];

const panRequirementsSections = [
  {
    heading: 'PAN Card photo size: the common starting point',
    paragraphs: [
      'A PAN Card application commonly uses a small recent colour photograph, often described as 25 × 35 millimetres or approximately 2.5 × 3.5 centimetres. That is the common physical starting point used for many paper PAN workflows, and FitMyPhotoA4 includes a PAN Card photo preset at 25 × 35 mm. The exact instruction can depend on the form version, correction request, application channel, or service provider, so read the current photograph line before printing. A preset is a convenience, not a government approval.',
      'The physical size is separate from the original file size. A phone photograph can be thousands of pixels wide while the printed PAN photo is only a few centimetres. The maker uses the source image to fill a proportional portrait rectangle, repeats that rectangle on A4, and lets you download a PNG or PDF. It does not decide whether the background, expression, head position, signature placement, or image date meets the application rules. Confirm those requirements with the current form or official service instructions.',
    ],
  },
  {
    heading: 'PAN photo requirements beyond dimensions',
    paragraphs: [
      'A good PAN photograph should be recent, sharp, front-facing, and easy to recognise. Use soft light from in front of the subject and avoid a bright window behind the face, a hard flash, a strong shadow, or a busy room. Keep the camera around face height and leave enough space around the head and shoulders for a natural crop. Avoid screenshots, social-media copies, and images compressed several times by messaging apps. A small identity photo exposes blur and uneven lighting quickly when it is printed.',
      'Follow the application’s instructions for colour, background, expression, glasses, head coverings, and the way a photograph should be attached or signed. Do not add beauty filters, face-shaping edits, artificial blur, or a dramatic colour grade. An identity photo should represent the person naturally. FitMyPhotoA4 handles the physical arrangement, while the applicant remains responsible for matching the current PAN form and providing a photograph that can be recognised.',
    ],
  },
  {
    heading: 'Create a PAN Card photo sheet on A4',
    paragraphs: [
      'Open the maker and select a clear JPG or PNG. In the Photo type menu, choose PAN Card photo. The dimensions beside the control should show 25 × 35 mm, and the A4 live preview will calculate the available columns, rows, and total copies. The sheet keeps a 10 mm edge margin and leaves the cutting gap you choose between photos. Adjust the gap when you want more room for a ruler or cutter, but remember that a wider gap can reduce the number of copies on the page.',
      'Check the crop carefully. The 25 × 35 mm rectangle is portrait-shaped, so a very wide original may lose some of its sides while a tall original may lose unused space above or below. This proportional crop avoids stretching the face. If the head is too close to an edge, choose a source with more room or take a new photograph. Do not manually drag the preview into a document. The advantage of FitMyPhotoA4 is that the measured layout stays controlled from the selected preset through the final download.',
    ],
  },
  {
    heading: 'When the PAN application asks for a digital upload',
    paragraphs: [
      'Not every PAN process uses printed photographs. An online application or correction portal may ask for a digital file with a maximum size, a pixel range, a file type, or a particular aspect ratio. A physical 25 × 35 mm sheet is intended for a paper form or a process that asks you to carry or attach photographs. It is not automatically the correct file for an upload field. Read the instruction beside the portal control and follow its stated pixel and file-size limits.',
      'If the portal requests a digital photo, do not photograph the printed A4 sheet or upload a screenshot of the preview. Keep the original source file and create a separate digital crop that follows the portal’s requirements. If the paper form gives another physical measurement, use Custom size in FitMyPhotoA4 rather than trying to change printer scale. Separating paper and digital workflows prevents a common mistake: submitting an image that looks correct on screen but does not match the receiving system’s technical rule.',
    ],
  },
  {
    heading: 'Background, crop, and face position',
    paragraphs: [
      'A plain, even background is usually safer than a patterned wall, outdoor scene, or crowded room, but the exact background colour should come from the current PAN instructions. A light wall may still show a corner, texture, curtain, or a dark shadow. Create a little distance between the subject and the background, then use soft light from the front. Check the source at full size before arranging it. A background-removal edit can leave a bright halo around hair and shoulders, so a clean original is often better than an aggressive artificial cutout.',
      'The maker fills the 25 × 35 mm frame without stretching the source. Review the top, bottom, left, and right edges to make sure the face is not clipped and the crop does not leave the subject unusually small. If the form has a head-height diagram, compare the photograph with that guidance. The tool cannot measure administrative face rules or approve a particular expression. Its job is to give you a predictable physical rectangle after you have chosen a suitable image.',
    ],
  },
  {
    heading: 'Print PAN photos at the correct physical size',
    paragraphs: [
      'Download PDF when a print shop will produce the sheet because the PDF preserves the A4 page as one document. Download PNG when an image-based printer workflow is more convenient. In either case, choose A4 paper and Actual size or 100% in the print dialog. Turn off Fit to page, Shrink oversized pages, Scale to printable area, and borderless expansion. A print shop may default to Letter paper or silently reduce the file, so tell the operator that the page is already measured and must not be resized.',
      'Print a test page and measure one rectangle from edge to edge with a ruler. If it is not close to 25 × 35 mm, correct the print setting instead of changing the photo size in the maker. Once the test is correct, cut the remaining copies with clean scissors or a paper trimmer. Let fresh ink dry, keep the photographs flat, and avoid writing or signing across the image unless the PAN form clearly tells you where a signature belongs.',
    ],
  },
  {
    heading: 'How many PAN photos should you print?',
    paragraphs: [
      'The fit count depends on the photo width, height, ten-millimetre outer margin, and cutting gap. At 25 × 35 mm, an A4 page can hold many small portrait photos, but the exact number is shown by the live preview. If you widen the gap, you may get fewer copies while gaining more cutting room. If the application needs only one or two photographs, print a sensible number of clean spares rather than filling every sheet with unnecessary copies. A compact layout is useful, but a practical layout is easier to trim accurately.',
      'Prepare one labelled sheet per person when working on family documents. A small PAN photo can look similar to another person’s identity photo, and an unlabeled stack can lead to an attachment mistake. Name the file with the person and application purpose, keep the original separate, and remove unnecessary copies from a shared computer. If the application asks for a recent photograph or a different image after a correction, create a new sheet instead of reusing an old print without checking.',
    ],
  },
  {
    heading: 'Quality, paper, and HD export',
    paragraphs: [
      'For a small PAN photograph, a sharp source and clean print surface matter more than decorative paper. Matte or satin paper is often easy to inspect, while glossy paper can reflect office lighting and thin office paper may curl or show ink bleed. Follow the form if it specifies a paper type. Avoid repeatedly opening and recompressing the source. FitMyPhotoA4 creates a fresh layout from the browser preview, so keep the generated PDF or PNG as the print master.',
      'HD Quality can create a larger 600 DPI export for a capable printer, but it cannot add detail that a tiny or blurry source never contained. Check the first print in neutral light for a natural skin tone, clear eyes, an even background, and sharp edges. If the source is dark, grainy, or out of focus, retake it. A higher resolution setting should support a good original, not hide the need for one.',
    ],
  },
  {
    heading: 'Privacy when preparing a PAN photograph',
    paragraphs: [
      'A PAN photograph is sensitive personal information. The normal FitMyPhotoA4 workflow reads the selected JPG or PNG in your browser, creates the crop and preview on your device, and prepares a local PNG or PDF download. It does not require an account or an online photo-processing queue. Use Reset when you finish, close the browser tab, and remove downloaded files from shared or public machines. Also check the Downloads folder, temporary files, browser history, and cloud-synced folders when you use a device that other people can access.',
      'Local processing reduces the need to send the face image to a remote editor, but it cannot control your operating system, browser extensions, backups, network, or print-shop systems. Review the Privacy Policy for the difference between the image workflow and ordinary technical resources such as fonts and the PDF library. If you prepare a PAN photograph for someone else, get permission and tell them how the output will be handled. Responsible file handling is part of a safe application workflow.',
    ],
  },
  {
    heading: 'PAN Card photo checklist before submission',
    paragraphs: [
      'Before you print, confirm the current application route, dimensions, colour requirement, background, recency rule, number of copies, and any instruction about attaching or signing the photograph. Select the PAN Card preset only when 25 × 35 mm matches that instruction. Upload the clearest original, inspect the proportional crop, check the fit count, and choose a reasonable cutting gap. If an online portal asks for pixels or a maximum file size, follow that portal instead of submitting an A4 page.',
      'After downloading, select A4 and 100% / Actual size, print a test, and measure one photo. Keep the correct copies flat and labelled with the application bundle. Do not present FitMyPhotoA4 as an official PAN approval service; it is a practical layout tool. For the exact maker steps, open the PAN Card Photo Maker. For general upload, arrange, and download guidance, read How It Works, and for questions about local processing and printing, visit the FAQ.',
    ],
  },
  {
    heading: 'Prepare the application bundle, not just the photo',
    paragraphs: [
      'A PAN photograph is usually handled together with a form, identity proof, signature, payment information, and sometimes a receipt or acknowledgement. Before leaving for a service centre, confirm that the name and application details match across the bundle. Keep the printed photographs in a flat sleeve so they do not bend or collect fingerprints. Do not write across the face, trim away a required edge, or sign across the photograph unless the current form clearly shows that instruction. Some online routes do not need a physical photo at all, so the portal should decide the delivery format.',
      'If you prepare photographs for several people, label each sheet immediately after downloading it and keep separate folders on your private device. A small portrait can look similar across a family, and a correct 25 × 35 mm layout can still be attached to the wrong request. Keep the original image so you can regenerate a sheet if the form changes. A careful bundle check, a test print, and the current application instructions work together; the photo size alone is not the complete PAN requirement.',
    ],
  },
];

const identityPhotoGuideSections = [
  {
    heading: 'Voter ID, OCI, and visa photos are not one universal size',
    paragraphs: [
      'Voter ID, OCI, and visa applications are often grouped together because each may ask for a small identity photograph, but the correct size and delivery format can be different. Many Indian print workflows start with 25 × 35 mm for Voter ID photographs, while OCI applications and foreign visa centres may request another physical rectangle, a square image, a specific pixel size, or a digital upload. The same country can use different instructions for a passport, visa, residence permit, and registration form. Confirm the exact document and application channel before choosing a preset.',
      'FitMyPhotoA4 provides useful starting presets and a Custom size control. Select Voter ID photo only when 25 × 35 mm matches the current instruction. For an OCI or visa form, use the exact width and height supplied by the official checklist, or follow the portal’s digital requirements when it asks for pixels. The tool can make a measured page; it cannot decide which rule applies to your nationality, destination, application type, or appointment date.',
    ],
  },
  {
    heading: 'Voter ID photo size and preparation',
    paragraphs: [
      'A common Voter ID print workflow uses a 25 × 35 mm portrait photograph, but the election office, state process, service centre, or current form may provide another instruction. Verify the latest requirement before printing. When the dimensions match, choose Voter ID photo in the maker, upload a clear JPG or PNG, and inspect the A4 preview. The page uses a ten-millimetre edge margin and calculates the rows and columns from the selected size and cutting gap.',
      'Use a recent front-facing image with soft light, a clean background, and enough space around the head. A wide-angle selfie taken too close can change facial proportions, while a tightly cropped file may lose the top of the head when it fills the portrait rectangle. The tool crops proportionally without stretching the face. If an online voter portal wants a digital file, follow its pixel, file type, and maximum-size instructions rather than uploading a screenshot of the printed page.',
    ],
  },
  {
    heading: 'OCI photo dimensions and document context',
    paragraphs: [
      'OCI applications can involve both a photograph and a signature, and the required image format may depend on whether you are completing an online application, submitting a printed form, or attending a service centre. Do not assume that the common 25 × 35 mm Voter ID preset is suitable for an OCI photograph. Read the current OCI checklist for physical dimensions, digital pixels, file size, background, recency, and any rule about the signature image. A similar-looking portrait ratio is not enough.',
      'If the OCI instruction gives a physical width and height, enter those values in Custom size and create a separate sheet for that application. If it asks for a digital upload, prepare a digital asset according to the portal rather than using the A4 print sheet. Keep the source photograph and generated print layout separate so you can make both versions without repeatedly compressing the original. FitMyPhotoA4 helps with the measured print stage; the official OCI portal controls the accepted digital specification.',
    ],
  },
  {
    heading: 'Visa photo size depends on destination and route',
    paragraphs: [
      'Visa photographs are particularly sensitive to destination-specific rules. A US visa commonly uses a square 51 × 51 mm format, while other countries or visa centres may request a 35 × 45 mm portrait photo, a different paper size, a digital image, or a biometric capture from an approved centre. Even where two applications use the same physical dimensions, face height, background, expression, glasses, clothing, and image date can differ. Check the embassy, consulate, visa centre, or official portal that will actually receive the application.',
      'FitMyPhotoA4 includes starting presets for US visa and several passport workflows, but a preset should never replace the destination’s current checklist. For a square US visa photograph, confirm the official requirements and select the corresponding preset only when the physical print is requested. For an unusual visa size, use Custom size. For an online upload, follow the stated pixel and file-size limits. If an approved biometric capture is required, use that channel instead of relying only on a self-prepared print.',
    ],
  },
  {
    heading: 'Background, lighting, and biometric clarity',
    paragraphs: [
      'Most identity and visa systems value a natural, recognisable image over an artistic edit. Use a plain background with even light, avoid a hard shadow behind the head, and keep the camera at face height. Stand far enough away to avoid a wide-angle distortion. The subject should look towards the camera with a natural expression unless the destination’s guide says otherwise. Do not use face-slimming filters, skin-smoothing effects, artificial blur, or an edit that changes the person’s identity features.',
      'A background that appears white on a phone can print grey, blue, or uneven if the room lighting is poor. Take a little distance from the wall, use soft front light, and check the full image before cropping. Keep hair, head coverings, glasses, and shoulders consistent with the official instruction. FitMyPhotoA4 can arrange the selected pixels accurately, but it cannot evaluate biometric acceptance or remove an authority’s requirement for a professional photographer or capture centre.',
    ],
  },
  {
    heading: 'Arrange Voter ID, OCI, or visa copies on A4',
    paragraphs: [
      'Once you have confirmed the physical size, use the maker’s Photo type menu or Custom size control. Upload one clear image and watch the A4 live preview. The fit count updates as the rectangle and cutting gap change. A compact gap may provide more copies, while a wider gap is easier to cut. Keep the ten-millimetre outer margin in place; it helps the page stay inside the printable area of common home and shop printers. Review the crop at the face, not only the number of copies.',
      'Use Download PDF when sending the page to a print shop, or PNG when an image-based workflow is required. Do not paste the preview into a document and resize it manually. If you are preparing several people or several document types, use separate labelled files. A Voter ID sheet, an OCI print, and a visa sheet can look similar at a glance but may have different sizes and different rules. Separation reduces the chance of taking the wrong photograph to an appointment.',
    ],
  },
  {
    heading: 'Digital upload versus printed photograph',
    paragraphs: [
      'A printed identity photo and a digital portal upload are two different deliverables. A print is measured in millimetres and must be printed at the correct physical scale. A digital upload is usually described in pixels, file size, file type, aspect ratio, and background rules. A screenshot of an A4 page is not a reliable digital portrait because it contains the page, margins, and other copies. If the portal wants only a face photograph, upload the original or a separate crop that follows its exact requirements.',
      'Read the upload field carefully and keep a clean original file before you start. If a portal rejects the file, use its error message and help instructions rather than guessing from another document type. For a paper submission, choose A4 and Actual size, then measure one printed photo with a ruler. The same source can sometimes support both workflows, but the preparation step should be separate so a paper layout does not accidentally become the digital upload.',
    ],
  },
  {
    heading: 'Print at 100 percent and check one copy',
    paragraphs: [
      'When printing the A4 sheet, choose the paper size requested by the file and authority, normally A4 portrait for the FitMyPhotoA4 workflow. Select Actual size or 100%, and turn off Fit to page, Shrink, Scale to printable area, and borderless expansion unless the printer instructions say otherwise. A print shop may resize a page automatically to its machine’s default paper. Tell the operator that the sheet contains measured rectangles and should not be enlarged or reduced.',
      'Print one sample and measure the first rectangle from outside edge to outside edge. If the measurement is wrong, correct the printer setting before printing a batch. Let ink dry, cut cleanly, and store the copies flat in a sleeve. Keep a few spares, but do not carry an unlabeled stack of different document photos. This physical check is the easiest way to catch an invisible scaling error before an appointment, visa submission, OCI packet, or election-office visit.',
    ],
  },
  {
    heading: 'Privacy and responsible document preparation',
    paragraphs: [
      'Voter ID, OCI, and visa photographs contain personal information, so use a trusted device and share the minimum file needed for the task. FitMyPhotoA4 is designed for local browser processing during the normal selection, crop, preview, and export workflow. It does not require an account for arranging a sheet. Use Reset when you finish, close the page, delete downloads from shared machines, and check cloud-sync folders. Do not upload an identity photograph to an unrelated online editor just to change a minor layout detail.',
      'Local processing does not control browser history, extensions, backups, printers, networks, or third-party resources. Read the Privacy Policy for the full distinction between the selected image and normal page requests. Also read the Terms of Use for the limits of presets and guides. The official authority decides what is acceptable. Your role is to verify the current rule, choose a suitable source, create the correct physical or digital deliverable, and check it before the deadline.',
    ],
  },
  {
    heading: 'A document-by-document final checklist',
    paragraphs: [
      'For Voter ID, confirm the election-office instruction and use the 25 × 35 mm preset only when it matches. For OCI, check the current online and printed-photo requirements separately, including the signature or digital file rules. For a visa, confirm the destination, application route, physical size, background, face position, and whether an approved biometric capture is required. Never let a familiar preset decide which application rule applies. If the official instruction differs, use Custom size or the official upload process.',
      'For a printed sheet, download the PDF or PNG, print A4 at 100%, and measure one copy. For a digital upload, use a file prepared to the portal’s pixel and size limits. Keep files labelled, private, and separate. The Voter ID Photo Maker, Passport Photo Size Maker, PAN Card Photo Maker, and How It Works page explain the practical tools, while the official office, embassy, portal, or visa centre remains the final authority.',
    ],
  },
  {
    heading: 'Plan separate deliverables for a busy application',
    paragraphs: [
      'People often prepare Voter ID, OCI, and visa documents at the same time, which makes file mix-ups more likely. Create a separate folder or labelled envelope for each document and write the confirmed dimensions on the working note, not on the face of the photograph. Keep a print sheet separate from a digital upload. A Voter ID page may start at 25 × 35 mm, an OCI portal may want pixels and a signature file, and a visa centre may require a square print or approved biometric capture. Similar-looking images do not mean identical requirements.',
      'Give yourself time for one test print and one replacement source image. If the first crop clips the head or the printed background looks uneven, correct the source before the appointment. If a portal rejects a file, follow its technical error message instead of photographing the paper sheet. FitMyPhotoA4 helps keep the physical arrangement consistent, while the authority or portal decides which deliverable it accepts. This separation makes a complicated document day calmer and reduces the cost of a last-minute reprint.',
    ],
  },
];

const aboutSections = [
  {
    heading: 'Why FitMyPhotoA4 was made',
    paragraphs: [
      'FitMyPhotoA4 was made for the small but frustrating moment between taking a good photograph and needing to print it for a form. A person may have a clear image on a phone but still be unsure how to place several copies on A4, which dimensions to enter, or why a print shop produced a different size. Common document tools make this harder by asking users to drag images, copy and paste them repeatedly, and trust a page preview that is not a physical ruler. FitMyPhotoA4 keeps that last step focused: choose the size, see the measured sheet, and download a file you can print.',
      'The project is intentionally practical rather than decorative. It supports familiar passport and identity-photo workflows, but it also leaves room for a custom measurement when an authority gives a less common requirement. The aim is not to replace a photographer, a government office, or an official application portal. It is to remove unnecessary layout guesswork so users can spend their attention on the requirements that actually matter: a suitable source image, a compliant background, a current form, and a correctly scaled print.',
    ],
  },
  {
    heading: 'A tool built around measured paper',
    paragraphs: [
      'A4 is a physical sheet measuring 210 × 297 millimetres. FitMyPhotoA4 uses that page as the foundation for its calculations, reserves a ten-millimetre outer margin, and repeats the selected photo rectangle with a visible cutting gap. The number shown below the preview is calculated from the width, height, and spacing rather than guessed from the browser window. This is helpful when preparing passport, PAN Card, Voter ID, visa, school, employment, or other small document photos for a home printer or a local print counter.',
      'The design also makes a distinction between the image and the page. The source image can be large and detailed, while the output is an arrangement of smaller physical rectangles. That distinction protects the workflow from accidental stretching and from screenshots that look right on a display but print at the wrong size. Users can inspect the crop, change the cutting gap, choose PNG or PDF, and verify one test copy with a ruler before committing to a batch.',
    ],
  },
  {
    heading: 'Local-first by design',
    paragraphs: [
      'Identity photographs are personal information. For the standard maker workflow, FitMyPhotoA4 is designed to read a selected JPG or PNG in the browser, draw the preview on the device, and create the download locally. The normal flow does not need an account or a remote photo-processing queue. This local-first approach was chosen because a simple layout task should not require sending a face image to an unrelated online editor. It also makes the tool convenient when a user needs a quick sheet at home or at a print counter.',
      'Local processing is not a promise that every part of a device or network is private. Browsers keep history and temporary data, operating systems can sync downloads, extensions can have permissions, and print shops may keep temporary copies. Users should work on a trusted device, share only the necessary file, use Reset when finished, and remove downloads from shared machines. The Privacy Policy explains these boundaries in plain language so the local design is useful without creating a false sense of security.',
    ],
  },
  {
    heading: 'What the maker can and cannot do',
    paragraphs: [
      'The maker can arrange pixels in a measured rectangle, repeat that rectangle on an A4 page, calculate a fit count, apply an optional grayscale treatment, and prepare PNG or PDF output. It can help with the mechanical part of a print workflow and make the result easier to inspect. It cannot take a photograph for you, prove that the person is who they claim to be, determine whether a background meets an embassy rule, or submit a form on your behalf.',
      'Requirements can differ across countries, authorities, document types, application channels, and dates. A 35 × 45 mm passport preset or a 25 × 35 mm PAN Card or Voter ID preset is a starting point, not an official approval. If an authority gives a different measurement, use Custom size or follow its digital-upload instructions. The official form, portal, embassy, election office, or service centre always comes before a general guide on this website.',
    ],
  },
  {
    heading: 'Why the workflow is simple',
    paragraphs: [
      'The main flow is built around three verbs: Upload, Arrange, Download. Upload means selecting one clear original and confirming that it loaded. Arrange means choosing the right physical size, inspecting the proportional crop, setting a sensible cutting gap, and reading the A4 fit count. Download means selecting PDF or PNG and taking responsibility for the final print settings. Each stage has a visible checkpoint, which helps a new user understand what has happened before moving on.',
      'This simplicity also makes the tool easier to explain to a family member, a colleague, or a print-shop operator. You can point to the selected dimensions, show the live preview, and say that the page must be printed at 100%. You do not need to create a complicated design file or remember a hidden scaling setting. The How It Works page expands the workflow with visual panels, while the document pages explain the common requirements for specific use cases.',
    ],
  },
  {
    heading: 'Designed for real print counters',
    paragraphs: [
      'Many people do not need a full photo-editing suite. They need a file that opens at a local print shop, fits on A4, and can be cut into several small copies. PDF is useful in that setting because it keeps the page together. PNG remains available for image-based workflows and inspection. The edge margin and spacing control acknowledge that a real printer has non-printable areas and that a real person may be cutting the sheet with scissors, a ruler, or a small paper trimmer.',
      'A low-cost sheet can still be a poor result if the printer silently shrinks it or if the source image is blurry. That is why the site repeatedly recommends a one-copy test and a ruler check. Trust comes from showing the limitation rather than hiding it. FitMyPhotoA4 makes the layout measurable, then tells the user which parts—source quality, authority rules, printer settings, paper, and cutting—still need human attention.',
    ],
  },
  {
    heading: 'Building for clarity and privacy',
    paragraphs: [
      'The interface uses plain labels such as Photo type, Cutting space, A4 live preview, PNG, and Download PDF. The page avoids asking for a login before a user can understand the workflow. Guidance appears close to the control it explains, and the privacy line reminds users that the normal image process stays in the browser. The goal is not to overwhelm someone who may be preparing a photograph minutes before an appointment.',
      'Clear design does not remove the need for care. Users should confirm current rules, protect files, and inspect the result. The site’s legal pages explain that presets are not official endorsements and that third-party resources, browsers, devices, and printers have their own behaviour. This honesty is part of the product: a trustworthy tool says where its responsibility ends instead of promising acceptance it cannot control.',
    ],
  },
  {
    heading: 'Who can use it',
    paragraphs: [
      'FitMyPhotoA4 can be useful for an individual preparing a passport renewal, a parent arranging school or identity photos, a traveller checking a visa print, a small office preparing employee records, or a print counter helping a customer create a clean A4 sheet. It is also useful when a person wants to compare a common preset with a less familiar custom measurement. The browser-based workflow means no special editing installation is needed for the basic task.',
      'Anyone preparing a photograph for another person should have permission to handle it and should explain where the output will be stored. Employers, family members, agents, and print shops may have additional responsibilities depending on their role and local law. The tool is intentionally neutral: it provides a layout capability, while each user must decide whether their use is lawful, respectful, and appropriate for the receiving authority.',
    ],
  },
  {
    heading: 'A small tool with a useful promise',
    paragraphs: [
      'The promise of FitMyPhotoA4 is deliberately small and testable: help a user create a consistent A4 photo sheet from a clear image and a chosen measurement. The user can see the dimensions, preview the arrangement, download the result, and measure a test print. That is enough to remove a common source of confusion without pretending to solve identity verification, government processing, professional photography, or every rule in every country.',
      'The project will be most useful when it stays honest about that promise. Official instructions can change, printers can resize, and a photograph can be unsuitable even when its rectangle is exact. Use the current authority checklist, protect the source image, and use the maker for the measured layout. If you have feedback about clarity, accessibility, or a workflow that is difficult to understand, visit Contact Us and share only the information needed to describe the issue.',
    ],
  },
  {
    heading: 'Start with the story, then use the tool',
    paragraphs: [
      'FitMyPhotoA4 began with a practical question: why should preparing a few small document photographs require a complicated editor or a paid per-photo counter service? A measured A4 sheet can reduce waste, provide spares, and make the physical size easier to verify. The product is an answer to that everyday problem, shaped around a local browser workflow and clear print instructions rather than a large account-based system.',
      'When you are ready, open the maker, choose one clear original, check the current official requirement, and move through Upload, Arrange, and Download. Read the dedicated Passport, PAN Card, Voter ID, OCI, and Visa guidance when your document has special rules. If you need help, the FAQ and Contact Us pages are available from the navigation. The tool is here to make the measurable part calmer, one sheet at a time.',
    ],
  },
  {
    heading: 'A product shaped by ordinary users',
    paragraphs: [
      'The people who need a document photo sheet are not always photographers or designers. They may be preparing a renewal after work, helping a parent complete a form, visiting a print counter with a phone, or making spare copies before a school or travel appointment. They need labels they can understand and a result they can verify. FitMyPhotoA4 is shaped around that context: the interface shows the selected dimensions, the preview shows the page, and the print guidance explains the one setting most likely to cause trouble.',
      'That practical focus also means the product avoids claims it cannot support. A measured rectangle does not guarantee a government decision, and local processing does not make a shared computer private. The About, Privacy, Terms, Blog, Tutorial, and Contact pages are part of the same trust model. They explain the useful capability, the human checks that remain necessary, and the safe way to ask for help without sending an identity photograph.',
    ],
  },
  {
    heading: 'Keep the tool honest and useful',
    paragraphs: [
      'FitMyPhotoA4 will be most useful when a visitor can understand it in one visit: read a document-specific answer, confirm the official requirement, upload one suitable original, arrange the measured page, download the right format, and check one print. The site does not need to turn every user into an editor. It needs to make the small set of decisions visible and give enough context that an applicant does not confuse a common preset with a current official rule.',
      'If a guide is unclear, a link is broken, or a mobile step is difficult, Contact Us is the right place to share feedback. Please send a description rather than a government document or full face image. Every improvement should preserve the same principles: measured paper, local-first handling, honest limitations, and useful explanations for real print workflows. That is the story behind the tool and the standard the product is designed to keep.',
    ],
  },
];

const contactSections = [
  {
    heading: 'Contact FitMyPhotoA4',
    paragraphs: [
      'Have a question about the photo maker, a confusing label, a print workflow, or a page that is difficult to use? Contact the FitMyPhotoA4 team using the form on this page. The form opens your email application with the recipient, subject, and message filled in so you can review everything before sending. You can also use the public email address shown below if you prefer to write directly. Please describe the issue clearly and include only the information needed to help.',
      'Do not send identity photographs, passport numbers, PAN numbers, voter numbers, OCI documents, payment details, passwords, or other sensitive personal information in an unsolicited message. A screenshot of a control or an error message is usually more useful than the original identity image. If you are contacting us for another person, remove personal details unless they are necessary and you have permission to share them.',
    ],
  },
  {
    heading: 'What kind of help can we provide?',
    paragraphs: [
      'We can help explain the basic product workflow: how to choose a JPG or PNG, how to select a preset, where the A4 fit count appears, how the cutting gap works, and why a PDF or PNG should be printed at 100%. We can also listen to reports about broken links, unclear wording, layout problems, accessibility issues, or a browser feature that does not behave as expected. Please include your device type and browser only when that detail helps reproduce the problem.',
      'We cannot approve a passport, PAN Card, Voter ID, OCI, or visa photograph, and we cannot decide which rule applies to your application. For official dimensions, background, expression, paper, head position, signature, digital pixels, or appointment requirements, contact the receiving authority or use its latest published instructions. The document guides on this site are practical starting points, not a replacement for an official checklist.',
    ],
  },
  {
    heading: 'Before you send a message',
    paragraphs: [
      'Try the How It Works page first if you are new to the tool. It explains Upload, Arrange, and Download with visual screen panels. The FAQ answers common questions about local processing, printing, custom sizes, file formats, and fit counts. If the issue concerns a particular document, read the Passport Photo Size Maker, PAN Card Photo Maker, Voter ID Photo Maker, or the combined OCI and Visa guide before writing. You may find the answer without sharing any personal information.',
      'If you still need help, write a short subject that says what happened, such as “PDF download question” or “Mobile layout feedback”. Explain the steps you took, what you expected, and what appeared instead. Do not attach a government document or a full identity photograph unless a clearly identified support process later requests it. Redacting names, numbers, and faces makes a message safer while preserving the technical context.',
    ],
  },
  {
    heading: 'Contact details',
    paragraphs: [
      'The public contact email for FitMyPhotoA4 is paramkaur7821@gmail.com. Use it for product questions, feedback, or a request to clarify the website content. The email form on this page uses the same address and opens a message in your own mail application. Review the recipient and message before sending. If no mail application is configured on your device, copy the address and send from your preferred secure email provider.',
      'Email response times can vary, especially when a message needs investigation or a browser-specific reproduction. Sending a message does not guarantee that a particular application, appointment, or photograph will be accepted. If your deadline is close, follow the official authority’s support channel as well. Keep your own copy of the form, receipt, image, and appointment information rather than relying on a website conversation as the only record.',
    ],
  },
  {
    heading: 'Feedback helps the tool stay practical',
    paragraphs: [
      'The best feedback is specific and calm. Tell us which page you were using, whether you were on a phone or computer, which browser opened the page, and whether the issue happened during upload, arrangement, preview, download, or printing. If a label felt confusing, quote the label. If the print was the wrong physical size, include the selected size and whether the print dialogue was set to 100%. Never include more personal information than necessary to explain the problem.',
      'Feedback about real print counters is especially useful because a file can behave differently in a PDF viewer, a home printer, and a shop’s software. Tell us whether the page was printed on A4, whether automatic scaling was enabled, and what the ruler showed. This does not replace the official instruction, but it helps us make the guidance clearer for the next person preparing a sheet under time pressure.',
    ],
  },
  {
    heading: 'Privacy when contacting us',
    paragraphs: [
      'The contact form does not upload a photograph to the maker. It prepares a mailto message in your email application, and you choose whether to send it. Your email provider will then handle the message according to its own systems and privacy policy. Send only the minimum information needed for the question. A technical description, browser name, and redacted screenshot are safer than a full passport, PAN Card, Voter ID, OCI, or visa packet.',
      'If you receive a reply, check that it comes from the expected address before opening an attachment or following a link. FitMyPhotoA4 will not need your password, one-time code, payment card, or secret credentials to answer a normal product question. Review the Privacy Policy for the browser-based photo workflow and the Terms of Use for service limitations. Contacting the team does not change the authority’s rules or create an official application channel.',
    ],
  },
  {
    heading: 'Reporting a broken page',
    paragraphs: [
      'If a page does not load, first refresh once and check that your browser is current. If the issue continues, mention the exact URL in your message. Include whether the failure happens on the homepage, a dedicated document page, the tutorial, the blog, or the contact form. A short description of the visible error and the time it occurred can help identify whether the problem is local to your browser or affects the site more broadly.',
      'Do not keep retrying a download if the file is incomplete or the PDF library has not loaded. Use the page’s visible error message, wait briefly, and try again. If you see an unexpected upload or payment prompt, stop and report the page without entering information. Security concerns should be described without attaching the identity image involved. The team can investigate the website behaviour without receiving the sensitive source file.',
    ],
  },
  {
    heading: 'Suggestions for future improvements',
    paragraphs: [
      'You can also use the contact page to suggest a new document preset, clearer wording, better mobile spacing, a keyboard-accessibility improvement, or an additional explanation in the tutorial. A useful suggestion includes the task you were trying to complete, the country or document context only when relevant, and the part of the workflow that created uncertainty. You do not need to share your photograph or any identity number to suggest a product improvement.',
      'Presets and guides must be handled carefully because a convenient addition can be mistaken for official approval. When suggesting a document type, include a link or name for the official source if you have one, but do not assume a single source covers every application route. The team can decide how to present a starting point while keeping the disclaimer that current authority instructions come first.',
    ],
  },
  {
    heading: 'A respectful support boundary',
    paragraphs: [
      'FitMyPhotoA4 is a small tool, and support is focused on the website and its general workflow. We cannot provide immigration advice, legal advice, identity verification, document correction, visa decisions, or a guarantee that a clerk will accept a photograph. We also cannot recover a file that was deleted from your device or change the rules of a print shop. For those matters, use the official authority, a qualified professional, or the service named on your application.',
      'Within that boundary, a clear message can still make the product better. We can clarify what the controls do, correct broken navigation, improve a tutorial explanation, or investigate a reproducible technical issue. The goal is to keep the site honest, local-first, and useful to people who need a measured sheet quickly. Thank you for helping us understand where a new user might hesitate.',
    ],
  },
  {
    heading: 'Send your message',
    paragraphs: [
      'Use the contact form above to enter your name, email address, subject, and message. The form checks that the required fields are present, then opens a draft in your mail application addressed to paramkaur7821@gmail.com. You can edit the draft before sending and decide whether to include any optional technical details. If your device does not have a mail handler, use the plain email link and write from a provider you trust.',
      'For the fastest useful response, mention the page and step involved, explain the expected result, and avoid sending sensitive documents. For official application questions, contact the authority at the same time because its response controls your deadline. We appreciate messages that help make Upload, Arrange, and Download easier to understand for the next person.',
    ],
  },
  {
    heading: 'What happens after you contact us',
    paragraphs: [
      'Your message is opened as a draft in your own email application rather than being silently submitted by the photo maker. Review the recipient, subject, and body before you send it. The team may use the details you provide to understand a product question, reproduce a technical issue, or improve the wording on a page. A reply may ask for a browser name, device type, URL, or redacted screenshot. It should not require your password, one-time code, payment card, or full identity document.',
      'If you need an official answer about an application deadline, document size, visa decision, OCI packet, PAN correction, or election process, contact the relevant authority as well. FitMyPhotoA4 support can explain the website but cannot override an authority’s checklist. Keeping that boundary clear protects your privacy and prevents a product question from being mistaken for an official application request.',
    ],
  },
  {
    heading: 'A simple way to write useful feedback',
    paragraphs: [
      'A useful message can follow four lines: the page you used, the step you took, what you expected, and what happened instead. For example, say that you were on the How It Works page on a phone, tapped the contact link, and expected a draft to open but saw no mail application. For a print issue, include the selected dimensions, paper size, print scale, and ruler measurement. This context is more valuable than an unredacted identity photograph.',
      'You can also tell us when the site feels clear and when a label creates hesitation. Suggestions about keyboard focus, contrast, mobile spacing, document presets, or tutorial wording help the product stay welcoming to first-time users. Send only what is needed, remove names and document numbers, and keep your own copy of any important form or appointment information. We are happy to hear from people who want the measured photo workflow to be easier for everyone.',
    ],
  },
  {
    heading: 'Contact us with confidence',
    paragraphs: [
      'You do not need to know technical language to contact the team. Explain what you were trying to do in your own words, mention the page you opened, and say whether you were using a phone, tablet, or computer. If a button did not respond, say what you expected. If a printed photo was the wrong size, share the selected dimensions and the print scale shown in the dialogue. These details help us understand the experience without requiring access to your device or identity file.',
      'The contact page is also a place to tell us when the product helped or when the explanation made a difficult document task feel calmer. We are building for people who may be using the tool under a deadline, at a print counter, or while helping a family member. A respectful message with a redacted screenshot is enough. Keep the original photograph, document number, and private application details with you, and use the official authority for any decision about acceptance.',
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    path: '/blog/passport-size-photo-dimensions-india',
    category: 'Passport guide',
    readTime: '8 min read',
    title: 'Passport Size Photo Dimensions in India: What Size Do You Need?',
    description: 'A practical guide to Indian passport photo dimensions, 35 × 45 mm printing, backgrounds, crops, A4 sheets, and actual-size print settings.',
  },
  {
    path: '/blog/pan-card-photo-size-requirements',
    category: 'PAN Card guide',
    readTime: '8 min read',
    title: 'PAN Card Photo Size and Requirements: A Practical Print Guide',
    description: 'Understand common PAN Card photo size requirements, 25 × 35 mm A4 sheets, source quality, digital uploads, and print checks.',
  },
  {
    path: '/blog/voter-id-oci-visa-photo-size-guide',
    category: 'Identity documents',
    readTime: '9 min read',
    title: 'Voter ID, OCI and Visa Photo Size Guide',
    description: 'Compare Voter ID, OCI, and visa photo workflows, including physical sizes, digital uploads, backgrounds, crops, and A4 printing.',
  },
];

export const BLOG_INDEX_PAGE: SEOPage = {
  path: '/blog',
  navLabel: 'Blog',
  title: 'Photo Size Guides | Passport, PAN, Voter ID and Visa',
  description: 'Read practical FitMyPhotoA4 guides for passport photo dimensions in India, PAN Card requirements, Voter ID, OCI, visa photos, and A4 printing.',
  eyebrow: 'FitMyPhotoA4 journal',
  intro: 'Clear, practical articles for the moment you need to know a document photo size, prepare the right source image, and print one measured A4 sheet.',
  sections: [
    {
      heading: 'Guides for real document-photo questions',
      paragraphs: [
        'The FitMyPhotoA4 blog is written for long-tail searches that usually happen just before a form, appointment, or print-shop visit. You may be asking whether an Indian passport photograph is 35 × 45 mm, whether a PAN Card photo uses 25 × 35 mm, or whether a Voter ID, OCI, or visa application wants a printed photo or a digital upload. Each guide explains the commonly used starting point, the limits of that shortcut, and the practical steps for preparing a clean file.',
        'The articles are educational and are not official approval notices. Authorities can change sizes, backgrounds, face-position rules, paper requirements, and digital file limits. Use the latest official instructions for your exact application first. Then use the relevant article and the FitMyPhotoA4 maker for the mechanical work of arranging a measured sheet. If the official requirement differs from a preset, Custom size is the safer choice.',
      ],
    },
    {
      heading: 'Start with the document, not the preset',
      paragraphs: [
        'A photo preset is useful only after you know which document you are preparing. Passport, visa, residence permit, OCI, PAN Card, and Voter ID photographs can look similar while using different dimensions or delivery formats. The same destination may request a printed photo for one form and a pixel-limited upload for another. Before opening the file picker, read the line beside the photograph box and note the physical size, digital size, background, recency, and number of copies.',
        'This document-first habit prevents a common error: printing a beautifully measured sheet for the wrong application. The blog articles explain how to separate physical millimetres from digital pixels, how to choose a source with enough detail, and how to keep identity photographs private. They also repeat the one test print rule because a printer can resize a correct PDF after download. A ruler and the current checklist are more reliable than an old image or a guessed setting.',
      ],
    },
    {
      heading: 'What every article covers',
      paragraphs: [
        'Each guide begins with the size question, then moves to the requirements around the image. You will find advice about sharp originals, lighting, backgrounds, proportional crops, face position, glasses and head coverings, paper, and the difference between a physical print and a digital upload. The guides explain how to use the corresponding FitMyPhotoA4 preset or Custom size, how to choose spacing, and how to download PNG or PDF.',
        'The final sections focus on what happens outside the browser. Printing at 100% or Actual size is essential, and one sample should be measured before a batch is cut. Files should be labelled, stored privately, and removed from shared machines when the task is complete. This makes the articles useful for both search visitors who need an answer and returning users who want a repeatable workflow.',
      ],
    },
    {
      heading: 'Passport dimensions in India',
      paragraphs: [
        'The Passport Size Photo Dimensions in India guide explains why 35 × 45 mm is a common starting point for many Indian passport and visa workflows, while also explaining why it is not universal. It covers the physical rectangle, source quality, light backgrounds, face position, A4 arrangement, and the print dialogue settings that protect the final size. It also explains when a square, different portrait ratio, or digital upload means you should stop using the preset.',
        'The guide is especially useful when a user has a good phone photo but does not know how to produce several small copies. It connects the dimension question to a clear Upload, Arrange, Download flow. Read the official destination’s checklist first, then open the Passport Photo Size Maker to turn the confirmed measurement into a printable sheet.',
      ],
    },
    {
      heading: 'PAN Card photo requirements',
      paragraphs: [
        'The PAN Card article focuses on the commonly used 25 × 35 mm starting size and the requirements that are easy to miss: a recent recognisable colour image, a clean crop, the correct background, and any instruction about attaching or signing the photograph. It distinguishes paper applications from online portals that ask for pixels or a maximum file size. That distinction matters because an A4 sheet should not be uploaded as a digital face photograph.',
        'You will also find a complete print check, including PDF versus PNG, A4 paper, 100% scale, a ruler measurement, and safe file handling. When the form confirms 25 × 35 mm, the PAN Card Photo Maker can arrange multiple copies quickly. When the form differs, use Custom size and treat the current application as the source of truth.',
      ],
    },
    {
      heading: 'Voter ID, OCI, and visa photo sizes',
      paragraphs: [
        'The combined Voter ID, OCI and Visa guide is designed for searches where several identity-photo options are being compared. It explains that many Voter ID workflows start at 25 × 35 mm, while OCI and visa applications may use different physical dimensions, digital pixels, or biometric capture channels. It covers the document context, background, lighting, crop, face position, digital upload, and printed A4 workflow without pretending that one preset works everywhere.',
        'This guide is valuable when a person is preparing several documents at once. It recommends separate labelled files and separate sheets so a Voter ID image is not mixed with an OCI or visa image. It also explains why the destination authority, embassy, visa centre, election office, or portal must decide the final requirement. Use the article to understand the choices, then use Custom size or the official digital process as appropriate.',
      ],
    },
    {
      heading: 'Local processing and trust',
      paragraphs: [
        'Every article explains the local-first design because identity photographs deserve careful handling. In the standard workflow, the browser reads the selected JPG or PNG, creates the preview, and prepares the download on the device. No account is required for the normal layout task. This reduces the need to send a face image to an unrelated editor, while the Privacy Policy explains that browser history, backups, extensions, print shops, and external resources still have their own behaviour.',
        'Trust also comes from naming limitations. FitMyPhotoA4 does not approve a photograph, submit an application, guarantee an authority’s decision, or control a printer after download. The Terms of Use and About Us pages explain why the product is intentionally focused on measured layout. Clear boundaries help a user understand what can be checked in the tool and what must be checked with the official authority.',
      ],
    },
    {
      heading: 'Use the blog with the tutorial',
      paragraphs: [
        'The How It Works page turns the common workflow into three visible stages: Upload a clear original, Arrange the correct size and spacing, and Download a PNG or PDF for actual-size printing. Its screenshot-style visual guide mirrors the labels inside the maker so a new user can recognise each panel. A FAQ at the end answers questions about local processing, presets, crops, formats, and ruler checks.',
        'The blog adds the document context that a generic tutorial cannot provide. Read the relevant article to confirm what to verify, then open the tutorial for the exact interface sequence. This division keeps the workflow calm: the article handles the “which rule?” question, while the maker handles the “how do I lay it out?” question. If you need to ask something, Contact Us is available from the navigation.',
      ],
    },
    {
      heading: 'A better way to search and prepare',
      paragraphs: [
        'Long-tail searches often contain a real task: passport photo dimensions India, PAN Card photo size and requirements, Voter ID photo size, OCI photo requirements, or visa photo size for a particular destination. A useful answer should not stop at one number. It should explain the physical versus digital distinction, the source-image quality, the crop, the background, and the print scale. That is the approach used across this journal.',
        'Keep the official source open while you prepare the sheet. Confirm the size, select the matching preset or Custom size, inspect the preview, download, print at 100%, and measure one copy. If the rule changes, the official source wins and the sheet should be regenerated. The blog is here to make that process easier to understand, not to replace the authority that receives your document.',
      ],
    },
    {
      heading: 'Read, verify, then make the sheet',
      paragraphs: [
        'Choose an article below based on the document you are preparing. Note the size and requirements, then verify them against the current official form or portal. If the measurement matches, open the corresponding FitMyPhotoA4 landing page or the main maker. If it does not match, use Custom size or follow the digital upload instructions. Keep the original photograph private and avoid uploading it to an unrelated editor.',
        'A successful result is not just a page full of copies. It is a suitable source image in the correct rectangle, printed on the correct paper, at the correct scale, with enough time to make a replacement if the first test is wrong. These guides, the tutorial, the FAQ, and the trust pages are designed to support that complete workflow.',
      ],
    },
    {
      heading: 'Find the answer that matches your task',
      paragraphs: [
        'Use the Passport article when your question includes Indian passport photo dimensions, 35 × 45 mm, visa preparation, or the difference between a physical print and a digital file. Use the PAN Card article when you need the commonly used 25 × 35 mm starting point, photograph requirements, attachment guidance, or a paper-versus-portal explanation. Use the Voter ID, OCI and Visa article when several identity documents are being prepared and you need to keep their rules and deliverables separate.',
        'Each article is written to answer a search question without reducing the answer to one unsupported number. You will see the common starting point, the checks that can change acceptance, and the exact workflow for turning a confirmed measurement into an A4 sheet. If your document is not listed, the main maker’s Custom size control can still arrange a physical rectangle, but the receiving authority should provide the measurement and digital instructions.',
      ],
    },
    {
      heading: 'A reference library, not a shortcut around official rules',
      paragraphs: [
        'The blog exists because people search for help in ordinary language: “passport photo size in India”, “PAN Card photo requirements”, “Voter ID photo size”, “OCI photo dimensions”, or “visa photo size”. A useful page must answer the immediate question and also explain what the number does not tell you. Background, head position, image date, paper, signature, face height, pixel limits, and biometric capture can all matter. That context is why the articles are longer than a single size table.',
        'Keep the official form or portal open while you read. Mark the instruction that applies to your application, then use the matching article and maker page as a preparation guide. If the authority changes a requirement, follow the new requirement and regenerate the sheet. The navigation keeps the library connected to How It Works, About Us, Contact Us, Privacy Policy, Terms of Use, and the FAQ so a new visitor can understand both the tool and its boundaries.',
      ],
    },
  ],
};

export const BLOG_ARTICLE_PAGES: Record<string, SEOPage> = {
  '/blog/passport-size-photo-dimensions-india': {
    path: '/blog/passport-size-photo-dimensions-india',
    navLabel: 'Passport dimensions',
    title: 'Passport Size Photo Dimensions in India | Complete Guide',
    description: 'Learn common Indian passport photo dimensions, 35 × 45 mm printing, background rules, A4 layout, crop checks, and actual-size print settings.',
    eyebrow: 'Passport photo article',
    intro: 'A practical answer to the Indian passport photo size question, with the requirements, print checks, and A4 workflow that matter after you know the number.',
    sections: passportIndiaSections,
  },
  '/blog/pan-card-photo-size-requirements': {
    path: '/blog/pan-card-photo-size-requirements',
    navLabel: 'PAN requirements',
    title: 'PAN Card Photo Size and Requirements | Practical Guide',
    description: 'Understand common PAN Card photo size requirements, 25 × 35 mm A4 printing, crop and background checks, digital uploads, and privacy.',
    eyebrow: 'PAN Card article',
    intro: 'Understand the commonly used PAN Card photo size, what the form may require beyond dimensions, and how to create a clean A4 sheet without guesswork.',
    sections: panRequirementsSections,
  },
  '/blog/voter-id-oci-visa-photo-size-guide': {
    path: '/blog/voter-id-oci-visa-photo-size-guide',
    navLabel: 'Voter, OCI and Visa',
    title: 'Voter ID, OCI and Visa Photo Size Guide | Print or Upload',
    description: 'Compare Voter ID, OCI, and visa photo size workflows, backgrounds, digital uploads, A4 printing, crops, and official-rule checks.',
    eyebrow: 'Identity document article',
    intro: 'Voter ID, OCI, and visa photographs can use different rules. Compare the common starting points and learn when to use a preset, Custom size, or a digital portal.',
    sections: identityPhotoGuideSections,
  },
};

export const ABOUT_PAGE: SEOPage = {
  path: '/about-us',
  navLabel: 'About',
  title: 'About FitMyPhotoA4 | A Simple A4 Photo Sheet Tool',
  description: 'Learn why FitMyPhotoA4 was built, how the local-first A4 photo workflow works, and what the passport and ID photo maker can and cannot do.',
  eyebrow: 'About the tool',
  intro: 'FitMyPhotoA4 was made to remove the guesswork between a good phone photograph and a correctly measured A4 print sheet.',
  sections: aboutSections,
};

export const CONTACT_EMAIL = 'paramkaur7821@gmail.com';

export const CONTACT_PAGE: SEOPage = {
  path: '/contact-us',
  navLabel: 'Contact',
  title: 'Contact FitMyPhotoA4 | Questions and Feedback',
  description: 'Contact the FitMyPhotoA4 team about the photo maker, printing workflow, document guides, accessibility, or website feedback.',
  eyebrow: 'Contact the team',
  intro: 'Ask a question about the maker, report a confusing step, or share feedback. The contact form opens a reviewed email draft without asking you to upload an identity photograph.',
  sections: contactSections,
};