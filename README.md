# 📸 A4 Size Photo Maker

Passport, stamp aur custom size photos ko ek A4 sheet par perfectly arrange karne wala web tool — taki aap ghar ya kisi bhi photo studio se ek hi print me kai copies nikal sakein.

## 🌐 Live Demo

App ab dono platforms par **live** hai:

- **Vercel:** https://a4-size-photo-maker.vercel.app
- **Render:** https://a4-size-photo-maker.onrender.com

Dono URLs pe saari pages (About, Blog, Passport/ PAN/ Voter ID Photo Maker, FAQ, Contact, Privacy Policy, Terms) chal rahi hain.

## ✨ Features

- **Multiple photo sizes** — Passport (35×45mm), Stamp (20×25mm), Visa (51×51mm) aur custom dimensions
- **Auto layout** — A4 sheet (210×297mm) par maximum photos automatically fit ho jati hain
- **Crop & adjust** — upload ke baad photo ko crop, rotate aur reposition karne ki facility
- **Cutting guides** — dotted lines taki print ke baad kaatna aasan ho
- **High quality output** — 300 DPI print-ready PDF / JPG download
- **No signup needed** — sab kuch browser me, photos kahin upload nahi hoti
<img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/cbe92e86-3dab-4382-8f92-5ab67ff5d989" />

## 🖼️ Preview

<!-- Yahan apna screenshot add karein -->
![App Screenshot](./attached_assets/screenshot.png)

## 🚀 Getting Started

### Prerequisites
- Node.js 18 ya usse upar
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Repo clone karein
git clone https://github.com/paramkaur7821-dotcom/A4-Size-Photo-Maker.git
cd A4-Size-Photo-Maker

# Dependencies install karein
pnpm install

# Development server start karein
pnpm dev
```

Ab browser me `http://localhost:3000` open karein.

### Production Build

```bash
pnpm build
pnpm start
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript |
| Package Manager | pnpm |
| Deployment | Vercel + Render |
| Dev Environment | Replit |

## 📖 How to Use

1. **Upload** — apni photo select karein ya drag & drop karein
2. **Choose size** — passport, stamp ya custom size chunein
3. **Adjust** — crop karke face ko sahi position me set karein
4. **Set quantity** — kitni copies A4 sheet par chahiye
5. **Download** — print-ready file download karke print kar lein

> **Printing tip:** Print dialog me scaling "100%" ya "Actual Size" rakhein, "Fit to page" nahi — warna photo ka size badal jayega.

## 🗂️ Project Structure

```
├── lib/          # Core logic (image processing, layout)
├── scripts/      # Build aur utility scripts
├── artifacts/    # Generated output files
└── attached_assets/  # Images, icons, static assets
```

## 🤝 Contributing

Contributions welcome hain! Issue open karein ya pull request bhejein.

1. Repo fork karein
2. Feature branch banayein (`git checkout -b feature/AmazingFeature`)
3. Changes commit karein (`git commit -m 'Add AmazingFeature'`)
4. Branch push karein (`git push origin feature/AmazingFeature`)
5. Pull Request open karein

## 📄 License

MIT License — details ke liye [LICENSE](LICENSE) file dekhein.

## 👤 Author

**Param Kaur** — [@paramkaur7821-dotcom](https://github.com/paramkaur7821-dotcom)

---

Agar ye project useful laga to ⭐ zaroor dein!
