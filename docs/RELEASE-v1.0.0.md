# v1.0.0 — Đảo Đèn Lồng

Contract 1.3, hoàn tất luồng ba Đêm và các thay đổi dầu đèn của Phase 3. Phase 4 thêm benchmark, soak, bảng xếp hạng lưu trên đĩa, đổi phím và tùy chọn tiếp cận.

## Tài sản phát hành đã chuẩn bị
- dao-den-long-v1.0.0-web.zip: giải nén, cài Node.js 22+ nếu chưa có, chạy node scripts/run.js trong thư mục giải nén, mở URL được in. Không cần npm install để chơi gói này.
- demo.mp4: demo dưới 5 phút, ghi bản chạy thực tế với input tự động, kèm dữ liệu kiểm chứng.
- bench.json và soak.json: số đo máy phát triển, không phải máy chấm.

Bảng xếp hạng trong .local/leaderboard.json được giữ giữa các lần chạy. Xuất bằng node scripts/run.js --export-leaderboard out.json. Xem README để chạy từ mã nguồn, test/headless/bench/soak, yêu cầu hệ thống và các giới hạn đo.

Các tag Phase 1–3 giữ nguyên. Bản cuối dùng tag phase-4 và v1.0.0 cùng commit; tài sản zip/demo/số đo được đính kèm Release.
