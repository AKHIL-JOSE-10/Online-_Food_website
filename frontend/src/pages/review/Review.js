import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userimage from '../../components/images/user.webp';
import { Link } from "react-router-dom";
import axios from "axios";
import './review.css';

export const Review = () => {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [foods, setFoods] = useState({});
    const [review, setReview] = useState("");
    const [reviewDetails, setReviewDetails] = useState([]);
    const [userInfos, setUserInfos] = useState({});
    const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}onefood/getALLFoods/food/${id}`)
            .then((res) => {
                setFoods(res.data);
                setReviews(res.data.Review);
                setLoading(false)
            })
            .catch((err) => {
                console.log("Can't get food items to frontend", err);
            });

        // Fetch user information
        axios.get(`${process.env.REACT_APP_BACKEND_URL}GetUpdateUser/users/${user._id}`)
            .then((res) => {
                setUserInfos(res.data);
            })
            .catch((err) => {
                console.error("Error fetching user information:", err);
            });
    }, [id, user._id]);

    const handlereview = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}review/add/addreview/${id}`, { name: user.name, description: review });
            alert(response.data.message);
            setReview("");
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}onefood/getALLFoods/food/${id}`);
            setReviews(res.data.Review);
            
            // Update user.review to true
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}UpdateUser/update/users/${user._id}`, { wallet: user.wallet, review: true });
        } catch (error) {
            console.error("Error updating review:", error);
            alert("Error updating review");
        }
        window.location.reload()
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

    return (
        <div style={{marginTop:"40px"}}>
            {
                loading ?    <div className="spinner-border m-5" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> :
              <div style={{ marginTop: "100px",paddingLeft:"30px",paddingRight:"30px" }}>
              <h3 style={{ marginTop: "100px", marginBottom: "50px" }}>Reviews</h3>
              {reviewDetails.length === 0 && <p>No reviews yet!</p>}
              <div className="row">
                  {reviewDetails.map((reviewDetail, index) => (
                      <div key={index} className="col-md-3">
                          <div style={{ borderRadius: "20px", border: "1px solid black", background: "lightgrey", paddingBottom: "15px" }}>
                              <p><img src={userimage} alt="" style={{ width: "60px", height: "60px", borderRadius: "80px", marginRight: "20px" }} /><b>{reviewDetail.review?.name}</b></p>
                              <p className="description" style={{color:"red"}}>Description: <b>{reviewDetail.review?.description}</b></p>
                              <Link to={`/Reviewedit/${reviewDetail.review._id}`}>Edit</Link>
                          </div>
                      </div>
                  ))}
              </div>
              {!user.isAdmin && !userInfos.review && (
                  <div>
                      <form onSubmit={handlereview}>
                          <input required type="text" placeholder="write Review.." value={review} onChange={(e) => setReview(e.target.value)} />
                          <button className="btn btn-standard" style={{ marginTop: "10px" }} type="submit">Submit</button>
                      </form>
                  </div>
              )}
          </div>
            }
        </div>
    );
};
