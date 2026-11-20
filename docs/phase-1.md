# Phase 1 — ghi chép và bằng chứng

- Yêu cầu: PRD-0 và Test Contract v1.0 trên lab board. Thiết kế tách mô phỏng 60 tick/giây và hiển thị.
- Giả định: xem README và tuning trong game.contract.json. Kịch bản chỉ đổi đèn theo ID; dựng scenario không phát sự kiện hay cộng điểm.
- Kiểm chứng: `npm test`: 5 kiểm thử, gồm di chuyển/chuẩn hóa, nhặt và chiến thắng, tỏa sáng, va chạm/thua, headless lặp lại và dữ liệu sai. `npm run build`: thành công. Chạy lại các lệnh để xem kết quả thực tế.
- Chưa xác nhận: chưa chạy thử trực quan trong trình duyệt do môi trường kiểm tra không kết nối được máy chủ cục bộ; cần chơi thử từ đầu tới thắng/thua và kiểm tra toàn bộ contract với các scenario biên trước khi tag.
- Nhật ký AI: Codex hỗ trợ đọc PRD, thiết kế, viết code và kiểm thử. Token/chi phí: chưa có số liệu từ giao diện; cần bổ sung số thực tế, không ước đoán.
- Chưa tạo tag hay push.
