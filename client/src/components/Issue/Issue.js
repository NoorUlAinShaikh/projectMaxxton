import React from "react";
import { ReactComponent as OpenIcon } from "../../assets/OpenIcon.svg";
import { ReactComponent as IssueCommentsIcon } from "../../assets/IssueCommentsIcon.svg";
import "./Issue.css";

const Issue = ({ issue, created_ClosedAt = "Invalid Date" }) => {
	return (
		<div className="Issue-wrap">
			<OpenIcon className="open-issue-icon" />
			<div className="issue-grid">
				<div className="issue">
					<a
						className="issue-title"
						href={issue.html_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{issue.title}
					</a>
					<div className="issue-details">
						{issue.state === "open"
							? `#${issue.number} opened ${created_ClosedAt} by ${issue.user.login}`
							: `#${issue.number} by ${issue.user.login} was closed ${created_ClosedAt}`}
					</div>
				</div>
				<div className="issue-comments">
					<IssueCommentsIcon style={{ marginRight: "0.5rem" }} />
					{issue.comments || 0}
				</div>
			</div>
		</div>
	);
};

export default Issue;
