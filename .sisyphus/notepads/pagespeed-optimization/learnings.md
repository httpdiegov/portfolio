
## App Icons Created (2026-03-23)

### Next.js App Router Icon Conventions
- `src/app/icon.png` (32x32) → Auto-generates favicon
- `src/app/apple-icon.png` (180x180) → iOS home screen icon
- `src/app/opengraph-image.png` (1200x630) → Social media preview

### Implementation Notes
- Used Python Pillow for image generation (ImageMagick not available on Windows)
- Simple text-based design with "B" for favicon, "BC" for larger icons
- Added accent bar on larger icons for visual interest
- Colors: white background (#ffffff), black text (#000000), blue accent (#2563eb)

### Build Verification
- Next.js auto-detects and serves icons from app directory
- No additional configuration needed in metadata
- Icons are statically generated and optimized
