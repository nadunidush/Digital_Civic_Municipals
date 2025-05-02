import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import {useNavigate  } from 'react-router-dom';
import LeaderNavBar from "../team_leaders_components/leader_navbar";

function CreateReport() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        complaintTitle: "",
        complaintDesc: "",
        complaintStatus: "Pending", // Default option
        department: "",
        complaintImages: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, complaintImages: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("complaintTitle", formData.complaintTitle);
        data.append("complaintDesc", formData.complaintDesc);
        data.append("complaintStatus", formData.complaintStatus);
        data.append("department", formData.department);

        for (let i = 0; i < formData.complaintImages.length; i++) {
            data.append("complaintImages", formData.complaintImages[i]);
        }

        try {
            const response = await axios.post('http://localhost:8080/create-report', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            navigate('/allcomplaintleader');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create report.');
        }
    };

    return (
        <>
            <div className="flex flex-row ml-4">
                <LeaderNavBar />
                <div className="w-0.5 bg-gray-500 h-vh ml-10 mr-5"></div>
                <div>
                    <h1 className="font-bold text-2xl mt-5 text-orange-700 mb-5">Report Creation</h1>

                    {/* Create Report Form */}
                    <form className="w-150 border border-dashed border-2 border-gray-400 rounded-lg p-5 mb-5" onSubmit={handleSubmit}>

                        {/* Complaint Title */}
                        <div className="flex flex-row items-center mb-6">
                            <div className="w-80">
                                <label className="text-black font-bold text-right mb-1 mb-0 pr-4" htmlFor="complaint_title">
                                    Complaint Title
                                </label>
                            </div>
                            <div className="w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-darkOrange"
                                    id="complaint_title"
                                    name="complaintTitle"
                                    type="text"
                                    placeholder="Enter Complaint Title"
                                    value={formData.complaintTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Complaint Description */}
                        <div className="flex flex-row items-center mb-6">
                            <div className="w-80">
                                <label className="text-black font-bold text-right mb-1 mb-0 pr-4" htmlFor="complaint_description">
                                    Complaint Description
                                </label>
                            </div>
                            <div className="w-2/3">
                                <textarea
                                    className="block bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-darkOrange"
                                    id="complaint_description"
                                    name="complaintDesc"
                                    placeholder="Write complaint description"
                                    value={formData.complaintDesc}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Complaint Images */}
                        <div className="flex flex-row items-center mb-6">
                            <div className="w-80">
                                <label className="text-black font-bold text-right mb-1 mb-0 pr-4" htmlFor="complaint_images">
                                    Complaint Images
                                </label>
                            </div>
                            <div className="w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-darkOrange"
                                    id="complaint_images"
                                    name="complaintImages"
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-300 mt-2" id="file_input_help">
                                    Pending, Inprogress, Completed (Upload 3 images each)
                                </p>
                            </div>
                        </div>

                        {/* Complaint Status */}
                        <div className="flex flex-row items-center mb-6 mt-5">
                            <div className="w-80">
                                <label className="text-black font-bold text-right mb-1 mb-0 pr-4" htmlFor="complaint_status">
                                    Complaint Status
                                </label>
                            </div>
                            <div className="inline-block relative w-2/3">
                                <select
                                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    id="complaint_status"
                                    name="complaintStatus"
                                    value={formData.complaintStatus}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Pending</option>
                                    <option>Inprogress</option>
                                    <option>Completed</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Department */}
                        <div className="flex flex-row items-center mb-6">
                            <div className="w-80">
                                <label className="text-black font-bold text-right mb-1 mb-0 pr-4" htmlFor="department">
                                    Department
                                </label>
                            </div>
                            <div className="w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-darkOrange"
                                    id="department"
                                    name="department"
                                    type="text"
                                    placeholder="Enter Department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center">
                            <div className="w-2/3">
                                <button
                                    className="shadow bg-darkOrange hover:bg-orange-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateReport;
