document.addEventListener("DOMContentLoaded", function () {
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const quantitySpans = document.querySelectorAll('.quantity');
    const buyButtons = document.querySelectorAll('.buy');
    
    const cart = {}; 

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let quantity = parseInt(quantitySpans[index].textContent);
            if (quantity > 0) {
                quantitySpans[index].textContent = (quantity - 1).toString();
            }
        });
    });

    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let quantity = parseInt(quantitySpans[index].textContent);
            quantitySpans[index].textContent = (quantity + 1).toString();
        });
    });

    buyButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let quantity = parseInt(quantitySpans[index].textContent);
            if (quantity > 0) {
                const item = Teste;
                if (cart[item]) {
                    cart[item] += quantity;
                } else {
                    cart[item] = quantity;
                }
                
                quantitySpans[index].textContent = '0';
            }
        });
    });
});
