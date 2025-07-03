// Penyesuaian:
// - Hapus pilihan 'Lainnya' dari jenis kopi
// - Kafein dihitung otomatis: Arabica = default * shot, Robusta = default * 2 * shot
// - Input kafein per shot dihapus dan tidak bisa dikustom
// - Milk Chocolate dihapus dari daftar
// - Tambahkan kembali fitur "Tambah Sendiri"

function ambilNamaDariURL() {
  const params = new URLSearchParams(window.location.search);
  const nama = params.get("nama");
  if (nama) {
    document.getElementById("halo-user").textContent = "Halo " + nama + "!";
  }
}

const daftarMinuman = [
  {
    name: "Vietnamese Coffee",
    img: "IMAGE/vietnamese-coffee.png",
    caffeine: 98,
  },
  {
    name: "Espresso Single Shot",
    img: "IMAGE/espresso-shot.jpg",
    caffeine: 112,
  },
  {
    name: "Espresso Based Drink",
    img: "IMAGE/Cappuccino(1).jpg",
    caffeine: 112,
  },
  {
    name: "Espresso Based Drink",
    img: "IMAGE/Cappuccino(1).jpg",
    caffeine: 112,
  },
  {
    name: "Espresso Based Drink",
    img: "IMAGE/Cappuccino(1).jpg",
    caffeine: 112,
  },
  {
    name: "Espresso Based Drink",
    img: "IMAGE/Cappuccino(1).jpg",
    caffeine: 112,
  },
  {
    name: "Espresso Based Drink",
    img: "IMAGE/Cappuccino(1).jpg",
    caffeine: 112,
  },
];

function tampilkanDaftarMinuman() {
  let cards = document.getElementsByClassName("cards")[0];
  let innerCard = "";
  for (let i = 0; i < daftarMinuman.length; i++) {
    let { name, img, caffeine } = daftarMinuman[i];
    innerCard += `
    <div class="card">
      <div class="cardIMG">
        <img src="${img}" alt="">
      </div>
      <div class="card-text">
        <span>${name}</span>
        <p>${caffeine} mg</p>
      </div>
      <div class="button-container">
        <button class="card-button" onclick="summary('${name}', ${caffeine}), scrollToForm()">Tambah</button>
      </div>
    </div>
  `;
  }
  cards.innerHTML = innerCard;
}

let totalCaffeine = 0;
let daftarRiwayatMinuman = [];

function summary(name, caffeine) {
  let found = false;
  totalCaffeine += caffeine;
  if (daftarRiwayatMinuman.length === 0) {
    daftarRiwayatMinuman.push({ name: name, caffeine: caffeine, totalCup: 1 });
  } else {
    for (let i = 0; i < daftarRiwayatMinuman.length; i++) {
      if (daftarRiwayatMinuman[i].name === name) {
        daftarRiwayatMinuman[i].totalCup++;
        found = true;
        break;
      }
    }
    if (!found) {
      daftarRiwayatMinuman.push({
        name: name,
        caffeine: caffeine,
        totalCup: 1,
      });
    }
  }
  renderSummary();
}

function renderSummary() {
  let innerSummary = ``;
  const summaryText = document.getElementsByClassName("result-card")[0];

  innerSummary += `
  <p id="farhan" >Daily Summary</p>
  <p id="text-kiri">Riwayat minuman: </p>
  <ul id="list-riwayat"></ul>
  <p id = "Total-konsumsi">Total konsumsi kafein = ${totalCaffeine} mg</p>
`;
  summaryText.innerHTML = innerSummary;

  const listRiwayat = document.getElementById("list-riwayat");
  for (let i = 0; i < daftarRiwayatMinuman.length; i++) {
    const addList = document.createElement("li");
    let { name, caffeine, totalCup } = daftarRiwayatMinuman[i];

    addList.innerHTML = `${totalCup} ${name} dengan kandungan kafein ${
      caffeine * totalCup
    } mg
    <button class="delete-button" onclick="deleteItem('${name}', ${caffeine}, ${totalCup})">-</button>`;
    listRiwayat.appendChild(addList);
  }

  if (totalCaffeine > 400) {
    summaryText.innerHTML += `
    <p id="saran">Anda telah mengonsumsi kafein harian melebihi batas aman. Jika mengalami gejala seperti jantung berdebar atau sulit tidur, segera periksakan diri.</p>
    `;
  } else if (totalCaffeine >= 300) {
    summaryText.innerHTML += `
    <p id="saran">Konsumsi kafein Anda mendekati batas aman harian. Sebaiknya hindari menambah asupan, terutama jika mendekati malam, agar tidak mengganggu tidur dan ritme biologis.</p>
    `;
  } else if (totalCaffeine > 200) {
    summaryText.innerHTML += `
    <p id="saran">Konsumsi kafein Anda masih dalam batas sehat. Jaga jeda antara minuman dan pastikan tidak bergantung secara berlebihan.</p>
    `;
  } else {
    summaryText.innerHTML += `
    <p id="saran">Anda hanya mengonsumsi sedikit kafein hari ini. Jika butuh tambahan energi, boleh pertimbangkan 1 porsi lagi, tetapi tetap perhatikan waktu agar tidak mengganggu tidur.</p>
    `;
  }
}

function deleteItem(name, caffeine) {
  for (let i = 0; i < daftarRiwayatMinuman.length; i++) {
    if (name === daftarRiwayatMinuman[i].name) {
      if (daftarRiwayatMinuman[i].totalCup > 0) {
        daftarRiwayatMinuman[i].totalCup--;
        totalCaffeine -= caffeine;
        if (daftarRiwayatMinuman[i].totalCup === 0) {
          daftarRiwayatMinuman.splice(i, 1);
        }
      }
    }
  }
  console.log(daftarRiwayatMinuman);
  renderSummary();
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
        <label>Total Kafein:</label>
        <input type="text" class="kafein-total" value="${minuman.defaultCaffeine} mg" readonly />
      </div>
    </section>
  `;

  aktifkanCounter(detail, minuman);
  aktifkanPilihanEksklusif(detail, ".size-btn", "selected");
  aktifkanPilihanEksklusif(detail, ".temp-btn", "selected");
  aktifkanJenisKopiListener(detail, minuman);
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
        <label>Total Kafein:</label>
        <input type="text" class="kafein-total" value="80 mg" readonly />
      </div>
    </section>
  `;

  aktifkanCounter(detail, { defaultCaffeine: 70 });
  aktifkanPilihanEksklusif(detail, ".size-btn", "selected");
  aktifkanPilihanEksklusif(detail, ".temp-btn", "selected");
  aktifkanJenisKopiListener(detail, { defaultCaffeine: 70 });
}

function aktifkanCounter(container, minuman) {
  const plusBtn = container.querySelector(".plus-btn");
  const minusBtn = container.querySelector(".minus-btn");
  const countElem = container.querySelector(".shot-count");
  const jenisBtns = container.querySelectorAll(".jenis-btn");
  const totalInput = container.querySelector(".kafein-total");

  let count = 1;
  let jenis = "Arabica";

  function updateKafein() {
    let multiplier = jenis === "Robusta" ? 2 : 1;
    let total = minuman.defaultCaffeine * count * multiplier;
    totalInput.value = `${total} mg`;
    countElem.textContent = count;
  }

  plusBtn.addEventListener("click", () => {
    count++;
    updateKafein();
  });

  minusBtn.addEventListener("click", () => {
    if (count > 1) count--;
    updateKafein();
  });

  jenisBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      jenisBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      jenis = btn.textContent;
      updateKafein();
    });
  });

  updateKafein();
}

function aktifkanPilihanEksklusif(container, selector, activeClass) {
  const buttons = container.querySelectorAll(selector);
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove(activeClass));
      btn.classList.add(activeClass);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  ambilNamaDariURL();
  tampilkanDaftarMinuman();
});
