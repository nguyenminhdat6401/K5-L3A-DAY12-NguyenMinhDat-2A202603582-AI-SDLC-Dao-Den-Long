# Hướng dẫn agent — Phase 4
- Yêu cầu cuối: Ticket-04 / Contract 1.3, giữ gameplay 60 tick/s của v1.2.
- Lệnh: npm test; npm run build; node scripts/verify-phase3.js khi sửa gameplay; node scripts/bench.js --seed 42 --duration 30 --out bench.json; node --expose-gc scripts/soak.js --seed 7 --nights 10 --out soak.json.
- Không sửa tay JSON bằng chứng; benchmark dùng cảnh chuẩn và số khung thật, soak một tiến trình.
- Dữ liệu người chơi .local/ không commit; tests bảng xếp hạng dùng thư mục tạm.
- Không di chuyển tag cũ; chưa tag/push/release Phase 4 khi người dùng chưa yêu cầu.
- Khi đóng gói phải kiểm tra gói giải nén chạy không cần node_modules.
