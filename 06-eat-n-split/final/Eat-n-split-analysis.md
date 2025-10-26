# Eat-n-Split (Final) – Tài liệu Phân Tích

## 1. Mục tiêu & vấn đề giải quyết
- Ứng dụng giúp bạn ghi nhận các khoản nợ (dương/âm) giữa bạn và từng người bạn trong danh sách, giải quyết bài toán “ai nợ ai bao nhiêu” khi chia tiền ăn chung.
- Cho phép thêm bạn mới, chọn một người để chia hóa đơn và cập nhật số dư theo kết quả chia.
- Trải nghiệm minh họa các khái niệm React nền tảng: quản lý state, luồng dữ liệu một chiều, component composition, controlled form, conditional rendering.

## 2. Cấu trúc dự án
- `index.js` (`06-eat-n-split/final/src/index.js:1`): Mount ứng dụng với `React.StrictMode` để phát hiện side-effect không an toàn trong dev.
- `App.js` (`06-eat-n-split/final/src/App.js:1`): Chứa toàn bộ component và logic state của demo. Các component con (Button, FriendsList, Friend, FormAddFriend, FormSplitBill) cùng nằm trong file nhằm giữ ví dụ gọn.
- `index.css`: Định kiểu giao diện, không tác động tới logic nhưng hỗ trợ trình bày rõ ràng cho việc học.

## 3. Thành phần React chính & vai trò
- `App` (`06-eat-n-split/final/src/App.js:23`): Component cha điều phối state toàn cục (danh sách bạn bè, trạng thái form, người đang chọn). Đây là minh họa chuẩn cho “lifting state up”.
- `Button` (`06-eat-n-split/final/src/App.js:16`): Button tái sử dụng; ví dụ đơn giản về component presentational nhận `children` và `onClick`.
- `FriendsList` (`06-eat-n-split/final/src/App.js:64`): Nhận `friends`, `selectedFriend`, `onSelection` và render danh sách `Friend`. Giữ vai trò chuyển dữ liệu xuống và chuyển callback lên.
- `Friend` (`06-eat-n-split/final/src/App.js:75`): Hiển thị avatar, tên, tình trạng nợ và nút chọn/đóng. Tính toán `isSelected` tại chỗ và thể hiện ba trạng thái số dư khác nhau bằng điều kiện.
- `FormAddFriend` (`06-eat-n-split/final/src/App.js:94`): Controlled form nhận callback `onAddFriend`. Tạo `id` bằng `crypto.randomUUID()` và thêm query param `?=id` để luôn lấy ảnh mới. Reset state sau khi submit.
- `FormSplitBill` (`06-eat-n-split/final/src/App.js:127`): Form chia hóa đơn giữa bạn và người được chọn; đảm bảo tổng tiền không vượt quá hóa đơn và gửi kết quả lên `App`.

## 4. Quản lý state & luồng dữ liệu
- `useState` đa dạng:
  - Danh sách bạn (`friends`) với trạng thái khởi tạo tĩnh (`06-eat-n-split/final/src/App.js:25`).
  - Toggle form thêm bạn (`showAddFriend`) (`06-eat-n-split/final/src/App.js:26`).
  - Lưu người đang thao tác (`selectedFriend`) (`06-eat-n-split/final/src/App.js:27`).
  - State form nội bộ ở các component con để giữ dữ liệu nhập.
- Cập nhật bất biến (immutable update):
  - Thêm bạn mới bằng spread `[...]` (`06-eat-n-split/final/src/App.js:40`).
  - Điều chỉnh số dư bằng `map` và toán tử spread (`06-eat-n-split/final/src/App.js:54`).
- Luồng dữ liệu một chiều:
  - `App` truyền props xuống; sự kiện từ con bắn ngược lên (ví dụ `onSelection`, `onAddFriend`, `onSplitBill`) rồi `App` cập nhật state → kết quả render lại toàn bộ cây liên quan.
- Derived state:
  - `paidByFriend` trong `FormSplitBill` được tính động từ `bill` và `paidByUser` thay vì lưu riêng (`06-eat-n-split/final/src/App.js:136`), tránh lệch dữ liệu.
- Conditional rendering:
  - Ẩn/hiện form thêm bạn bằng `showAddFriend` (`06-eat-n-split/final/src/App.js:48`).
  - Chỉ render `FormSplitBill` khi có người được chọn (`06-eat-n-split/final/src/App.js:60`).
  - Thông điệp nợ hiển thị tùy `balance` âm/dương/0 (`06-eat-n-split/final/src/App.js:84`).

## 5. Thao tác form & xử lý sự kiện
- Controlled components: mọi `<input>` và `<select>` được ràng buộc với state tương ứng, cập nhật qua `onChange`.
- Validation đơn giản:
  - `FormAddFriend` bỏ qua submit khi thiếu tên hoặc URL (`06-eat-n-split/final/src/App.js:106`).
  - `FormSplitBill` chặn khi chưa nhập đủ (`06-eat-n-split/final/src/App.js:145`) và không cho phép phần bạn trả vượt hóa đơn (`06-eat-n-split/final/src/App.js:153`).
- Reset context:
  - Sau khi thêm bạn, form được reset và form đóng lại (`06-eat-n-split/final/src/App.js:44`).
  - Sau khi chia tiền, `selectedFriend` đặt về `null` để tránh chỉnh sai bạn (`06-eat-n-split/final/src/App.js:56`).
- Re-render key-based:
  - `FormSplitBill` dùng `key={selectedFriend.id}` (`06-eat-n-split/final/src/App.js:58`) để React remount form khi chọn người khác, giúp reset state nội bộ của form.

## 6. Kiến thức React rút ra
- Component tree và phân tách trách nhiệm: `App` điều phối, các form xử lý UI/logic nhập liệu.
- Lifting state up: đặt state chung ở cha để các component con dùng chung dữ liệu.
- State bất biến và cập nhật dựa trên state trước (`setFriends(friends => ...)`) giúp tránh bug race condition.
- Derived values và computed fields nên tính tại thời điểm render thay vì cất vào state để tránh sai lệch.
- Controlled form + validation đơn giản tạo trải nghiệm nhập liệu nhất quán.
- Conditional rendering và CSS class động (ví dụ `selected`) giúp thể hiện trạng thái UI.
- Sử dụng `React.StrictMode` để phát hiện side effect không mong muốn trong development.
- Sử dụng API trình duyệt (`crypto.randomUUID`) trong React để tạo dữ liệu giả lập, lưu ý về tính tương thích trình duyệt.

## 7. Dòng chảy hoạt động (tóm tắt)
1. Ứng dụng render danh sách bạn với số dư hiện tại.
2. Người dùng có thể chọn một bạn → `selectedFriend` cập nhật, form chia tiền hiện lên.
3. Nhập tổng hóa đơn, phần bạn trả, chọn người trả. Submit → `handleSplitBill` cập nhật số dư (dương nghĩa là bạn được nợ, âm nghĩa là bạn nợ).
4. Thêm bạn mới: mở form, nhập tên & URL, submit → thêm vào danh sách và tự động đóng form.

## 8. Gợi ý mở rộng
- Thêm validation nâng cao (ví dụ đảm bảo `paidByUser` là số hợp lệ).
- Lưu danh sách bạn vào `localStorage` để giữ dữ liệu sau khi reload.
- Phân tách component ra nhiều file để dễ bảo trì khi dự án lớn hơn.
- Viết test component (React Testing Library) kiểm tra logic chia tiền.

## 9. Tiến hành tiếp theo
- Chạy `npm start` trong thư mục `06-eat-n-split/final` để trải nghiệm và thử các kịch bản.
- Nếu mở rộng tính năng, cân nhắc triển khai test tự động và quản lý state nâng cao (Context/Redux) khi quy mô lớn hơn.

