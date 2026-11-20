# Đảo Đèn Lồng — Phase 2
Nguyễn Minh Đạt · 2A202603582

Game 3D qua ba Đêm: Đảo Bến, Đảo Cau, Đảo Chuông. Mây thu thập đom đóm, thắp các đèn và tránh Bóng Mực, Gió Lạc. Contract 1.1; Phase 1 được giữ trong tag phase-1.

## Chạy
Yêu cầu Node.js 22+; chạy trên Windows/macOS/Linux:
```sh
npm ci
npm run dev
```
Mở URL Local trong terminal. WASD di chuyển theo camera; giữ chuột trái kéo để xoay; Space nhảy; Shift lướt; E nạp; Q Tỏa Sáng; Esc/P tạm dừng. R chơi lại Đêm.

## Luật
Sức chứa 10, mỗi đèn cần 10; nạp nhiều lần. Tỏa Sáng tốn 3, hồi 3 giây; Lướt 14 m/s trong 0.2 giây, hồi 1.5 giây. Bùa Gió là lá bùa đỏ viền vàng: chạy 7.2 m/s và lướt không hồi chiêu trong 10 giây. Gió Lạc là dải lụa xám xanh: cướp tối đa 3 đom đóm; Tỏa Sáng khiến nó chạy đi hoặc thả đồ đã cướp.
Điểm: +10 mỗi đom đóm nạp, +100 mỗi đèn, +5 mỗi Bóng Mực trúng pulse; thắng thêm floor(giây còn lại)*2 + 50*Ngọn Lửa. Tổng điểm gồm các Đêm đã thắng.

## Kiểm chứng
```sh
npm test
node scripts/verify-phase2.js
node src/headless.js --seed 42 --night 2 --ticks 600 --out output.jsonl
```
Tùy chọn headless: --scenario, --inputs, --snapshot-every. Build web: npm run build. Bằng chứng tự sinh tại docs/proof/phase-2, báo cáo docs/phase-2.md.
Để thử riêng một Đêm, thêm ?previewNight=2 hoặc ?previewNight=3 vào URL; ?perf=1 hiện số FPS sau 10 giây. ?inspect=entities mở cảnh so sánh Gió Lạc và Bùa Gió. Những tùy chọn xem thử không thay logic headless.

## Giả định
Đêm 1 và 2 xuất phát (0,0,0). Ticket không ghi điểm xuất phát Đêm 3; chọn (0,0,-30) trên đất trống để tránh nằm dưới tầng trung tâm. Scenario có thể ghi đè vị trí. Bóng sinh thường có 30 tick spawning. Mây đứng yên thì lướt theo hướng cuối, mặc định +Z.

## Sáng tạo của tôi
Quầng sáng, dải lụa uốn động, bùa có biểu tượng gió và nhãn, ánh trăng, sóng Tỏa Sáng, nhạc tổng hợp. Phần trình bày không tác động đầu ra headless. Mô hình hình học tự dựng; xem CREDITS.md.

Bản hiện tại chỉ được lưu cục bộ theo yêu cầu người dùng, chưa tạo tag phase-2 hoặc push.
