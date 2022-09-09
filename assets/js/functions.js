function formatRupiah(angka, prefix) {
  var number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}
function priceCarousel(id) {
  let x = "";
  $.ajax({
    type: "GET",
    url: "https://api.jsonbin.io/v3/b/63186a1ca1610e638621aaa0",
    dataType: "json",
    headers: {
      "X-Master-Key":
        "$2b$10$FpeMxexSYt4cdhMFpCeg7uPCwjK8EKXeB0fG47Kcuqa0rf4Dy.Ds6",
    },
    success: function (result) {
      let data = result.record[id];
      x +=
        `
        <div
          class='owl-carousel owl-theme owl-loaded filter-content price-filter-content mb-4 mt-4 active'
          id=` +
        id +
        `
        >
        <div class='owl-stage-outer'>
          <div class='owl-stage'>
      `;
      for (var i = 0; i < data.length; i++) {
        let disc_up = 200 / 100;
        let price_disc_up =
          parseFloat(data[i].first_price) +
          parseFloat(data[i].first_price) * disc_up;
        let total_disc = Math.ceil(
          (price_disc_up * parseFloat(data[i].disc)) / 100
        );
        let estimate = disc_up - total_disc;
        x += `<div class='owl-item'>`;
        if (data[i].tags === 'hot') {
          x += `
              <div class='bg-danger py-3 text-center'>
                <h3 class='font-weight-bold text-white p-0 m-0'>
                  <ion-icon name="flame-outline"></ion-icon>
                  HOT
                </h3>
              </div>
            `;
        }
        x +=
          `<div class='card text-center py-3 px-4'>
                <div class='d-flex flex-column p-3 mb-3'>
                  <h3 class='font-weight-bold'>` +
          data[i].title +
          `</h3>
                  <small
                    >` +
          data[i].sub_title +
          `</small
                  >
                </div>
                <div class='d-flex flex-column mt-5'>
                  <div>
                    <small>
                      <s>Rp ` +
          formatRupiah(total_disc.toString()) +
          `</s>
                    </small>
                    <span class='badge badge-primary py-2 px-3 rounded-30'
                      >Diskon ` +
          data[i].disc +
          `%</span
                    >
                  </div>
                  <small class='mt-3'>Estimasi DP</small>
                  <div class='d-flex justify-content-center'>
                    <small class='font-weight-bold'>Rp</small>
                    <h4 class='font-weight-bold f-48'>` +
          formatRupiah(data[i].first_price) +
          `</h4>
                  </div>
                  <a
                    href='https://wa.me/+6282234354455?text=Haloo,%20Saya%20Mau%20Bertanya%20Soal%20`+ data[i].title +`?'
                    class='btn btn-primary mt-4 py-2 px-3 rounded-30 text-light'
                    target='_blank'
                    >Order Now
                  </a>
                  <div class='d-flex flex-column align-items-center'>`;
        for (let j = 0; j < data[i].benefits.length; j++) {
          x +=
            `
                    <div class='d-flex mt-4'>
                      <ion-icon name='checkmark-outline'></ion-icon>
                      <p class='p-0 m-0 ml-2'>` +
            data[i].benefits[j] +
            `</p>
                    </div>
                    `;
        }
        x += `
                  </div>
                </div>
              </div>
            </div>
          `;
      }
      x += `
          </div>
        </div>
      </div>
      `;
      $("#content_price").html(x);
      $("#" + id).owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          600: {
            items: 2,
            nav: false,
          },
          1000: {
            items: 3,
            nav: true,
            loop: false,
          },
        },
      });
    },
  });
}
