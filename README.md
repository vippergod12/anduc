# anduc — Website khung (Next.js + TypeScript)

Bộ khung giao diện dựa trên cấu trúc của repo [aura](https://github.com/vippergod12/aura), nhưng:

- **Không cần database, admin hay API.** Toàn bộ nội dung đọc từ file JSON trong thư mục [`data/`](data/).
- **Ảnh đang để trống.** Ô nào có `"image": ""` sẽ hiện khung xám.
- **Chữ là lorem ipsum.** Bạn sửa dần trong các file JSON.

Công nghệ: Next.js 14 (App Router), React 18, TypeScript.

## Chạy dự án

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build production (kiểm tra lỗi TypeScript luôn)
```

## Các file nội dung cần sửa

| File                   | Nội dung                                                                     |
| ---------------------- | ---------------------------------------------------------------------------- |
| `data/site.json`       | Tên thương hiệu, logo, mô tả SEO, hotline, email, địa chỉ, Zalo, menu        |
| `data/home.json`       | Trang chủ: hero, marquee, dịch vụ, danh mục, nổi bật, câu chuyện, quy trình, đánh giá, CTA |
| `data/categories.json` | Danh mục (mỗi danh mục có trang `/danh-muc/<slug>`)                          |
| `data/projects.json`   | Dự án/sản phẩm (mỗi dự án có trang `/du-an/<slug>`)                          |
| `data/services.json`   | Trang `/dich-vu`                                                             |
| `data/about.json`      | Trang `/ve-chung-toi`                                                        |
| `data/contact.json`    | Trang `/lien-he` và form liên hệ                                             |

### Cú pháp chữ trong tiêu đề

- `*chữ*` → in nghiêng, màu vàng nhấn. Ví dụ: `"Lorem ipsum *dolor sit*"`
- `\n` → xuống dòng.

### Thêm ảnh

1. Bỏ ảnh vào `public/images/`, ví dụ `public/images/du-an-01.jpg`.
2. Trong JSON, điền đường dẫn bắt đầu từ `/`: `"cover_image": "/images/du-an-01.jpg"`.
   Link ảnh online (`https://...`) cũng dùng được.
3. Để `""` thì sẽ hiện lại khung ảnh trống.

### Thêm dự án

Copy một object trong `data/projects.json` rồi sửa các trường:

- `id`: số không trùng.
- `slug`: không trùng, không dấu, nối bằng gạch ngang. Slug chính là đường dẫn trang.
- `category_id`: trỏ tới `id` trong `categories.json`.

Các cờ: `is_featured: true` để hiện ở mục "Nổi bật" trang chủ, `is_hero: true` để lấy ảnh bìa làm nền hero (nếu `home.json → hero.image` đang trống). `sort_order` dùng để sắp xếp thứ tự.

### Thêm trường dữ liệu mới

1. Thêm trường vào file JSON.
2. Khai báo kiểu tương ứng trong `lib/types.ts`.
3. Hiển thị trường đó trong component/trang.

Nếu JSON thiếu trường hoặc sai kiểu, `npm run build` sẽ báo lỗi TypeScript.

## Cấu trúc

```
app/
├── layout.tsx              # Root layout (font, metadata, JSON-LD)
├── globals.css             # Theme (cream + gold + ink) + style khung ảnh trống
├── sitemap.ts, robots.ts
└── (public)/               # Navbar + Footer + nút Zalo/Gọi nổi
    ├── page.tsx            # Trang chủ
    ├── du-an/              # Danh sách (lọc + tìm kiếm) & chi tiết [slug]
    ├── danh-muc/[slug]/    # Trang danh mục
    ├── dich-vu/  ve-chung-toi/  lien-he/
components/
├── home/                   # Hero, Marquee, Services, CategoriesBento, FeaturedProjects, Story, Process, Testimonials, BigCTA
├── Img.tsx                 # Ảnh + khung trống khi src rỗng
├── RichText.tsx            # Xử lý *nhấn* và \n
└── Navbar, Footer, ProjectCard, Logo, FloatingActions, PageTransition, RouteProgress
data/                       # ← NỘI DUNG (JSON)
lib/
├── data.ts                 # Hàm đọc JSON (sau này đổi sang DB/API chỉ cần sửa file này)
├── types.ts                # Kiểu dữ liệu
├── seo/                    # siteConfig, JSON-LD
└── utils/                  # format, zalo
```

## Biến môi trường (tuỳ chọn)

Nếu đặt các biến sau trong `.env.local`, chúng sẽ ghi đè giá trị trong `data/site.json`:
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ZALO_PHONE`, `NEXT_PUBLIC_ZALO_URL`, `NEXT_PUBLIC_HOTLINE`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_ADDRESS`.
