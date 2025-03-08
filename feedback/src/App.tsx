/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FaStar } from "react-icons/fa";

function CustomerFeedback() {
  // State to manage feedback ratings and comments
  const [feedback, setFeedback] = useState({
    customerService: 0,
    businessService: 0,
    authensity: 0,
    significance: 0,
    upToDate: 0,
    overallExperience: 0,
    comments: "",
    purpose: ""
  });

  // State to manage additional ratings (if needed)
  const [ratings, setRatings] = useState({
    service: 3,
    cleanliness: 3,
    value: 3,
  });

  // State to manage submission status
  const [submitted, setSubmitted] = useState(false);

  // Function to handle rating changes
  const handleRating = (field: string, value: number | string) => {
    setFeedback({ ...feedback, [field]: value });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const response = await fetch("https://api.example.com/submit-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ratings, feedback })
    });

    if (response.ok) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Navigation bar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-700">VerziBiz</h1>
        <div className="flex space-x-6">
          <a href="#categories" className="text-gray-700 hover:text-purple-700">Categories</a>
          <a href="#success-stories" className="text-gray-700 hover:text-purple-700">Success Stories</a>
          <a href="#pricing" className="text-gray-700 hover:text-purple-700">Pricing</a>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-purple-700">Sign In</button>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800">Get Started</button>
        </div>
      </nav>

      {/* Main content */}
      <h1 className="text-3xl font-bold text-purple-700 mb-6 mt-4">VerziBiz Customer Feedback</h1>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">Rate Our Services</h2>
        {[
          "customerService",
          "businessService",
          "authensity",
          "significance",
          "upToDate",
        ].map((service) => (
          <div key={service} className="mb-4">
            <p className="text-gray-700 capitalize">{service.replace(/([A-Z])/g, " $1").trim()}:</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={
                    feedback[service] >= star ? "text-yellow-400" : "text-gray-300"
                  }
                  onClick={() => handleRating(service, star)}
                />
              ))}
            </div>
          </div>
        ))}
        
        <h2 className="text-xl font-bold mb-4 mt-6">Overall Experience</h2>
        <input
          type="range"
          min="1"
          max="10"
          value={feedback.overallExperience}
          onChange={(e) => handleRating("overallExperience", Number(e.target.value))}
          className="w-full"
        />
        <p className="text-gray-700 text-center">{feedback.overallExperience} / 10</p>
        
        <h2 className="text-xl font-bold mb-4 mt-6">Additional Feedback</h2>
        <textarea
          placeholder="Tell us about your experience..."
          className="w-full p-2 border rounded-lg"
          value={feedback.comments}
          onChange={(e) => handleRating("comments", e.target.value)}
        ></textarea>
        
        <h2 className="text-xl font-bold mb-4 mt-6">Purpose of Visit</h2>
        <input
          type="text"
          placeholder="e.g., business, leisure"
          className="w-full p-2 border rounded-lg"
          value={feedback.purpose}
          onChange={(e) => handleRating("purpose", e.target.value)}
        />
        {submitted ? (
          <div className="text-center p-4">
            <p className="text-xl text-green-600">Thank you for your feedback! 😊</p>
            <button onClick={() => setSubmitted(false)} className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800">Back to App</button>
          </div>
        ) : (
          <div>
            <button onClick={handleSubmit} className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 pointer">Submit Feedback</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerFeedback;