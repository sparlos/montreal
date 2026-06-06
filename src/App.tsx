import { useState, useEffect } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	type Variants,
} from "framer-motion";
import "./App.css";

// ── Variants ──────────────────────────────────────────────────────

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 26 },
	},
};

const stagger: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.07 } },
};

const popIn: Variants = {
	hidden: { opacity: 0, scale: 0.4, rotate: -8 },
	visible: {
		opacity: 1,
		scale: 1,
		rotate: 0,
		transition: { type: "spring", stiffness: 400, damping: 16 },
	},
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 36 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 320, damping: 28 },
	},
};

// ── Scroll Progress ───────────────────────────────────────────────

function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });
	return (
		<motion.div
			className="scroll-progress"
			style={{ scaleX, transformOrigin: "left" }}
		/>
	);
}

// ── Types ─────────────────────────────────────────────────────────

interface Activity {
	emoji: string;
	title: string;
	description: string;
	walk?: string;
	link?: string;
	note?: string;
	tag?: string;
}

interface TimeBlock {
	time: string;
	activities: Activity[];
}

interface DayData {
	number: number;
	color: string;
	textColor: string;
	theme: string;
	icon: string;
	sections: TimeBlock[];
}

// ── Data ──────────────────────────────────────────────────────────

const DAYS: DayData[] = [
	{
		number: 1,
		color: "#BFDBFE",
		textColor: "#1D4ED8",
		theme: "Arrival",
		icon: "🚆",
		sections: [
			{
				time: "Getting There",
				activities: [
					{
						emoji: "🚕",
						title: "Gare Centrale → Hyatt Centric",
						description:
							"Uber from the train station (~3 min, <$15 CAD). Right downtown — no luggage wrestling required.",
					},
				],
			},
			{
				time: "Afternoon",
				activities: [
					{
						emoji: "🏨",
						title: "Check In — Hyatt Centric",
						description:
							"621 Rue Notre-Dame Est, Old Montréal. Your base for the whole trip.",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJcdW2wVQayUwRh0405vZfjNo&query=Montreal",
					},
					{
						emoji: "🌊",
						title: "Old Port Waterfront Walk",
						description:
							"Stroll the Promenade du Vieux-Port along the St. Lawrence. Shake off the train ride.",
						walk: "~8 min south from hotel",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJTw1XwFcayUwRrEyntXolb9E&query=Montreal",
					},
					{
						emoji: "☕",
						title: "Le Petit Dep",
						description:
							"Tiny Québécois épicerie-café. Great espresso, pastries, local snacks. Perfect first stop.",
						walk: "~9 min west on Rue Saint-Paul",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJM0mfNFgayUwRp2hUS-6QUA0&query=Montreal",
					},
				],
			},
			{
				time: "Evening",
				activities: [
					{
						emoji: "🍝",
						title: "Dinner: Salumi Vino",
						description:
							"Intimate Italian charcuterie spot with housemade pasta and a tight wine list — easily the most polished dinner of the trip.",
						walk: "~6 min north from hotel",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJv-f3Q1QayUwRE26nKFmRem8&query=Montreal",
						note: "⚠️ Closed Mon & Tue — check your arrival day and book ahead!",
					},
					{
						emoji: "🌙",
						title: "Night Walk: Place Jacques-Cartier",
						description:
							"Terrasse restaurants, street performers, old gas lamps. The heart of Old Montréal at night.",
						walk: "~5 min south from Salumi Vino",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJY6aLhVYayUwR92cn3qLBE_Y&query=Montreal",
					},
				],
			},
		],
	},
	{
		number: 2,
		color: "#BBF7D0",
		textColor: "#15803D",
		theme: "Classic Old Montréal Day",
		icon: "🧱",
		sections: [
			{
				time: "Morning",
				activities: [
					{
						emoji: "🥐",
						title: "Chez Mère-Grand",
						description:
							"Outstanding croissants, house-baked pastries, great coffee. Locals’ pick, not a tourist trap.",
						walk: "~3 min from hotel",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJtWYX-sQbyUwRetZa6msbmDM&query=Montreal",
					},
					{
						emoji: "🧱",
						title: "Walk Old Montréal & Rue Saint-Paul",
						description:
							"The main cobblestone artery — galleries, boutiques, cafés. Best people-watching in the neighbourhood.",
						walk: "~5 min from hotel",
					},
				],
			},
			{
				time: "Midday",
				activities: [
					{
						emoji: "🍕",
						title: "Slice + Soda",
						description:
							"Massive NY-style pizza slices, dead simple, very good. Cash-friendly, no fuss.",
						walk: "~9 min west on Rue Saint-Paul",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJF66ZZnYbyUwRdM9lHW2CHX0&query=Montreal",
					},
					{
						emoji: "🍳",
						title: "Or: Olive et Gourmando",
						description:
							"Beloved brunch institution. Ricotta toast or banoffee French toast. Line moves fast.",
						walk: "~10 min west on Rue Saint-Paul",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJY1hhAlkayUwRKhS-sLnn1Ys&query=Montreal",
					},
				],
			},
			{
				time: "Afternoon",
				activities: [
					{
						emoji: "⛪",
						title: "Notre-Dame Basilica",
						description:
							"Buy tickets online! The AURA light show is worth it if running. Genuinely jaw-dropping interior.",
						walk: "~2 min from Olive et Gourmando",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJPXGXWFcayUwRqpYNHZ_v_B8&query=Montreal",
					},
					{
						emoji: "🏛️",
						title: "Bonsecours Market",
						description:
							"Iconic silver-domed landmark. Local artisan shops. Worth a wander.",
						walk: "~8 min east on Rue Saint-Paul",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJH1lQy1UayUwRaUKBtKz7mOg&query=Montreal",
					},
				],
			},
			{
				time: "Evening",
				activities: [
					{
						emoji: "🍟",
						title: "Montréal Poutine",
						description:
							"Smoked meat poutine is the move. Courtyard seating, solid gravy, big portions.",
						walk: "~5 min from hotel",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJk1e6X1YayUwRDSRqCFzIyqI&query=Montreal",
					},
					{
						emoji: "🫦",
						title: "Level Up: Restaurant L’Orignal",
						description:
							"Upscale Québécois chalet vibe — braised bison, truffle poutine, locally sourced everything.",
						walk: "~9 min west",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJx6CXkFkayUwR51RgtGrDMpo&query=Montreal",
					},
				],
			},
		],
	},
	{
		number: 3,
		color: "#FEF08A",
		textColor: "#A16207",
		theme: "Hotel Pool + Slow Day",
		icon: "🏊",
		sections: [
			{
				time: "Morning",
				activities: [
					{
						emoji: "😴",
						title: "Sleep In",
						description: "No alarm. You’ve earned it.",
					},
					{
						emoji: "☕",
						title: "Light Breakfast: Le Petit Dep",
						description: "Coffee and a pastry to ease into the day.",
						walk: "~9 min walk",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJM0mfNFgayUwRp2hUS-6QUA0&query=Montreal",
					},
				],
			},
			{
				time: "All Afternoon",
				activities: [
					{
						emoji: "🏊",
						title: "Rooftop Pool — Hyatt Centric",
						description:
							"River views on one side, city on the other. No schedule, no plans. This is the whole thing.",
						tag: "POOL DAY 🥜",
					},
				],
			},
			{
				time: "Evening",
				activities: [
					{
						emoji: "🍕",
						title: "Low-key: Slice + Soda",
						description: "Pizza and a cold beer. Done.",
						walk: "~9 min",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJF66ZZnYbyUwRdM9lHW2CHX0&query=Montreal",
					},
					{
						emoji: "🎷",
						title: "Fun: Jardin Nelson",
						description:
							"Garden courtyard with live jazz every evening after 6pm. Arrive by 5pm to snag a table.",
						walk: "~5 min south to Place Jacques-Cartier",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJpVn8h1YayUwR7qA4GYdAphM&query=Montreal",
					},
				],
			},
		],
	},
	{
		number: 4,
		color: "#FECACA",
		textColor: "#DC2626",
		theme: "Mount Royal + Final Full Day",
		icon: "🏔️",
		sections: [
			{
				time: "Morning",
				activities: [
					{
						emoji: "☕",
						title: "Breakfast: Café de Mercanti",
						description: "Excellent espresso, fresh croissants and sandwiches.",
						walk: "~2 min from hotel",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJHba5RlQayUwR8mZHG6sxGRM&query=Montreal",
					},
				],
			},
			{
				time: "Midday",
				activities: [
					{
						emoji: "🚕",
						title: "Uber to the Summit",
						description: "Hotel → Kondiaronk Belvedere (~10 min, ~$15 CAD).",
					},
					{
						emoji: "🏔️",
						title: "Kondiaronk Belvedere — Mount Royal",
						description:
							"Panoramic view over all of downtown Montréal. Best views in the city, free, open all day.",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJ__-_hzsayUwRRU2SDjpeLy0&query=Montreal",
					},
					{
						emoji: "🚕",
						title: "Back to Hotel",
						description:
							"Uber back (~10–12 min, ~$15 CAD). Or walk down if you’re feeling it.",
					},
				],
			},
			{
				time: "Afternoon",
				activities: [
					{
						emoji: "🛋️",
						title: "Rest & Recharge",
						description:
							"Hotel rest or café break. Recharge before the final night.",
					},
				],
			},
			{
				time: "Final Evening 🎉",
				activities: [
					{
						emoji: "🍗",
						title: "Au Pied de Cochon",
						description:
							"Martin Picard’s legendary Québécois excess — foie gras poutine, duck in a can, smoked meat. Loud, fun, unforgettable.",
						walk: "~10 min Uber to Plateau-Mont-Royal",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJD3Xvs84byUwR3Fs17jyjkjA&query=Montreal",
						note: "⚠️ Closed Mon & Tue. Book well in advance!",
					},
					{
						emoji: "🥩",
						title: "Schwartz’s Deli",
						description:
							"The most famous smoked meat in Canada, since 1928. Medium fat, cherry Coke, expect a line.",
						walk: "~10 min Uber to The Main",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJEWsAWDMayUwRQPiLFOWhYdk&query=Montreal",
					},
					{
						emoji: "🫦",
						title: "Restaurant L’Orignal",
						description:
							"If you skipped Day 2 — chalet-style Québécois, great wine list, local ingredients.",
						walk: "~9 min walk",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJx6CXkFkayUwR51RgtGrDMpo&query=Montreal",
					},
					{
						emoji: "🌊",
						title: "Last Walk: Old Port at Night",
						description: "One final stroll along the water. Soak it all in.",
						walk: "~8 min from hotel",
					},
				],
			},
		],
	},
	{
		number: 5,
		color: "#E9D5FF",
		textColor: "#7E22CE",
		theme: "Departure Day",
		icon: "👋",
		sections: [
			{
				time: "Morning",
				activities: [
					{
						emoji: "☕",
						title: "Quick Breakfast: Le Petit Dep",
						description: "Coffee and a pastry for the road.",
						walk: "~9 min",
						link: "https://www.google.com/maps/search/?api=1&query_place_id=ChIJM0mfNFgayUwRp2hUS-6QUA0&query=Montreal",
					},
					{
						emoji: "🧱",
						title: "Final Walk: Rue Saint-Paul",
						description: "One last stroll down the cobblestones. Take it slow.",
					},
					{
						emoji: "🚕",
						title: "Check Out → Gare Centrale",
						description:
							"Call an Uber (~5 min, <$15 CAD). À bientôt, Montréal!",
					},
				],
			},
		],
	},
];

// ── Activity Card ─────────────────────────────────────────────────

function ActivityCard({
	activity,
	dayColor,
	dayTextColor,
}: {
	activity: Activity;
	index?: number;
	dayColor: string;
	dayTextColor: string;
}) {
	return (
		<motion.div
			className="activity-card"
			variants={cardVariants}
			whileHover={{ y: -5, scale: 1.01 }}
			whileTap={{ scale: 0.97 }}
			style={
				{
					"--day-color": dayColor,
					"--day-text": dayTextColor,
				} as React.CSSProperties
			}
		>
			<div className="activity-emoji-wrap">
				<span className="activity-emoji">{activity.emoji}</span>
			</div>
			<div className="activity-body">
				{activity.tag && (
					<span
						className="activity-tag"
						style={{ background: dayColor, color: dayTextColor }}
					>
						{activity.tag}
					</span>
				)}
				<h4 className="activity-title">
					{activity.link ? (
						<a href={activity.link} target="_blank" rel="noopener noreferrer">
							{activity.title} <span className="ext-link">↗</span>
						</a>
					) : (
						activity.title
					)}
				</h4>
				<p className="activity-desc">{activity.description}</p>
				{activity.walk && (
					<span className="activity-pill walk-pill">🚶 {activity.walk}</span>
				)}
				{activity.note && (
					<span className="activity-pill note-pill">{activity.note}</span>
				)}
			</div>
		</motion.div>
	);
}

// ── Day Section ───────────────────────────────────────────────────

function DaySection({ day }: { day: DayData }) {
	return (
		<section className="day-section" id={`day-${day.number}`}>
			<motion.div
				className="day-header"
				style={{ background: day.color }}
				initial={{ opacity: 0, x: -40 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ type: "spring", stiffness: 260, damping: 28 }}
			>
				<span className="day-icon">{day.icon}</span>
				<div className="day-header-text">
					<span className="day-label" style={{ color: day.textColor }}>
						Day {day.number}
					</span>
					<h2 className="day-theme" style={{ color: day.textColor }}>
						{day.theme}
					</h2>
				</div>
				<motion.span
					className="day-number-big"
					style={{ color: day.textColor }}
					initial={{ opacity: 0, scale: 0.4 }}
					whileInView={{ opacity: 0.15, scale: 1 }}
					viewport={{ once: true }}
					transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
				>
					{day.number}
				</motion.span>
			</motion.div>

			<div className="day-blocks">
				{day.sections.map((block, bi) => (
					<div key={bi} className="time-block">
						<motion.div
							className="time-chip"
							style={{ background: day.color, color: day.textColor }}
							initial={{ opacity: 0, scale: 0.7 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{ type: "spring", stiffness: 350, damping: 24 }}
						>
							{block.time}
						</motion.div>

						<motion.div
							className="activities-list"
							variants={stagger}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-40px" }}
						>
							{block.activities.map((act, ai) => (
								<ActivityCard
									key={ai}
									activity={act}
									index={ai}
									dayColor={day.color}
									dayTextColor={day.textColor}
								/>
							))}
						</motion.div>
					</div>
				))}
			</div>
		</section>
	);
}

// ── Hero ──────────────────────────────────────────────────────────

const HERO_WORDS = [
	{ text: "GOOSE", cls: "hw-goose" },
	{ text: "&", cls: "hw-amp" },
	{ text: "MOOSE", cls: "hw-moose" },
];

function Hero() {
	const { scrollY } = useScroll();
	const bgY = useTransform(scrollY, [0, 600], [0, -140]);
	const contentY = useTransform(scrollY, [0, 600], [0, -55]);
	const opacity = useTransform(scrollY, [0, 380], [1, 0]);

	return (
		<header className="hero">
			<motion.div className="hero-bg" style={{ y: bgY }} aria-hidden="true">
				<div className="hero-blob hb1" />
				<div className="hero-blob hb2" />
				<div className="hero-dots" />
				{[
					{ e: "🇨🇦", c: "deco d1" },
					{ e: "⚜️", c: "deco d2" },
					{ e: "🍁", c: "deco d3" },
					{ e: "❄️", c: "deco d4" },
					{ e: "🍺", c: "deco d5" },
					{ e: "🏔️", c: "deco d6" },
				].map(({ e, c }) => (
					<span key={c} className={c} aria-hidden="true">
						{e}
					</span>
				))}
			</motion.div>

			<motion.div className="hero-content" style={{ y: contentY, opacity }}>
				<motion.p
					className="hero-eyebrow"
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.15, duration: 0.5 }}
				>
					🇨🇦 5 days · Old Montréal · 2026
				</motion.p>

				<div className="hero-title">
					{HERO_WORDS.map((w, wi) => (
						<motion.div
							key={wi}
							className={`hero-word-line ${w.cls}`}
							variants={stagger}
							initial="hidden"
							animate="visible"
						>
							{w.text.split("").map((ch, ci) => (
								<motion.span
									key={ci}
									className="hero-char"
									variants={{
										hidden: { opacity: 0, y: 70 },
										visible: {
											opacity: 1,
											y: 0,
											transition: {
												type: "spring",
												stiffness: 260,
												damping: 20,
												delay: wi * 0.12 + ci * 0.045,
											},
										},
									}}
								>
									{ch}
								</motion.span>
							))}
						</motion.div>
					))}
				</div>

				<motion.p
					className="hero-sub"
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.85, type: "spring", stiffness: 200 }}
				>
					do Montréal
				</motion.p>

				<motion.div
					className="hero-mascots"
					variants={stagger}
					initial="hidden"
					animate="visible"
				>
					{[
						{ e: "🦢", label: "Goose", rot: -8 },
						{ e: "🫎", label: "Moose", rot: 8 },
					].map(({ e, label, rot }) => (
						<motion.div
							key={label}
							className="mascot-wrap"
							variants={popIn}
							whileHover={{ scale: 1.25, rotate: rot, y: -8 }}
							whileTap={{ scale: 0.9 }}
						>
							<span className="mascot" role="img" aria-label={label}>
								{e}
							</span>
							<span className="mascot-name">{label}</span>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					className="hero-hotel"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.2 }}
				>
					🏨 Hyatt Centric · 621 Rue Notre-Dame Est
				</motion.div>

				<motion.a
					href="#day-1"
					className="hero-cta"
					initial={{ opacity: 0, scale: 0.7 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						delay: 1.4,
						type: "spring",
						stiffness: 350,
						damping: 18,
					}}
					whileHover={{ scale: 1.07, y: -4 }}
					whileTap={{ scale: 0.94 }}
				>
					See the plan! ↓
				</motion.a>
			</motion.div>

			<motion.div
				className="hero-scroll-hint"
				animate={{ y: [0, 9, 0] }}
				transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
				aria-hidden="true"
			>
				↓
			</motion.div>
		</header>
	);
}

// ── Intro Section ─────────────────────────────────────────────────

function IntroSection() {
	return (
		<section className="intro-section">
			<motion.div
				className="intro-card"
				initial={{ opacity: 0, y: 50, rotate: -1 }}
				whileInView={{ opacity: 1, y: 0, rotate: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ type: "spring", stiffness: 240, damping: 26 }}
			>
				<div className="intro-duo" aria-hidden="true">
					<motion.span
						animate={{ rotate: [-5, 5, -5] }}
						transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
					>
						🦢
					</motion.span>
					<span className="intro-plus">+</span>
					<motion.span
						animate={{ rotate: [5, -5, 5] }}
						transition={{
							repeat: Infinity,
							duration: 3,
							ease: "easeInOut",
							delay: 1.5,
						}}
					>
						🫎
					</motion.span>
				</div>

				<h2 className="intro-heading">The Adventure Begins! 🎊</h2>
				<p className="intro-text">
					A relaxed, walkable, Old Montréal–focused adventure for{" "}
					<strong>Goose & Moose</strong>. Classic Québécois food, one pool day,
					and a walk around Mount Royal. All walks ≤10 min unless noted.
				</p>

				<motion.div
					className="intro-stats"
					variants={stagger}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{[
						{ n: "5", label: "Days", bg: "#BFDBFE" },
						{ n: "2", label: "Travellers", bg: "#BBF7D0" },
						{ n: "1", label: "Pool Day", bg: "#FEF08A" },
						{ n: "∞", label: "Poutine", bg: "#FECACA" },
					].map(({ n, label, bg }) => (
						<motion.div
							key={label}
							className="stat"
							style={{ background: bg }}
							variants={fadeUp}
							whileHover={{ y: -6, scale: 1.05 }}
						>
							<span className="stat-n">{n}</span>
							<span className="stat-label">{label}</span>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}

// ── Summary Section ───────────────────────────────────────────────

const SUMMARY = [
	{
		day: "Day 1",
		theme: "Arrival",
		dinner: "Salumi Vino",
		color: "#BFDBFE",
		text: "#1D4ED8",
		num: 1,
	},
	{
		day: "Day 2",
		theme: "Classic Old Montréal",
		dinner: "Poutine or L’Orignal",
		color: "#BBF7D0",
		text: "#15803D",
		num: 2,
	},
	{
		day: "Day 3",
		theme: "Full pool / reset day",
		dinner: "Jardin Nelson or Slice + Soda",
		color: "#FEF08A",
		text: "#A16207",
		num: 3,
	},
	{
		day: "Day 4",
		theme: "Mount Royal + final night",
		dinner: "Au Pied de Cochon / Schwartz’s",
		color: "#FECACA",
		text: "#DC2626",
		num: 4,
	},
	{
		day: "Day 5",
		theme: "Easy departure",
		dinner: "Le Petit Dep & go!",
		color: "#E9D5FF",
		text: "#7E22CE",
		num: 5,
	},
];

function SummarySection() {
	return (
		<section className="summary-section">
			<motion.h2
				className="summary-heading"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ type: "spring", stiffness: 280, damping: 26 }}
			>
				Trip at a Glance 🗺️
			</motion.h2>

			<motion.div
				className="summary-list"
				variants={stagger}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-40px" }}
			>
				{SUMMARY.map((row) => (
					<motion.a
						key={row.num}
						href={`#day-${row.num}`}
						className="summary-card"
						style={
							{
								"--s-bg": row.color,
								"--s-text": row.text,
							} as React.CSSProperties
						}
						variants={fadeUp}
						whileHover={{ x: 6, scale: 1.02 }}
						whileTap={{ scale: 0.97 }}
					>
						<span className="sc-day" style={{ color: row.text }}>
							{row.day}
						</span>
						<div className="sc-body">
							<span className="sc-theme">{row.theme}</span>
							<span className="sc-dinner">🍴 {row.dinner}</span>
						</div>
						<span className="sc-arrow" style={{ color: row.text }}>
							→
						</span>
					</motion.a>
				))}
			</motion.div>
		</section>
	);
}

// ── App ───────────────────────────────────────────────────────────

export default function App() {
	const [activeDay, setActiveDay] = useState<number | null>(null);

	useEffect(() => {
		const observers: IntersectionObserver[] = [];
		DAYS.forEach((day) => {
			const el = document.getElementById(`day-${day.number}`);
			if (!el) return;
			const obs = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) setActiveDay(day.number);
				},
				{ threshold: 0.2 },
			);
			obs.observe(el);
			observers.push(obs);
		});
		return () => observers.forEach((o) => o.disconnect());
	}, []);

	return (
		<div className="site">
			<ScrollProgress />

			{/* Nav */}
			<nav className="site-nav">
				<a href="#top" className="nav-logo" aria-label="Top">
					🦢&nbsp;&nbsp;🫎
				</a>
				<div className="nav-days">
					{DAYS.map((d) => (
						<a
							key={d.number}
							href={`#day-${d.number}`}
							className={`nav-day-btn${activeDay === d.number ? " nav-day-btn--active" : ""}`}
							style={
								{
									"--nd-bg": d.color,
									"--nd-text": d.textColor,
								} as React.CSSProperties
							}
						>
							{d.number}
						</a>
					))}
				</div>
			</nav>

			<Hero />
			<IntroSection />

			<main className="days-wrapper">
				{DAYS.map((day) => (
					<DaySection key={day.number} day={day} />
				))}
			</main>

			<SummarySection />

			{/* Footer */}
			<footer className="site-footer">
				<motion.div
					className="footer-mascots"
					animate={{ y: [0, -8, 0] }}
					transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
					aria-hidden="true"
				>
					🦢❤️🫎
				</motion.div>
				<p className="footer-title">Goose & Moose · Montréal 2026</p>
				<p className="footer-sub">⚜️ Bon voyage! ⚜️</p>
			</footer>
		</div>
	);
}
