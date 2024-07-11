import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Context } from "../../context/Context";

const Sidebar = () => {
	const [extended, setExtended] = useState(false);
	const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

	const loadPreviousPrompt = async (prompt) => {
		setRecentPrompt(prompt);
		await onSent(prompt);
	};

	const sidebarVariants = {
		open: {
			width: "250px",
			transition: {
				type: "spring",
				stiffness: 20,
				damping: 10,
			},
		},
		closed: {
			width: "50px",
			transition: {
				type: "spring",
				stiffness: 20,
				damping: 10,
			},
		},
	};

	return (
		<motion.div
			className="sidebar"
			initial={false}
			animate={extended ? "open" : "closed"}
			variants={sidebarVariants}
		>
			<div className="top">
				<img
					src={assets.menu_icon}
					className="menu"
					alt="menu-icon"
					onClick={() => {
						setExtended((prev) => !prev);
					}}
				/>
				<div className="new-chat">
					<motion.img
						src={assets.plus_icon}
						alt=""
						onClick={() => {
							newChat();
						}}
						whileHover={{ scale: 1.1 }}
					/>
					{extended ? <p>New Chat</p> : null}
				</div>
				{extended ? (
					<div className="recent">
						<p className="recent-title">Recent</p>
						{prevPrompts.map((item, index) => (
							<div
								key={index}
								onClick={() => {
									loadPreviousPrompt(item);
								}}
								className="recent-entry"
							>
								<img src={assets.message_icon} alt="" />
								<p>{item.slice(0, 18)}...</p>
							</div>
						))}
					</div>
				) : null}
			</div>
			<div className="bottom">
				<div className="bottom-item recent-entry">
					<img src={assets.question_icon} alt="" />
					{extended ? <p>Help</p> : null}
				</div>
				<div className="bottom-item recent-entry">
					<img src={assets.history_icon} alt="" />
					{extended ? <p>Activity</p> : null}
				</div>
				<div className="bottom-item recent-entry">
					<img src={assets.setting_icon} alt="" />
					{extended ? <p>Settings</p> : null}
				</div>
			</div>
		</motion.div>
	);
};

export default Sidebar;
