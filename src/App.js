import React, { useState } from 'react';
import  Parcel from 'single-spa-react/parcel'

const App = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 15, quantity: 1 },
        { id: 3, name: 'Item 3', price: 5, quantity: 3 },
    ]);

    const calculateTotal = () => {
        let total = 0;
        items.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    };

    return (
        <>
            <div>
                <h1>Shopping Cart</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total: {calculateTotal()}</p>
            </div>
            <div>
                <Parcel config={() => System.import('@experian/exp-checkout-mf')} />
            </div>
        </>
    );
};

export default App;