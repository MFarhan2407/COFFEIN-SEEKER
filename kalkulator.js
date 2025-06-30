function ambilNamaDariURL() {
  const params = new URLSearchParams(window.location.search);
  const nama = params.get("nama");
  if (nama) {
    document.getElementById("halo-user").textContent = "HALO " + nama.toUpperCase() + "!";
  }
}

const daftarMinuman = [
  { nama: "Americano", img: "img/americano.png", defaultCaffeine: 90 },
  { nama: "Cappuccino", img: "img/cappuccino.png", defaultCaffeine: 75 },
  { nama: "Cafe Mocha", img: "img/mocha.png", defaultCaffeine: 80 },
  { nama: "Cafe latte", img: "img/cafelatte.png", defaultCaffeine: 80 },
  { nama: "Milk Chocolate", img: "img/chocolate.png", defaultCaffeine: 0 }
];

function tampilkanDaftarMinuman() {
  const container = document.getElementById("minuman-list");
  container.innerHTML = "";

  daftarMinuman.forEach((minuman) => {
    const card = document.createElement("div");
    card.className = "card-menu";
    card.innerHTML = `
      <img src="${minuman.img}" alt="${minuman.nama}" />
      <p>${minuman.nama}</p>
    `;
    card.addEventListener("click", function () {
      tampilkanDetail(minuman);
    });
    container.appendChild(card);
  });

  // Tambah tombol custom
  const tambahSendiri = document.createElement("div");
  tambahSendiri.className = "card-menu";
  tambahSendiri.innerHTML = `
    <div style="font-size: 3rem; margin-top: 20px;">+</div>
    <p>Tambah Sendiri</p>
  `;
  tambahSendiri.addEventListener("click", function () {
    tampilkanFormCustom();
  });
  container.appendChild(tambahSendiri);
}

function tampilkanDetail(minuman) {
  const detail = document.getElementById("detail-section");
  detail.style.display = "block";

  detail.innerHTML = `
    <section class="kopi-detail-card">
      <img src="${minuman.img}" alt="${minuman.nama}" class="kopi-img" />
      <h3>${minuman.nama}</h3>

      <div class="opsi-group">
        <label>Ukuran:</label>
        <div class="opsi-pilihan">
          <button class="size-btn selected">Standar</button>
          <button class="size-btn">Kecil</button>
          <button class="size-btn">Besar</button>
        </div>
      </div>

      <div class="opsi-group">
        <label>Temperature:</label>
        <div class="opsi-pilihan">
          <button class="temp-btn selected">Hot</button>
          <button class="temp-btn">Ice</button>
        </div>
      </div>

      <div class="opsi-group">
        <label>Jenis Kopi:</label>
        <div class="opsi-pilihan">
          <button class="jenis-btn selected">Arabica</button>
          <button class="jenis-btn">Robusta</button>
          <button class="jenis-btn">Lainnya</button>
        </div>
      </div>

      <div class="opsi-group">
        <label>Jumlah Shot:</label>
        <div class="counter-box">
          <button class="minus-btn">-</button>
          <span class="shot-count">1</span>
          <button class="plus-btn">+</button>
        </div>
      </div>

      <div class="opsi-group">
        <label>Kafein per Shot (mg):</label>
        <input type="number" class="kafein-input" value="${minuman.defaultCaffeine}" />
      </div>
    </section>
  `;

  aktifkanCounter(detail);
  aktifkanPilihanEksklusif(detail, ".size-btn", "selected");
  aktifkanPilihanEksklusif(detail, ".temp-btn", "selected");
  aktifkanPilihanEksklusif(detail, ".jenis-btn", "selected");
}

function tampilkanFormCustom() {
  const detail = document.getElementById("detail-section");
  detail.style.display = "block";

  detail.innerHTML = `
    <section class="kopi-detail-card">
      <h3>Minuman Custom</h3>

      <div class="opsi-group">
        <label>Nama Minuman:</label>
        <input type="text" class="nama-minuman-custom" placeholder="Contoh: Kopi Tubruk" />
      </div>

      <div class="opsi-group">
        <label>Ukuran:</label>
        <div class="opsi-pilihan">
          <button class="size-btn selected">Standar</button>
          <button class="size-btn">Kecil</button>
          <button class="size-btn">Besar</button>
        </div>
      </div>

      <div class="opsi-group">
        <label>Temperature:</label>
        <div class="opsi-pilihan">
          <button class="temp-btn selected">Hot</button>
          <button class="temp-btn">Ice</button>
        </div>
      </div>

      <div class="opsi-group">
        <label>Jenis Kopi:</label>
        <div class="opsi-pilihan">
          <button class="jenis-btn selected">Arabica</button>
          <button class="jenis-btn">Robusta</button>
          <button class="jenis-btn">Lainnya</button>
        </div>
      </div>

      <div class="opsi-group">
        <label>Jumlah Shot:</label>
        <div class="counter-box">
          <button class="minus-btn">-</button>
          <span class="shot-count">1</span>
          <button class="plus-btn">+</button>
        </div>
      </div>

      <div class="opsi-group">
        <label>Kafein per Shot (mg):</label>
        <input type="number" class="kafein-input" value="80" />
      </div>
    </section>
  `;

  aktifkanCounter(detail);
  aktifkanPilihanEksklusif(detail, ".size-btn", "selected");
  aktifkanPilihanEksklusif(detail, ".temp-btn", "selected");
  aktifkanPilihanEksklusif(detail, ".jenis-btn", "selected");
}

function aktifkanCounter(container) {
  const plusBtn = container.querySelector(".plus-btn");
  const minusBtn = container.querySelector(".minus-btn");
  const count = container.querySelector(".shot-count");

  plusBtn.addEventListener("click", () => {
    count.textContent = Number(count.textContent) + 1;
  });

  minusBtn.addEventListener("click", () => {
    if (Number(count.textContent) > 1) {
      count.textContent = Number(count.textContent) - 1;
    }
  });
}

function aktifkanPilihanEksklusif(container, selector, activeClass) {
  const buttons = container.querySelectorAll(selector);
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove(activeClass));
      btn.classList.add(activeClass);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  ambilNamaDariURL();
  tampilkanDaftarMinuman();
});


