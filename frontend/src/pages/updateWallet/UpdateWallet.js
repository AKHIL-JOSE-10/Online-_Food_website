import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './updateWallet.css';

export default function Update() {
   
    const [wallet, setWallet] = useState(''); 
    const [initialWallet, setInitialWallet] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://online-food-website.onrender.com/GetUpdateUser/users/${id}`)
            .then((response) => {
                setWallet(response.data.wallet);
                setInitialWallet(response.data.wallet); 
            })
            .catch((err) => console.log("Error fetching user data:", err));
    }, [id]);

    const handleSubmit = (e, operation) => {
        e.preventDefault();
    
        // Check if wallet is a valid number
        const walletValue = parseInt(wallet);
        if (isNaN(walletValue)) {
            alert("Please enter a valid number for the wallet.");
            return;
        }

        let updatedWallet;

        if (operation === "add") {
            updatedWallet = walletValue + parseInt(initialWallet);
        } else if (operation === "subtract") {
            if((parseInt(initialWallet) - walletValue)<0)
            {alert("cannot Update wallet amount will be negative")
            return;}

        else{ updatedWallet = parseInt(initialWallet) - walletValue;}   
        }
    
        axios.put(`${process.env.REACT_APP_BACKEND_URL}update/users/${id}`, { wallet: updatedWallet })
            .then((response) => {
                alert(response.data.message);
                navigate('/Viewusers');
            })
            .catch((err) => console.log("Error updating user:", err));
    };

    return (
        <div className="update">
            <form onSubmit={(e) => handleSubmit(e, "add")}>
                <h2>Add to Wallet</h2>
                <div>
                    <label htmlFor="wallet"><b>Amount:</b></label>
                    <input type="text" id="wallet" placeholder="Enter amount" onChange={(e) => setWallet(e.target.value)} />
                </div>
                <button type="submit">Add</button>
            </form>

            <form onSubmit={(e) => handleSubmit(e, "subtract")}>
                <h2>Subtract from Wallet</h2>
                <div>
                    <label htmlFor="wallet"><b>Amount:</b></label>
                    <input type="text" id="wallet" placeholder="Enter amount" onChange={(e) => setWallet(e.target.value)} />
                </div>
                <button type="submit">Subtract</button>
            </form>
        </div>
    );
}
