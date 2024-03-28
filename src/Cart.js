import React, { useState, useEffect } from 'react';
import './Cart.css';
import PubSub from 'pubsub-js';

function Cart() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Carrega os itens do carrinho do localStorage ao inicializar o componente
        const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
        setItems(storedItems);

        // Assina o evento 'addToCart' para adicionar itens ao carrinho
        const token = PubSub.subscribe('addToCart', (msg, product) => {
            setItems(prevItems => {
                const existingItem = prevItems.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                    return [...prevItems];
                } else {
                    return [...prevItems, { ...product, quantity: 1 }];
                }
            });
        });

        // Retorna uma função de limpeza para remover a assinatura do evento
        return () => {
            PubSub.unsubscribe(token);
        };
    }, []);

    // Atualiza o localStorage sempre que houver alterações nos itens do carrinho
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const calculateTotal = () => {
        let total = 0;
        items.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    };

    const handleClearCart = () => {
        localStorage.removeItem('cart');
        setItems([]);
    };

    return (
        <div className="side-checkout">
            <h2>Your order</h2>
            <table className='table-checkout'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="2"><span className='total'>Total:</span> </td>
                        <td>${calculateTotal().toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <div className='total'>
                <button className='clear-cart-button' onClick={handleClearCart}>Clear Cart</button>
            </div>
            <div className="total">
            <a href="/checkout" className='checkout-button'>Finalize Checkout</a>
            </div>
            
        </div>
    );
}

export default Cart;
