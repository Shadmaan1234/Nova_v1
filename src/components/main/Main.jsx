import { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

const Main = () => {
	const {
		onSent,
		recentPrompt,
		showResults,
		loading,
		resultData,
		setInput,
		input,
	} = useContext(Context);

	const [listening, setListening] = useState(false);
	const [recognition, setRecognition] = useState(null);

	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		if (SpeechRecognition) {
			const recognition = new SpeechRecognition();
			recognition.continuous = false;
			recognition.interimResults = false;
			recognition.lang = "en-US";

			recognition.onresult = (event) => {
				const transcript = event.results[0][0].transcript;
				setInput(transcript);
				recognition.stop();
				search();
			};

			recognition.onend = () => {
				setListening(false);
			};

			setRecognition(recognition);
		}
	}, []);

	const startListening = () => {
		if (recognition) {
			recognition.start();
			setListening(true);
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault(); // Prevent default form submission behavior
			onSent();
		}
	};

	const search = () => {
		onSent();
	};

	const handleCardClick = (promptText) => {
		setInput(promptText);
	};

	const cardVariants = {
		hover: {
			scale: 1.1,
			rotate: 5,
			boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
			transition: {
				duration: 0.3,
				yoyo: Infinity,
			},
		},
	};

	return (
		<motion.div className="main">
			<div className="nav">
				<p style={{ fontSize: '30px', fontWeight: 'bold', color: '#1a73e8' }}>Gemini</p>
				<img src={assets.portfolio3} alt="" className="circular-image" />
			</div>
			<div className="main-container">
				{!showResults ? (
					<>
						<motion.div className="greet">
							<p>
								<span>Hello, Shadmaan </span>
							</p>
							<p>How Can I Assist you today?</p>
						</motion.div>
						<div className="cards">
							{[
								"Suggest Some Place To Visit In Kerala",
								"Brainstorm team bonding activities for our work retreat",
								"How to Create a Gyroscope using Disc?",
								"Create a Script for the youtube video about coding",
							].map((text, index) => (
								<motion.div
									className="card"
									key={index}
									onClick={() => handleCardClick(text)}
									variants={cardVariants}
									whileHover="hover"
								>
									<p>{text}</p>
									<img
										src={
											index === 0
												? assets.compass_icon
												: index === 1
												? assets.message_icon
												: index === 2
												? assets.bulb_icon
												: assets.code_icon
										}
										alt=""
									/>
								</motion.div>
							))}
						</div>
					</>
				) : (
					<div className="result">
						<div className="result-title">
							<img src={assets.portfolio3} alt="" className="circular-image" />
							<p>{recentPrompt}</p>
						</div>
						<div className="result-data">
							<img src={assets.gemini_icon} alt="" />
							{loading ? (
								<div className="loader">
									<hr />
									<hr />
									<hr />
								</div>
							) : (
								<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
							)}
						</div>
					</div>
				)}
				<div className="main-bottom">
				<div className="search-box">
    <input
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // Trigger send function on Enter key press
        value={input}
        type="text"
        placeholder="Enter the Prompt Here"
    />
    <div className="button-group">
        <img
            src={assets.gallery_icon}
            alt=""
            style={{ cursor: 'pointer', marginRight: '10px' }} // Add margin-right for gap
        />
        <img
            src={assets.mic_icon}
            alt=""
            onClick={startListening}
            style={{ cursor: 'pointer', marginRight: '10px' }} // Add margin-right for gap
        />
        <img
            src={assets.send_icon}
            alt=""
            onClick={onSent}
            style={{ cursor: 'pointer' }} // No margin on the last button
        />
    </div>
</div>
					<div className="bottom-info">
						<p>
							Gemini may display inaccurate info, including about people, so
							double-check its responses. Your privacy & Gemini Apps
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Main;
