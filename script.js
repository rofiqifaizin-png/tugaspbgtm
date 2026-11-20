const form = document.getElementById("formDaftar");
const pesanSukses = document.getElementById("pesanSukses");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Setiap validator mengembalikan pesan error, atau "" jika valid
const validators = {
  nama: (v) => (v.trim().length < 3 ? "Nama lengkap minimal 3 karakter." : ""),
  email: (v) => (!emailRegex.test(v.trim()) ? "Format email tidak valid (contoh: nama@email.com)." : ""),
  password: (v) => (v.length < 8 ? "Password minimal 8 karakter." : ""),
  konfirmasi: (v) => {
    if (v === "") return "Konfirmasi password wajib diisi.";
    return v !== document.getElementById("password").value ? "Konfirmasi password tidak sama." : "";
  },
  ekskul: (v) => (v === "" ? "Silakan pilih ekstrakurikuler." : ""),
};

function validateField(id) {
  const input = document.getElementById(id);
  const wrapper = input.closest(".field");
  const msg = validators[id](input.value);
  document.getElementById(id + "Error").textContent = msg;
  wrapper.classList.toggle("invalid", msg !== "");
  wrapper.classList.toggle("valid", msg === "");
  return msg === "";
}

// Validasi real-time
Object.keys(validators).forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener(id === "ekskul" ? "change" : "input", () => {
    validateField(id);
    // Jika password berubah, cek ulang konfirmasi (bila sudah diisi)
    if (id === "password" && document.getElementById("konfirmasi").value !== "") {
      validateField("konfirmasi");
    }
  });
});

// Validasi saat submit
form.addEventListener("submit", (event) => {
  event.preventDefault(); // cegah reload halaman
  pesanSukses.hidden = true;

  const semuaValid = Object.keys(validators).map(validateField).every(Boolean);

  if (semuaValid) {
    pesanSukses.textContent = "Pendaftaran Berhasil! Selamat bergabung, " + document.getElementById("nama").value.trim() + ".";
    pesanSukses.hidden = false;
    form.reset();
    document.querySelectorAll(".field").forEach((f) => f.classList.remove("valid", "invalid"));
  }
});
