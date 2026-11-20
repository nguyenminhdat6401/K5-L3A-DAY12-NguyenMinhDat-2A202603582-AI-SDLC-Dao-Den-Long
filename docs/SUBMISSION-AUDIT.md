# Rà soát nộp bài cuối

- Repo: K5-L3A-DAY12-NguyenMinhDat-2A202603582-AI-SDLC-Dao-Den-Long, đã kiểm tra API GitHub: public.
- Mã nguồn, package-lock, Contract 1.3 có build/run/headless/bench/soak, harness AGENTS và scripts kiểm chứng: có.
- README: video đầu trang, ảnh, cấu hình, cài/chơi ba lệnh, điều khiển và lệnh kiểm chứng: có.
- CREDITS, LICENSE, CHANGELOG cả bốn phase, ADR-003, retro: có.
- Bằng chứng Phase 1–3 giữ ở tag và docs tương ứng; số liệu cuối bench.json/soak.json có trong repo.
- Test cuối: 38 test, 38 pass, 0 fail; raw TAP và JSON trong docs/proof/phase-4.
- Demo: MP4 37.6 giây, khoảng 1.62 MB; cách ghi/input tự động ghi rõ README và CREDITS. Gói chạy được đóng từ dist và máy chủ Node, manifest SHA256, kiểm tra chạy không có node_modules đạt.
- Quét dấu hiệu khóa phổ biến không có kết quả; không phát hiện .env trong phần sẽ commit. .local, node_modules, dist, release và outputs bị ignore.
- Tags Phase 1–3 đã có. Tag phase-4, tag v1.0.0 và Release cuối được đối chiếu trực tiếp trên GitHub trong bước phát hành, không di chuyển tag cũ.

Không thể khẳng định đã vượt bộ test ẩn của giảng viên. Kết quả benchmark là của máy phát triển. Việc nộp link lên LMS và xác nhận hạn theo Coach là bước ngoài repo, do người dùng thực hiện.
