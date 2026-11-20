# Phase 3

Yêu cầu: Ticket-03, Contract 1.2. Thiết kế xem ADR-003.md, thay đổi phá tương thích xem CHANGELOG.md.

Đã chạy: npm test (35 ca), script verify-phase3.js (7 scenario và so JSONL hai lần), npm run build. Bằng chứng script tại docs/proof/phase-3. Kiểm thử riêng Phase 3 kiểm tra hết dầu đúng tick, refuel làm tròn lên, thắp lại giá 5/điểm 40, drain, thưởng pulse drain, ngưỡng dawn từng đêm và sức chứa tối đa.

Các test thắng sớm Phase 2 được đổi kỳ vọng tiếp tục chơi; test tại dawn dùng luật 60%. Script/bằng chứng Phase 2 giữ nguyên cho tag phase-2. Chưa chạy bộ test ẩn của giảng viên. Chưa tag hoặc push Phase 3.

Thuật ngữ trong UI là Ngọn Lửa. Người dùng yêu cầu không thêm nâng cấp đồ họa ngoài phạm vi cần thiết; chỉ thêm thanh dầu, trạng thái đèn và chế độ dễ phân biệt theo ticket.

## Chốt kiểm tra giao diện
- HUD hiển thị bằng chữ đang mang/sức chứa (ví dụ Đom đóm 0 / 10), không chỉ đếm các ô.
- Thêm viền hình học của Bóng Mực; mắt và viền cùng đổi #7A3CFF → #00B3FF khi bật bảng màu dễ phân biệt, không dùng ánh tím trên thân để giả viền.
- Đã mở previewFuel=29 để quan sát pha tắt/bật của đèn dưới 30 dầu. Đèn và thanh nhấp nháy theo sim_tick ở chu kỳ 60 tick (1 Hz), ánh sáng điểm cũng tắt trong pha nhấp nháy.
- Đã phát hiện và sửa thanh dầu bị nền che; kiểm tra lại previewFuel=100 cho thấy thanh vàng đầy rõ phía trên đèn.
- npm test: 35/35 đạt; bản build cuối đạt. Không thêm tính năng ngoài yêu cầu. Chưa tag/push.
