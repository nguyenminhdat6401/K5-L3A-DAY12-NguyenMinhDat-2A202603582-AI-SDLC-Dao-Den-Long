# Đảo Đèn Lồng — Phase 1

Nguyễn Minh Đạt · 2A202603582

Game 3D Đêm 1: giúp Mây thu nhặt đom đóm và thắp 5 đèn trước bình minh, tránh Bóng Mực. Dự án dùng Node.js 22+, Three.js và Vite, chạy trên Windows, macOS và Linux.

## Chạy game

```sh
npm ci
npm run dev
```

Mở địa chỉ hiện trong terminal. WASD di chuyển, Space nhảy, giữ chuột trái và kéo để xoay camera, E nạp đèn, Q tỏa sáng, R chơi lại. Thu thập 3 đom đóm cho mỗi đèn; mỗi lần tỏa sáng tốn một đom đóm. Mây có 3 ngọn lửa và 300 giây.

## Kiểm thử và headless

```sh
npm test
node src/headless.js --seed 1 --night 1 --ticks 600 --out output.jsonl --snapshot-every 10
```

Thêm `--scenario file.json` và `--inputs file.json` theo Test Contract v1.0. Logic mô phỏng và đồ họa dùng chung `src/game.js`; thông số được khai báo trong `game.contract.json`. Build bản web: `npm run build`.

## Điểm và giả định

Mỗi đom đóm +10 điểm, mỗi đèn +100, mỗi Bóng Mực bị choáng +20; khi thắng thêm 1 điểm mỗi giây còn lại và 50 điểm mỗi ngọn lửa còn lại. Không rơi khỏi đảo: người chơi bị chặn ở rìa (`fall_enabled: false`). Bóng Mực không đánh rơi đom đóm (`hit_drop_ratio: 0`), không vào vùng an toàn quanh đèn đã thắp. Nạp bằng một lần nhấn E; nút hành động kích hoạt khi nhấn mới. Các con số tự chọn trong `game.contract.json`.

## Sáng tạo của tôi

Mây đội nón lá, mang đèn nhỏ; đèn tỏa ánh sáng vàng khi được thắp. Đảo và các hình khối được dựng bằng mã, không dùng asset ngoài. Kiểm thử logic chung bằng `npm test`.

## Trạng thái phase 1

Bản triển khai ban đầu; xem `docs/phase-1.md` để biết kiểm chứng và giới hạn. Các phase sau chưa phát hành. Tài liệu lab gốc: [GUIDE.md](GUIDE.md), [RUBRIC.md](RUBRIC.md).
