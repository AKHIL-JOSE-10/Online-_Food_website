import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userimage from '../../components/images/user.webp'
import { Link } from "react-router-dom";
import axios from "axios";
import './review.css'
export const Review = () => {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [foods, setFoods] = useState({});
    const [review, setReview] = useState("");
    const [reviewDetails, setReviewDetails] = useState([]);
    const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}onefood/getALLFoods/food/${id}`)
            .then((res) => {
                setFoods(res.data);
                setReviews(res.data.Review);
            })
            .catch((err) => {
                console.log("Can't get food items to frontend", err);
            });
    }, [id]);

    const handlereview = async (e) => {
        e.preventDefault();

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}review/add/addreview/${id}`, { name: user.name, description: review })
            .then((result) => {
                alert(result.data);
                // Refresh reviews after submitting a new review
                setReview("");
                axios.get(`${process.env.REACT_APP_BACKEND_URL}onefood/getALLFoods/food/${id}`)
                    .then((res) => {
                        setReviews(res.data.Review);
                    })
                    .catch((err) => {
                        console.log("Can't get food items to frontend", err);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }

    useEffect(() => {
        const fetchReviewDetails = async () => {
            try {
                const promises = reviews.map(async (reviewId) => {
                    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}review/rev/${reviewId}`);
                    return res.data;
                });
                const reviewDetails = await Promise.all(promises);
                setReviewDetails(reviewDetails);
            } catch (error) {
                console.error("Error fetching review details:", error);
            }
        };

        fetchReviewDetails();
    }, [reviews]);


    console.log("haaaaai", reviewDetails)
    return (
        <div style={{ marginTop: "100px" }}>
            <h3 style={{ marginTop: "100px",marginBottom:"50px" }}>Reviews</h3>
            <div className="row" >
                {/* <div className="col-md-3">
                    <div className='shadow-lg p-6 mb-5 bg-body' style={{ borderRadius: "20px", border: "1px solid black" }}>
                        <h2>{foods.name}</h2>
                        <p>Price: {foods.price}</p>
                        <p>Category: {foods.category}</p>
                        <p>Description: {foods.description}</p>
                        <p>Stock: {foods.stock ? 'Available' : 'Out of stock'}</p>
                    </div>
                </div> */}
                {reviewDetails.map((reviewDetail, index) => (
                    <div key={index} className="col-md-3" >
                        <div style={{ borderRadius: "20px", border: "1px solid black", background: "lightgrey",paddingBottom:"15px" }}>
                            <p><img src={userimage} alt="" style={{ width: "60px", height: "60px", borderRadius: "80px", marginRight: "20px" }} /><b>{reviewDetail.review?.name}</b></p>
                            <p className="description">Description: <b>{reviewDetail.review?.description}</b></p>
                            <Link to={`/Reviewedit/${reviewDetail.review.id}`}>Edit</Link>
                        </div>
                       
                    </div>
                ))}
            </div>
            {user && user.isAdmin ? (
              null
            ): (
                <div>
            <input type = "text" placeholder = "write Review.." value = { review } onChange = { (e) => { setReview(e.target.value) }} />
            <button className="btn btn-standard" style={{ marginTop: "10px" }} onClick={handlereview}>Submit</button>
        </div>
    )
}
        </div >
    );

}
