document.addEventListener('DOMContentLoaded', function() {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            const productContainer = document.querySelector('.products');
            if (productContainer) {
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>$${product.price}</p>
                        <button onclick="addToBasket(${product.id})">Add to Basket</button>
                    `;
                    productContainer.appendChild(productDiv);
                });
            }

            const hoodiesContainer = document.querySelector('.products.hoodies');
            const tshirtsContainer = document.querySelector('.products.tshirts');
            const othersContainer = document.querySelector('.products.others');
            
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <button onclick="addToBasket(${product.id})">Add to Basket</button>
                `;
                
                if (product.category === 'hoodies' && hoodiesContainer) {
                    hoodiesContainer.appendChild(productDiv);
                } else if (product.category === 'tshirts' && tshirtsContainer) {
                    tshirtsContainer.appendChild(productDiv);
                } else if (product.category === 'others' && othersContainer) {
                    othersContainer.appendChild(productDiv);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing products:', error);
        });

    // PayPal Buttons
    if (document.getElementById('paypal-button-container')) {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '0.01' // Replace with basket total
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                    window.location.href = 'thank-you.html';
                });
            }
        }).render('#paypal-button-container');
    }

    // Ticket form submission
    const ticketForm = document.getElementById('ticket-form');
    if (ticketForm) {
        ticketForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const issue = document.getElementById('issue').value;

            fetch('https://discord.com/api/webhooks/1244423908157948037/o_mz-YqpPhYl3zFq5tbwLQGyZTS-J3kM6PbkDGcK94WgBqbFSSeRkP8krCo19ij3vlxG', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `New support ticket: ${issue}`,
                }),
            }).then(() => {
                alert('Ticket submitted');
                ticketForm.reset();
            }).catch(error => {
                console.error('Error submitting ticket:', error);
            });
        });
    }
});

function addToBasket(productId) {
    // Add product to basket logic
    alert('Product added to basket');
}
