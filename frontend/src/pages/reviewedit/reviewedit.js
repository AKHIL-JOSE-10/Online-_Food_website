import { useState,useParams } from "react"
import axios from "axios"
export default function Reviewedit() {

    const [review,setReview] = useState("")
    const id =useParams()
    const handlereview =async(e) =>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}review/editreview/${id}`)
    }
    return (
        <div className="update">
            <form onSubmit={handlereview}>
                <h2>Edit Review</h2>
                <div>
                    <input type="text"  placeholder="update Review.." onChange={(e) => setReview(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-standard">Update</button>
            </form>
        </div>
    )
}