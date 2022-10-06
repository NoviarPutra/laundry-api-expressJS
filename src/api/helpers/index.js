const pdfkit = require("pdfkit");

function generateCommonHeader(doc, title) {
  doc
    .font("Helvetica-Bold")
    .fillColor("#444444")
    .fontSize(30)
    .text(title, 40, 40, { align: "center" })
    .moveDown();
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(0, 80)
    .lineTo(1000, 80)
    .stroke();
}

function generateTableRowLaporanTransaksi(
  doc,
  y,
  tanggal,
  nomorHP,
  totalHarga
) {
  doc
    .fontSize(10)
    .text(tanggal, 50, y)
    .text(nomorHP, 150, y)
    .text(totalHarga, 250, y, {
      width: 90,
      align: "right",
    });
}

function generateTableLaporanTransaksiUser(doc, faktur) {
  let i;
  let count = 0;
  const invoiceTableTop = 150;
  doc.font("Helvetica-Bold");

  generateTableRowLaporanTransaksi(
    doc,
    invoiceTableTop,
    "Tanggal",
    "Pelanggan",
    "Jumlah transaksi"
  );

  generateHr(doc, invoiceTableTop + 20);

  doc.font("Helvetica");
  for (i = 0; i < faktur.length; i++) {
    const data = faktur[i];
    const position = invoiceTableTop + (i + 1) * 30;
    count += data.total;
    generateTableRowLaporanTransaksi(
      doc,
      position,
      `${data._id.tanggal}-${data._id.bulan}-${data._id.tahun}`,
      data._id.nomorHP,
      data.total
    );
    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  doc.font("Helvetica-Bold");
  generateTableRowLaporanTransaksi(
    doc,
    subtotalPosition,
    "Total transaksi",
    count
  );
}

function generateTableLaporanTransaksi(doc, faktur) {
  let i;
  let count = 0;
  const invoiceTableTop = 150;
  doc.font("Helvetica-Bold");

  generateTableRowLaporanTransaksi(
    doc,
    invoiceTableTop,
    "Tanggal",
    "Pelanggan",
    "Total Harga"
  );

  generateHr(doc, invoiceTableTop + 20);

  doc.font("Helvetica");
  for (i = 0; i < faktur.length; i++) {
    const data = faktur[i];
    const position = invoiceTableTop + (i + 1) * 30;
    count += data.totalHarga;
    generateTableRowLaporanTransaksi(
      doc,
      position,
      `${data._id.tanggal}-${data._id.bulan}-${data._id.tahun}`,
      data._id.nomorHP,
      data.totalHarga
    );
    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  doc.font("Helvetica-Bold");
  generateTableRowLaporanTransaksi(
    doc,
    subtotalPosition,
    "Total jumlah",
    count
  );
}

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("PT. Anugerah Mandiri.", 110, 57)
    .fontSize(10)
    .text("PT. Anugerah Mandiri.", 200, 50, { align: "right" })
    .text("Jl. Bojong Kenyot", 200, 65, { align: "right" })
    .text("Jakarta Pinggir, JakPing, 10027", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, faktur) {
  doc.fillColor("#444444").fontSize(20).text("Faktur Cucian", 50, 160);

  generateHr(doc, 185);

  const counterTop = (count, isStart) => {
    const customerInformationTop = 200;
    const jarak = 15;
    const result = isStart
      ? customerInformationTop
      : customerInformationTop + jarak * count;
    return result;
  };

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, counterTop(0, true))
    .font("Helvetica-Bold")
    .text(faktur._id, 150, counterTop(0, true))
    .font("Helvetica")
    .text("Invoice Date:", 50, counterTop(1, false))
    .text(faktur.tanggalTerima.toDateString(), 150, counterTop(1, false))
    .text("Total Harga:", 50, counterTop(2, false))
    .text(faktur.totalHarga, 150, counterTop(2, false))
    .text("Uang Muka:", 50, counterTop(3, false))
    .text(faktur.uangMuka, 150, counterTop(3, false))
    .text("Sisa:", 50, counterTop(4, false))
    .text(faktur.sisa, 150, counterTop(4, false))
    .text("Kembali:", 50, counterTop(5, false))
    .text(faktur.kembali, 150, counterTop(5, false))

    .moveDown();
  generateHr(doc, 300);
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

exports.generatePDF = (res, faktur) => {
  let doc = new pdfkit({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, faktur);
  generateInvoiceTable(doc, faktur);
  generateFooter(doc, faktur);
  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=tester.pdf",
      })
      .end(pdfData);
  });

  doc.end();
};

function generateTableRow(doc, y, nama, jumlah) {
  doc.fontSize(10).text(nama, 50, y).text(jumlah, 150, y, {
    width: 90,
    align: "right",
  });
}

function generateInvoiceTable(doc, faktur) {
  let i;
  let count = 0;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(doc, invoiceTableTop, "Nama", "Jumlah");
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");
  // 2
  for (i = 0; i < faktur.daftarBarang.length; i++) {
    const barang = faktur.daftarBarang[i];
    const position = invoiceTableTop + (i + 1) * 30;
    count += barang.jumlah;
    generateTableRow(doc, position, barang.nama, barang.jumlah);
    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  doc.font("Helvetica-Bold");
  generateTableRow(doc, subtotalPosition, "Total jumlah", count);

  // const paidToDatePosition = subtotalPosition + 20;
  // generateTableRow(
  //   doc,
  //   paidToDatePosition,
  //   "",
  //   "",
  //   "Paid To Date",
  //   "",
  //   formatCurrency(invoice.paid)
  // );

  // const duePosition = paidToDatePosition + 25;
  // doc.font("Helvetica-Bold");
  // generateTableRow(
  //   doc,
  //   duePosition,
  //   "",
  //   "",
  //   "Balance Due",
  //   "",
  //   formatCurrency(invoice.subtotal - invoice.paid)
  // );
  // doc.font("Helvetica");
}

function generateFooter(doc, faktur) {
  doc
    .fontSize(10)
    .text(
      faktur.sisa === 0
        ? `Terimakasih, senang berbisnis dengan anda`
        : `Batas pembayaran sisa sebesar Rp. ${faktur.sisa} harus segara dilunasi.`,
      50,
      580,
      { align: "center", width: 500 }
    );
}

module.exports = {
  handleId: (req, res) => {
    let id = req.params.id;
    if (!id) {
      res.status(404).json({ message: "Resource tidak tersedia!" });
    } else {
      return id;
    }
  },
  getNomorTerima: (req) => {
    return req.params.nomorterima;
  },
  getTotalHarga: (req) => {
    return req.body.berat * 10000;
  },
  getSisa: (req) => {
    if (req.body.uangMuka < req.body.totalHarga) {
      return req.body.totalHarga - req.body.uangMuka;
    } else {
      return 0;
    }
  },
  getKembali: (req) => {
    if (req.body.uangMuka > req.body.totalHarga) {
      return req.body.uangMuka - req.body.totalHarga;
    } else {
      return 0;
    }
  },
  getUser: (req) => {
    return {
      username: req.user.username,
      email: req.user.email,
    };
  },
  laporanTransaksiPelanggan: (res, faktur) => {
    try {
      let doc = new pdfkit({ size: "A4", margin: 10 });
      generateCommonHeader(doc, "Laporan Transaksi Pelanggan");
      generateTableLaporanTransaksiUser(doc, faktur);
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on(
        "end",
        () => {
          let pdfData = Buffer.concat(buffers);
          res
            .writeHead(200, {
              "Content-Length": Buffer.byteLength(pdfData),
              "Content-Type": "application/pdf",
              "Content-disposition": `attachment;filename=laporan-transaksi-pelanggan.pdf`,
            })
            .end(pdfData);
        },
        (err) => console.log(err)
      );

      doc.end();
    } catch (err) {
      console.log(err);
    }
  },
  laporanTransaksiCucian: (res, faktur) => {
    try {
      let doc = new pdfkit({ size: "A4", margin: 10 });
      generateCommonHeader(doc, "Laporan Transaksi Laundry");
      generateTableLaporanTransaksi(doc, faktur);
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on(
        "end",
        () => {
          let pdfData = Buffer.concat(buffers);
          res
            .writeHead(200, {
              "Content-Length": Buffer.byteLength(pdfData),
              "Content-Type": "application/pdf",
              "Content-disposition": `attachment;filename=laporan-transaksi.pdf`,
            })
            .end(pdfData);
        },
        (err) => console.log(err)
      );

      doc.end();
    } catch (err) {
      console.log(err);
    }
  },
};
