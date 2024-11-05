const readline = require("readline")
const moment = require("moment")
const datas = require("./datas")

// Helper function to determine zodiac sign
const getZodiacSign = (day, month) => {
  const zodiac = [
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
  ]
  const lastDay = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21, 19]
  return day > lastDay[month - 1] ? zodiac[month] : zodiac[month - 1]
}


const nikParse = (nik) => {
  if (!nik || typeof nik !== "string" || nik.length !== 16) {
    return {
      status: "error",
      pesan: "NIK tidak valid, panjang NIK harus 16 digit",
      data: null,
    }
  }

  const provinsi = datas.provinsi[nik.slice(0, 2)]
  const kotakab = datas.kabkot[nik.slice(0, 4)]
  const kecamatanEntry = datas.kecamatan[nik.slice(0, 6)]
  const kecamatan = kecamatanEntry ? kecamatanEntry.split(" -- ")[0] : undefined
  const kodepos = kecamatanEntry ? kecamatanEntry.split(" -- ")[1] : undefined

  const day = parseInt(nik.slice(6, 8))
  const month = parseInt(nik.slice(8, 10)) - 1
  const year =
    parseInt(nik.slice(10, 12)) +
    (parseInt(nik.slice(10, 12)) <= parseInt(moment().format("YY")) ? 2000 : 1900)

  const gender = day > 40 ? "PEREMPUAN" : "LAKI-LAKI"
  const birthDay = day > 40 ? day - 40 : day
  const birthDate = moment([year, month, birthDay])
  const zodiak = getZodiacSign(birthDay, month + 1)
  return {
    status: "success",
    pesan: "NIK valid",
    author: "DFansyah",
    data: {
      nik,
      kelamin: gender,
      lahir: birthDate.format("DD/MM/YYYY"),
      provinsi,
      kotakab,
      kecamatan,
      uniqcode: nik.slice(12),
      tambahan: {
        kodepos,
        pasaran: `undefined Wage, ${birthDate.format("DD MMMM YYYY")}`,
        usia: `${birthDate.fromNow(true)}`,
        ultah: `${birthDate.add(1, "year").fromNow(true)} Lagi`,
        zodiak,
      },
    },
  }
}

// Read input using readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question("Masukkan NIK: ", (nik) => {
  console.log(nikParse(nik))
  rl.close()
})
