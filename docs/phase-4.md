# Phase 4 — bộ bàn giao cục bộ

Nguồn: Ticket-04, Test Contract 1.3. Bản đã được người dùng yêu cầu rà soát để chốt tag phase-4 và phát hành v1.0.0.

## Checklist triển khai và bằng chứng
| Mục | Triển khai / bằng chứng |
|---|---|
| Benchmark chuẩn | scripts/bench.js, bench.html, src/bench.js, setupBenchmark trong renderer. Đúng 200 Bóng Mực, 100 đom đóm, L1–L3 100 dầu, camera (30,15,0), quay 15 s/vòng, 3 s warmup; không spawn/hit/pickup/decay/end, vẫn di chuyển wander và tách bóng. |
| Số đo cuối | bench.json: avg 96.8 FPS, 1% low 41.3907, p95 14.4 ms, 2904 frames, load 1943 ms, duration 30 s. Đo riêng sau đóng tab kiểm thử. Cờ Chrome tắt vsync và frame limit. RSS web null theo contract. Đạt các ngưỡng ở lần đo máy phát triển; không suy ra máy chấm. |
| Soak | soak.json: 10 Đêm cùng tiến trình, 0 crash, RSS 42.3086→49.3008 MB, tỷ lệ 1.1653, 9.891 s; seed 7+i, hướng đổi mỗi 30 tick, xác suất nút theo ticket. Đo sau GC tại hai mốc tải/reset. Tất cả kết quả lost là kết quả thực tế input ngẫu nhiên. |
| Leaderboard | File .local/leaderboard.json, tên hợp lệ, top 10, điểm/time, total won score, ISO Z, seed. Menu và nhập điểm sau thua/đêm 3, CLI export. Unit/integration test đã kiểm tra ghi đĩa và export. |
| Tiếp cận | Đổi mọi phím và báo trùng/khôi phục/lưu; chỉ báo spawn với hướng, gió, 10 s cuối, dầu thấp; giảm chuyển động; font 18 px và ×1.25. Đã kiểm tra trực tiếp thao tác đổi phím trùng, lưu và restore. |
| Menu bổ sung theo người dùng | Menu ngoài game có Chơi, Đêm 1/2/3, Cài đặt, Hướng dẫn, Bảng xếp hạng. Nền đảo 3D chuyển động nhẹ, dừng chuyển động khi bật giảm chuyển động. Bối cảnh menu không chạy gameplay. Đã bấm Settings và chọn Đêm 2, xác nhận đúng màn/thời lượng. Số Đêm thắng ghi theo kết quả thực, không suy từ Đêm bắt đầu. |
| Cài sạch | Thư mục work/phase4-clean-check không có node_modules ban đầu: npm ci, npm run build, npm test đều đạt (38 test). README chơi từ repo trong 3 lệnh. |
| Gói web | release/dao-den-long-v1.0.0-web.zip. Đã giải nén sang thư mục riêng; không có node_modules; máy chủ Node, trang, JS assets, lưu/export leaderboard đều đạt. Kết quả docs/proof/phase-4/release-check.json; manifest SHA256 trong gói. |
| Tài liệu | README có ảnh, hệ thống, điều khiển/test/headless/bench/soak; CHANGELOG cả 4 phase; CREDITS, LICENSE, docs/RETRO.md và release notes. |
| Demo | docs/demo/demo.mp4, 37.6 s, MP4 H.264, 1280×720/5 fps, không âm thanh, input tự động được ghi rõ. Có gameplay, settings, dữ liệu kiểm chứng thật và cảnh bench. verification.json ghi 38 test đạt cùng bench/soak. |

## Các phép kiểm tra
- npm test: 38/38; npm run build đạt. Cảnh báo bundle >500 kB còn tồn tại, không ảnh hưởng ngưỡng benchmark đã đo.
- Các test Phase 1–3 còn hiệu lực giữ; test luật bị Ticket-03 thay đổi được giải thích trong ADR-003.
- Không có bằng chứng giả: các lần benchmark trước chưa đạt hoặc đo khi chạy song song soak được báo trong hội thoại, không dùng làm kết quả đạt; file cuối là lần đo riêng thật.
- Gói không chứa .local hoặc dữ liệu tên người chơi; tests dùng thư mục tạm. Chưa chạy test ẩn giảng viên, chưa chơi thắng cả chuỗi ba Đêm bằng tay.

## Phát hành
Người dùng đã yêu cầu commit/push các file cần nộp và tag phase-4. Gói zip/demo/số đo được chuẩn bị để đính kèm GitHub Release v1.0.0. Đối chiếu trạng thái công bố trên trang Releases của repo; không chỉ dựa vào tài liệu này.
