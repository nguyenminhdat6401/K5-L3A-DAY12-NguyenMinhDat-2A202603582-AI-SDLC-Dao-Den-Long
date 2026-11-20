# Retro — Đảo Đèn Lồng

## Kết quả theo từng phase
Phase 1 dựng game tối giản, mô phỏng chung cho renderer/headless và tag phase-1. Nhược điểm ban đầu là kiểm thử ít và việc xác nhận trực quan chưa đủ. Lỗi A/D ngược camera được người dùng phát hiện; sửa ở ánh xạ giao diện để giữ công thức của Test Contract.

Phase 2 mở rộng ba Đêm, chuẩn hóa số liệu và thêm dash, Bùa Gió, Gió Lạc. Cách làm từng thay đổi nhỏ giúp khoanh lỗi, nhưng việc dừng sớm sau mỗi nhóm sửa làm kéo dài trao đổi và chưa đáp ứng yêu cầu hoàn thành trọn phase. Cần có checklist nghiệm thu ngay từ đầu. Những lỗi tìm được qua chạy thật gồm menu tự quay về menu, mất lần nhấn phím ngắn, camera xuất phát dưới tầng trung tâm và hình dạng vật thể khó nhận biết. Đã sửa bằng hàng đợi input, kiểm tra đường dẫn UI và chọn điểm xuất phát hợp lý được ghi lại.

Phase 3 thay mô hình đèn vĩnh viễn bằng dầu, châm dầu/thắp lại, drain và sống tới bình minh. Sử dụng số nguyên 1/60 đơn vị dầu giúp kiểm tra chính xác mốc 0/30/100. ADR ghi luật bị thay, test thắng sớm được đổi kỳ vọng thay vì skip. Kiểm tra trực quan phát hiện thanh dầu bị nền che; sửa vị trí theo hướng camera. Ngọn Lửa được dùng thống nhất cho sinh lực.

Phase 4 bổ sung benchmark WebGL đo khung hình thật, soak cùng tiến trình, lưu bảng xếp hạng trên đĩa và các tùy chọn tiếp cận. Lần đo benchmark đầu bị giới hạn gần 60 Hz và 1% low chưa đạt; dùng cờ Chrome tắt vsync/giới hạn khung hình rồi đo lại, giữ kết quả thật. Soak đầu vượt tỷ lệ RSS một chút; đo sau GC ở cả hai mốc, ghi rõ cách đo, không sửa số liệu. Các kết quả trong bench.json/soak.json chỉ áp dụng máy phát triển, không suy ra máy chấm.

## Làm việc với AI và harness
AGENTS.md xác định logic dùng chung, lệnh kiểm tra, quy tắc không sửa bằng chứng và không di chuyển tag. Các script verify-phaseN tự tạo scenario, chạy hai lần và so JSONL giúp phát hiện thay đổi ngoài ý muốn. Script bench/soak xuất dữ liệu từ chương trình thật. Hạn chế là các kiểm thử ban đầu chỉ bao phủ đường đi thuận lợi; nhiều lỗi UI chỉ lộ khi mở trình duyệt. Nếu làm lại, viết danh sách tiêu chí theo từng dòng ticket và dành riêng thời gian test biên/kiểm tra hiển thị trước khi báo hoàn thành.

Không có số token/chi phí thực tế từ giao diện API của phiên này. Ước lượng rất thô cho toàn bộ trao đổi và công việc: khoảng 100.000–250.000 token, dựa trên độ dài hội thoại, mã và output công cụ; đây không phải số dùng để tính phí. Chi phí tiền không xác định vì không biết gói và bảng giá được áp dụng. Cách tiết kiệm: không tạo asset AI, dùng hình học và Web Audio; đọc file theo nhóm; không chạy lại tất cả test sau sửa tài liệu; dùng script tái lập. Điểm cần cải thiện lớn nhất là giảm các lượt dừng giữa chừng và không biến số lượng test đạt thành lời khẳng định đã bao phủ toàn bộ yêu cầu.

## Bài học
Tách mô phỏng khỏi giao diện làm thay đổi luật nhanh hơn và bảo vệ đầu ra headless. Mặt khác, thay hàng loạt chuỗi trong các file một dòng làm tăng nguy cơ lỗi; nên chia renderer/UI thành module nhỏ, định dạng mã và dùng hàm thuần cho state/score ngay từ đầu. Bản phát hành cần kiểm tra từ bản zip sạch, kiểm tra leaderboard sau mở lại và nêu trung thực giới hạn benchmark/demo. Các tag cũ giữ nguyên để người chấm tái lập kết quả theo từng phase.
