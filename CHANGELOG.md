# Changelog

## Phase 3 — Contract 1.2 (breaking changes)
- Đèn hao nhiên liệu, châm dầu, cạn dầu và thắp lại; snapshot đèn thêm fuel/ever_lit/relit_count.
- Bóng Mực có drain và có thể vào vùng đèn yếu dưới 30 fuel.
- Bỏ thắng sớm/all_lit; chỉ thắng dawn_survived nếu còn Ngọn Lửa và đủ tỷ lệ đèn lúc hết giờ.
- Thời lượng 240/270/300; công thức điểm mới; sức chứa tăng 10→20 theo số lần thắp.
- Bảng màu dễ phân biệt được lưu; đèn tắt xẹp và có vết rách; thanh dầu nhấp nháy dưới 30.
- Bóng Mực di chuyển tách nhau, không chồng thành khối; không thay lực đẩy khi stunned/recoil.

## Phase 4 — Contract 1.3
- Benchmark WebGL chuẩn với 200 Bóng Mực, 100 đom đóm; 3 giây warmup, camera orbit và xuất số đo thật.
- Soak 10 Đêm cùng tiến trình, đầu vào theo seed, RSS hai mốc và báo crash.
- Bảng xếp hạng file JSON, top 10, kiểm tra tên, sắp xếp điểm/thời gian, xuất qua run_cmd.
- Đổi phím có báo trùng và khôi phục; giảm chuyển động, chữ lớn, chỉ báo hình ảnh.
- Máy chủ Node không phụ thuộc Vite cho bản phát hành, gói web, LICENSE/credits, retro và demo MP4.

## Phase 1
- Game Đảo Bến và Test Contract 1.0, mô phỏng 60 Hz, headless deterministic, HUD cơ bản.

## Phase 2 — Contract 1.1
- Ba Đêm, số liệu chuẩn, dash/pause, Bùa Gió/Gió Lạc, âm thanh, settings và HUD mở rộng.

- Menu chính nền 3D có Chơi, chọn Đêm 1–3, Cài đặt ngoài game, Hướng dẫn và Bảng xếp hạng; số Đêm thắng được đếm theo kết quả thực khi chọn Đêm riêng.
