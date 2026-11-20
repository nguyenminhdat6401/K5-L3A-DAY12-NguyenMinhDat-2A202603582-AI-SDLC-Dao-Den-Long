# Phase 2 — bản cục bộ để kiểm tra

Nguồn: Ticket-02, Test Contract 1.1. Không tạo tag/push cho tới khi người dùng yêu cầu.

## Phạm vi triển khai
- Ba bản đồ, đèn và điểm sinh theo Ticket-02; cầu, dốc, tầng, tháp và bục nhảy.
- Thông số chuẩn; tick cố định 60 Hz, các bước timers/movement/pickup/deposit/safety/pulse/enemies/contact/spawn/end.
- Lướt, Bùa Gió, Gió Lạc, gió Đêm 3, rơi và chờ hồi sinh.
- Chuỗi ba Đêm, tổng điểm Đêm đã thắng, replay/pause/settings, âm thanh tổng hợp, HUD.
- Contract 1.1 và mở rộng scenario/snapshot/event; đầu vào sai được báo lỗi.
- Gió Lạc là dải lụa xám xanh; Bùa Gió là lá bùa đỏ viền vàng, có nhãn riêng để phân biệt. Dừng bổ sung đồ họa theo yêu cầu người dùng.

## Kiểm chứng đã chạy
- npm test: 27/27 đạt, gồm hồi sinh vẫn spawn, choáng đủ 120 tick, push 4 m, bục Đêm 2, dash trên không, bùa bỏ cooldown và pulse đuổi Gió Lạc trước khi cướp.
- node scripts/verify-phase2.js: 7 scenario đạt; mỗi scenario chạy lại và so toàn bộ JSONL giống hệt. File đầu vào/đầu ra/results.json ở docs/proof/phase-2.
- Scenario Đêm 3 chạy 21600 tick với spawn bật, invuln_ticks 30000 và wind_enabled false để không chết do đứng yên: 5.945 giây, snapshot mỗi tick, Node v22.15.0 / Windows / AMD Ryzen 5 5625U.
- npm run build: đạt; Vite cảnh báo bundle lớn hơn 500 kB.
- Đã mở game kiểm tra menu → intro → play; pause và settings; hình dạng hai vật thể qua màn inspect; camera xuất phát Đêm 3.
- FPS đo qua requestAnimationFrame, viewport 1280x720, khoảng 18–19 giây: Đêm 1 58.8 (bản trước nâng UI), Đêm 2 57.9, Đêm 3 31.4. Đây là các lần đo ngắn ở đầu màn, không phải phép đo toàn bộ thời gian chơi.

## Giả định
- Điểm xuất phát Đêm 3 không được ticket chỉ định: chọn (0,0,-30), tránh nằm dưới tầng trung tâm. Scenario vẫn ghi đè được.
- Bóng sinh thường có trạng thái spawning 30 tick. Scenario mặc định chase, hoạt động ngay.
- Cập nhật test chi phí đèn và pulse của Phase 1 theo các số chuẩn Ticket-02, giữ nguyên tag Phase 1.

## Giới hạn bằng chứng
Chưa chạy bộ test ẩn của giảng viên và chưa chơi thắng liên tục cả ba Đêm bằng tay. Kiểm thử tự động không bảo đảm mọi tình huống có thể xảy ra. Không sửa tay bằng chứng.

## Nhật ký AI
Codex hỗ trợ viết và kiểm thử. Đã sửa lỗi menu tự quay lại, input nhấn nhanh bị mất, snapshot wind tham chiếu chung, đồng hồ sai số, spawn ngừng khi hồi sinh, timer choáng và điểm xuất phát bị tầng che camera. Chưa có số liệu token/chi phí từ giao diện, không tự bịa.
