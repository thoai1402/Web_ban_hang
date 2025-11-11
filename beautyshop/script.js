// === BeautyShop Script ===

// ------------------------------
// DANH SÁCH SẢN PHẨM
// ------------------------------
const products = [
  { name: "Son môi Dior", price: 290000, img: "img/Son-Duong-Dior.jpg" },
  { name: "Phấn má hồng", price: 250000, img: "img/mahong.jpg" },
  { name: "Kem dưỡng", price: 390000, img: "img/kemduong.jpg" },
  { name: "Serum RoseGlow", price: 520000, img: "img/serum.jpg" },
  { name: "Sữa rửa mặt", price: 210000, img: "img/suaruamat.jpg" },
  { name: "Nước hoa hồng Rose Mist", price: 270000, img: "img/nuoc.jpg" },
  { name: "Kem chống nắng Sun Care", price: 310000, img: "img/kemchongnang.jpg" },
  { name: "Son dưỡng LipLove", price: 180000, img: "img/sonduong.jpg" },
  { name: "Mặt nạ Sleepy Rose", price: 320000, img: "img/matna.jpg" },
  { name: "Toner Fresh Glow", price: 230000, img: "img/toner.jpg" },
  { name: "Phấn phủ Pink Dream", price: 260000, img: "img/phanphu.jpg" },
  { name: "Kem tay RoseCare", price: 150000, img: "img/kemtay.jpg" },
];

// ------------------------------
// HIỂN THỊ SẢN PHẨM (nếu có #product-list)
// ------------------------------
const productList = document.getElementById("product-list");
if (productList) {
  products.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${p.price.toLocaleString()}đ</p>
      <button class="btn" onclick="addToCart(${i})">🛒 Thêm vào giỏ</button>
    `;
    productList.appendChild(card);
  });
}

// === BeautyShop Script (Phiên bản cho HTML tĩnh) ===

// ------------------------------
// LẤY GIỎ HÀNG TỪ LOCAL STORAGE
// ------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ------------------------------
// KHI TRANG LOAD
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  attachAddToCartButtons();
  displayCart();
});

// ------------------------------
// GẮN SỰ KIỆN "THÊM VÀO GIỎ" CHO CÁC NÚT
// ------------------------------
function attachAddToCartButtons() {
  const buttons = document.querySelectorAll("button[onclick^='addToCart']");
  buttons.forEach(button => {
    // Tự động lấy thông tin sản phẩm gần nút đó
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      const name = card.querySelector("h3").textContent;
      const priceText = card.querySelector(".price").textContent.replace(/[^\d]/g, "");
      const price = parseInt(priceText, 10);
      const img = card.querySelector("img").getAttribute("src");
      addToCart({ name, price, img });
    });
  });
}

// ------------------------------
// HÀM THÊM SẢN PHẨM VÀO GIỎ
// ------------------------------
function addToCart(product) {
  if (!product) return;

  // Kiểm tra xem sản phẩm đã có trong giỏ chưa
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
}

// ------------------------------
// HIỂN THỊ GIỎ HÀNG
// ------------------------------
function displayCart() {
  const cartDiv = document.getElementById("cartItems");
  if (!cartDiv) return;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>🛒 Giỏ hàng trống.</p>";
    return;
  }

  let total = 0;
  let html = "<table class='cart-table'><tr><th>Sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Tổng</th></tr>";

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <tr>
        <td><img src="${item.img}" alt="${item.name}" width="50"> ${item.name}</td>
        <td>${item.price.toLocaleString()}đ</td>
        <td>${item.quantity}</td>
        <td>${itemTotal.toLocaleString()}đ</td>
      </tr>
    `;
  });

  html += `</table><p><strong>Tổng cộng:</strong> ${total.toLocaleString()}đ</p>`;
  html += `
    <div class="cart-actions">
      <button onclick="clearCart()">🧹 Xóa giỏ hàng</button>
      <button onclick="checkout()">💳 Thanh toán</button>
    </div>
  `;
  cartDiv.innerHTML = html;
}

// ------------------------------
// CẬP NHẬT SỐ LƯỢNG HIỂN THỊ TRÊN HEADER
// ------------------------------
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

// ------------------------------
// XÓA TOÀN BỘ GIỎ
// ------------------------------
function clearCart() {
  if (confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng không?")) {
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
    displayCart();
  }
}

// ------------------------------
// THANH TOÁN
// ------------------------------
function checkout() {
  if (cart.length === 0) {
    alert("🛒 Giỏ hàng trống, vui lòng thêm sản phẩm trước khi thanh toán!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`💖 Cảm ơn bạn đã thanh toán ${total.toLocaleString()}đ! Đơn hàng đang được xử lý.`);

  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  displayCart();
}

// ------------------------------
// XEM CHI TIẾT SẢN PHẨM
// ------------------------------
function viewDetail(name, price) {
  alert(`🔍 ${name}\nGiá: ${price}\nChi tiết sản phẩm đang được cập nhật.`);
}
