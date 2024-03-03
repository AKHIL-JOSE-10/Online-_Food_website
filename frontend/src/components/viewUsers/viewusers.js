import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './viewuser.css'; 

export default function ViewUsers() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}GetUser/all`)
            .then((result) => {
                console.log(result.data);
                const filteredList = result.data.filter(user => !user.isAdmin);
                setList(filteredList);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="view-users-container">
            <h2 className="view-users-title">User Details</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col" style={{ width: '100px' }}>Wallet</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.wallet + " Rs"}</td>
                                <td>
                                    <Link to={`/Update/${user._id}`} className='btn btn-success action-btn'>Update</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}