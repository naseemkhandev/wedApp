import React, { useState, useEffect } from "react";
import "../settings/Style.scss";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DynamicTabs from "../settings/DynamicTabs";
import { Alert } from "@mui/material";
import BASE_URL from "../../components/BASE_URL";

const ChatSettings = () => {
	const [showTabs, setTabsVisibility] = useState(false);
	const [title, setTitle] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [chatId, setChatId] = useState(null);
	const [chatTitle, setChatTitle] = useState(null);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	useEffect(() => {
		console.log("chat id updated:", chatId);
	}, [chatId]);

	const handleSubmit = async (event) => {
		if (title.trim() === "") {
			setErrorMessage("Chat title cannot be blank");
			setShowAlert(true);
			return;
		}

		setTabsVisibility(true);
		event.preventDefault();
		const authId = localStorage.getItem("authId");
		const formData = new FormData();
		formData.append("chatTitle", title);
		formData.append("authId", authId);

		try {
			const response = await axios.post(
				`${BASE_URL}/api/auth/chattitle`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Headers": "X-Requested-With",
					},
				}
			);
			setChatId(response.data.savedPost._id.toString());
			setChatTitle(response.data.savedPost.chatTitle.toString());
			console.log("Created Chat Id Successfully", response.data);
			setTabsVisibility(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col w-10/12">
				<Navbar />
				<div className="p-6 w-50">
					<input
						type="text"
						placeholder="Add Chat title"
						id="chatTitle"
						onChange={handleTitleChange}
						className="textLayout"
						required
					/>
					<button
						type="submit"
						className="bg-purple-700 text-white p-2 mt-4"
						onClick={handleSubmit}
					>
						Submit
					</button>
					{showAlert && (
						<Alert
							severity={errorMessage ? "error" : "success"}
							onClose={() => setShowAlert(false)}
						>
							{errorMessage ? errorMessage : "Chat title cannot be blank"}
						</Alert>
					)}
				</div>
				<div>
					{showTabs && chatId && (
						<DynamicTabs chatId={chatId} chatTitle={chatTitle} />
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatSettings;
