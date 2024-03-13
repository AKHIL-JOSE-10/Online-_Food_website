import { useEffect, useState } from "react";
import axios from "axios";

export default function Stock() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('https://online-food-website.onrender.com/getALLFoods')
      .then((res) => {
        const updatedFoods = res.data.map((food) => ({
          ...food,
          disabled: {
            addToStock: food.stock,
            removeFromStock: !food.stock,
          },
        }));
        setFoods(updatedFoods);
        setLoading(false)

      })
      .catch((err) => {
        console.log("Can't get food items to frontend", err);
      });
  }, []);

  const HandleAdd = (id) => {
    const updatedFoods = foods.map((food) =>
      food._id === id ? { ...food, disabled: { addToStock: true, removeFromStock: false } } : food
    );

    setFoods(updatedFoods);

    axios.put("https://online-food-website.onrender.com/stock/UpdateStock/" + id, { stock: true })
      .then((result) => alert("Successfully Added to Stock"))
      .catch(err => alert("Error"));
  };

  const HandleRemove = (id) => {
    const updatedFoods = foods.map((food) =>
      food._id === id ? { ...food, disabled: { addToStock: false, removeFromStock: true } } : food
    );

    setFoods(updatedFoods);

    axios.put("https://online-food-website.onrender.com/stock/UpdateStock/" + id, { stock: false })
      .then((result) => alert("Successfully Removed from Stock"))
      .catch(err => alert(err));
  };

  return (
    <div style={{marginTop:"90px"}}>
      {
         loading ?   <div className="spinner-border m-5" role="status">
         <span className="visually-hidden">Loading...</span>
       </div> :
         <div className="container mt-4">
         <table className="table table-bordered" style={{ border: "3px solid black",marginTop:'120px',marginBottom:'50px' }}>
           <thead>
             <tr>
               <th scope="col">Food Name</th>
               <th scope="col">Action</th>
             </tr>
           </thead>
           <tbody>
             {foods.map((food) => (
               <tr key={food._id}>
                 <td><b>{food.name}</b> {<img src={`https://online-food-website.onrender.com/images/${food.image}`} alt="" style={{ height: '80px', width: '80px', borderRadius: "50%", boxShadow: "2px 2px 5px #888" }}/>}</td>
                 <td>
                   <button
                     className={`btn btn-success mb-1 ${food.disabled.addToStock ? 'disabled' : ''}`}
                     onClick={() => HandleAdd(food._id)}
                     disabled={food.disabled.addToStock}
                   >
                     Add to Stock
                   </button>
                   {"  "}<button
                     className={`btn btn-danger ${food.disabled.removeFromStock ? 'disabled' : ''}`}
                     onClick={() => HandleRemove(food._id)}
                     disabled={food.disabled.removeFromStock}
                   >
                     Remove from Stock
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
      }
    </div>
  
  );
}
