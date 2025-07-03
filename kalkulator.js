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
    caffeine: 75,
  },
  {
    name: "French Press",
    img: "IMAGE/frenchpress2.jpg",
    caffeine: 118.5,
  },
  {
    name: "Cold Brew",
    img: "IMAGE/coldbrew.jpg",
    caffeine: 205,
  },
  {
    name: "Instant Coffee",
    img: "IMAGE/instantcoffee.jpg",
    caffeine: 100,
  },
  {
    name: "Pour Over",
    img: "IMAGE/pourovercoffee2.jpg",
    caffeine: 125,
  },
  {
    name: "Espresso Based-Drink",
    img: "IMAGE/baseddrink.jpg",
    caffeine: 150,
  },
  {
    name: "Regular Coffe",
    img: "IMAGE/regularcoffe2.jpg",
    caffeine: 112,
  },
  {
    name: "Decaffeinated Coffee",
    img: "IMAGE/decaf.jpg",
    caffeine: 3.5,
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
  innerCard += `
  <div class="card">
    <div class="cardIMG">
      <img src="IMAGE/add-coffee.png" alt="Custom Drink" />
    </div>
    <div class="card-text">
      <input type="text" id="custom-nama" placeholder="Nama Minuman" style="margin-bottom:5px; width: 100%; padding: 4px;color: white; background-color: rgba(0, 0, 0, 0.5);" />
      <input type="number" id="custom-kafein" placeholder="mg Kafein" style="width: 100%; padding: 4px; color: white; background-color: rgba(0, 0, 0, 0.5);" />
    </div>
    <div class="button-container">
      <button class="card-button" onclick="tambahCardCustom()">Tambah</button>
    </div>
  </div>
`;
  cards.innerHTML = innerCard;
}

function tambahCardCustom() {
  const namaInput = document.getElementById("custom-nama").value.trim();
  const kafeinInput = Number(document.getElementById("custom-kafein").value);

  if (!namaInput || isNaN(kafeinInput) || kafeinInput <= 0) {
    alert("Isi nama dan kafein dengan benar.");
    return;
  }

  daftarMinuman.push({
    name: namaInput,
    img: "IMAGE/Cappuccino(1).jpg", // default image
    caffeine: kafeinInput,
  });

  tampilkanDaftarMinuman(); // render ulang
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
    alert("⚠️❗ SEBAIKNYA STOP MINUM KOPI ❗⚠️");
    summaryText.innerHTML += `
    <p id="saran"> 🛑⛔️✋🏻 Anda telah mengonsumsi kafein harian melebihi batas aman, stop minum kopi ✋🏻⛔️🛑
    <br> 🚨 Risiko: Jantung berdebar, tremor, mual, insomnia.
    <br> ‼️ Peringatan: Jika gejala muncul, segera konsultasikan ke dokter!
    </p>
    `;
  } else if (totalCaffeine >= 300) {
    alert("⚠️ Hati-hati kebanyakan ⚠️");
    summaryText.innerHTML += `
    <p id="saran">🟡 ⚠️ Konsumsi kafein Anda mendekati batas aman harian. Sebaiknya hindari menambah asupan, terutama jika mendekati malam, agar tidak mengganggu tidur dan ritme biologis ⚠️
    <br> 🚨 Risiko: Bisa mulai gelisah, susah tidur.
    <br> 📢 Saran: Sebaiknya hentikan konsumsi untuk hari ini. Perhatikan respon tubuh dan hindari aktivitas yang bisa menambah stres.
    </p>
    `;
  } else if (totalCaffeine > 120) {
    summaryText.innerHTML += `
    <p id="saran">🟢 Konsumsi kafein Anda masih dalam batas sehat. Jaga jeda antara minuman dan pastikan tidak bergantung secara berlebihan.
    <br> 📢 Saran: Tetap jaga jeda konsumsi, jangan berlebihan.
    <br> ℹ️ Tips: Imbangi dengan tidur cukup dan pola makan sehat.
    </p>
    `;
  } else if (totalCaffeine > 1) {
    summaryText.innerHTML += `
    <p id="saran">🟢 Anda baru mengonsumsi sedikit kafein hari ini. 
    <br> 📢 Saran: Boleh tambah 1-2 porsi jika butuh energi, tapi tetap perhatikan waktu konsumsi.
    </p>
    `;
  } else {
    summaryText.innerHTML += `
    <p id="saran">Anda belum mengkonsumsi kafein</p>
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
  // console.log(daftarRiwayatMinuman);
  renderSummary();
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
