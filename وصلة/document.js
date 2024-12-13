document.getElementById('delivery-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const distance = parseFloat(document.getElementById('distance').value);
    const pricePerKm = 5; // سعر ثابت لكل كيلومتر

    if (isNaN(distance) || distance <= 0) {
        alert('يرجى إدخال قيمة صحيحة للمسافة!');
        return;
    }

    const totalPrice = distance * pricePerKm;

    // عرض النتيجة
    document.getElementById('result').textContent =
        السعر الإجمالي: ${totalPrice.toFixed(2)} جنيه;

    // إرسال البيانات إلى الخادم لتحديث ملف Excel
    saveOrderToExcel(distance, totalPrice);
});

function saveOrderToExcel(distance, totalPrice) {
    const orderData = {
        Distance: distance,
        TotalPrice: totalPrice,
    };

    fetch('http://localhost:3000/saveOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    })
        .then((response) => {
            if (response.ok) {
                alert('تم تسجيل الطلب في Excel بنجاح!');
            } else {
                alert('حدث خطأ أثناء تسجيل الطلب.');
            }
        })
        .catch((error) => console.error('Error:', error));
}