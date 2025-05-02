import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DepNavBar from "../department_components/dep_nav_bar";
import FeedbackTile from "../department_components/feedback_tile";

function CitizenFeedback() {
    const location = useLocation();
    const { departmentName} = location.state || {};
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        if (departmentName) {
            fetch(`http://localhost:8080/citizen-feedback/${departmentName}`)
                .then(response => response.json())
                .then(data => setFeedbacks(data))
                .catch(error => console.error("Error fetching feedback:", error));
        }
    }, [departmentName]);

    return (
        <>
            <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-row ml-4">
                <DepNavBar />
                <div className="w-0.5 bg-gray-500 h-vh ml-10 mr-5"></div>
                <div>
                    <h1 className="font-bold text-2xl mt-5 mb-5">{departmentName}</h1>
                    <div className="flex flex-wrap gap-5">
                        {feedbacks.length > 0 ? (
                            feedbacks.map((feedback, index) => (
                                <FeedbackTile
                                    key={index}
                                    name={feedback.userName}
                                    email={feedback.email}
                                    profile={feedback.image}
                                    description={feedback.description}
                                />
                            ))
                        ) : (
                            <p>No feedback available for this department.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CitizenFeedback;
