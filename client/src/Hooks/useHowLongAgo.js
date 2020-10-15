import { useState } from "react";
import moment from "moment";

export const useHowLongAgo = () => {
	const [howLongAgo, setHowLongAgo] = useState({});

	const processIssue_Date = issue_rawDate => {
		if (issue_rawDate) {
			const issue_formattedDate = Object.entries(issue_rawDate).reduce(
				(issue_date, [key, date]) => ({
					...issue_date,
					[key]: date ? formatDate(date) : date
				}),
				{}
			);
			setHowLongAgo(issue_formattedDate);
		}
	};

	const formatDate = date => {
		const createdAt = new Date(date);
		const createdDaysAgo = Math.round((Date.now() - createdAt) / (1000 * 60 * 60 * 24));
		if (createdDaysAgo > 30) {
			return `on ${moment(createdAt).format(
				createdAt.getFullYear === new Date().getFullYear ? "MMM DD" : "MMM DD YY"
			)}`;
		} else {
			return `${createdDaysAgo} ${createdDaysAgo > 1 ? "days" : "day"} ago`;
		}
	};

	return [howLongAgo, processIssue_Date];
};
