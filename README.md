# Đảo Đèn Lồng — Phase 3
Nguyễn Minh Đạt · 2A202603582 · Contract 1.2

Mục tiêu: giữ đảo sáng tới bình minh. Đêm 1/2/3 kéo dài 240/270/300 giây; cần ít nhất 3/5, 4/6, 5/7 đèn sáng tại tick cuối và còn Ngọn Lửa. Thắp đủ đèn không kết thúc sớm.

## Chạy
Node.js 22+, Windows/macOS/Linux:
```sh
npm ci
npm run dev
```
Mở URL Local. WASD di chuyển; giữ chuột trái kéo camera; Space nhảy; Shift lướt; E nạp/châm dầu; Q Tỏa Sáng; Esc/P tạm dừng. R chơi lại Đêm. Cài đặt trong menu tạm dừng có âm lượng, độ nhạy và bảng màu dễ phân biệt, được lưu.

## Luật Phase 3
- Đèn có 100 dầu, hao 1/giây. Mỗi đom đóm châm thêm 10 dầu. Thắp lần đầu cần 10 đom đóm, thắp lại cần 5.
- Dầu dưới 30 mất vùng an toàn; Bóng Mực wander có thể tới hút thêm 5 dầu/giây mỗi con.
- Sức chứa 10 + 2 mỗi lần thắp, tối đa 20. Châm dầu không tăng sức chứa.
- Điểm: +5/đom đóm nạp, +100 thắp mới, +40 thắp lại, +5 Bóng trúng pulse hoặc tổng +15 nếu đang drain. Thắng bình minh: mỗi đèn sáng +50+floor(dầu), mỗi Ngọn Lửa +50; bỏ thưởng thời gian. Chỉ cộng các Đêm đã thắng vào tổng điểm.
- Gió Lạc là dải lụa xám xanh; Bùa Gió là lá bùa đỏ viền vàng. Các luật di chuyển, lướt và bùa của Phase 2 vẫn giữ.

## Kiểm tra
```sh
npm test
node scripts/verify-phase3.js
node src/headless.js --seed 42 --night 1 --ticks 600 --out output.jsonl
```
Headless hỗ trợ --scenario, --inputs, --snapshot-every; build web bằng npm run build. Báo cáo tại docs/phase-3.md, ADR tại docs/ADR-003.md, thay đổi phá tương thích trong CHANGELOG.md. Bằng chứng Phase 1–2 giữ nguyên ở tag tương ứng; verify-phase2 dành cho tag phase-2.

## Giả định và sáng tạo
Điểm xuất phát Đêm 3 chọn (0,0,-30) vì ticket không chỉ định, tránh nằm dưới tầng trung tâm; scenario ghi đè được. Bóng sinh thường spawning 30 tick. Các quầng sáng, nhạc tổng hợp và nhãn nhận diện chỉ phục vụ hiển thị, không đổi headless. Xem CREDITS.md.

Để thử riêng một Đêm thêm ?previewNight=2 hoặc 3; ?perf=1 hiện FPS. Những tùy chọn xem thử không thay logic headless. Phase 3 hiện chỉ lưu tại máy, chưa tag/push.
