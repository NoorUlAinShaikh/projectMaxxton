import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIssues } from "../../actions";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import Issue from "../Issue/Issue";
import { useHowLongAgo } from "../../Hooks/useHowLongAgo";
import { ReactComponent as OpenIcon } from "../../assets/OpenIcon.svg";
import { ReactComponent as ClosedIcon } from "../../assets/ClosedIcon.svg";
import "./Issues.css";

const Issues = () => {
	const dispatch = useDispatch();

	const [issueState, setIssueState] = useState(() => "");
	const [isFetching, setIsFetching] = useState(false);
	const [howLongAgo, processHowLongAgo] = useHowLongAgo();

	const [
		{ issuesList, lastPage, openCount, closedCount },
		{ owner, repo }
	] = useSelector(({ issues, owner_repo }) => [issues, owner_repo]);

	useEffect(() => {
		if (issueState) dispatch(fetchIssues(null, issueState));
	}, [issueState]);

	useEffect(() => {
		if (issuesList && issuesList.length > 0) {
			setIsFetching(false);
			const issue_rawDate =
				issueState === "closed"
					? issuesList.reduce((issue_rawDate, issue) => {
							return { ...issue_rawDate, [issue.id]: issue.closed_at };
					  }, {})
					: issuesList.reduce((issue_rawDate, issue) => {
							return { ...issue_rawDate, [issue.id]: issue.created_at };
					  }, {});
			processHowLongAgo(issue_rawDate);
		}
	}, [issuesList]);

	//misuse of useEffect.. Apologies.. Courtesy of the deadline
	useEffect(() => {
		if (owner && repo) {
			setIsFetching(true);
		}
	}, [owner, repo]);

	const handleIssueStateUpdate = updatedIssueState => {
		if (issueState !== updatedIssueState) setIssueState(updatedIssueState);
	};

	const fetchSelectedPage = page => {
		window.scroll(0, 0);
		if (page) dispatch(fetchIssues(page, issueState ? issueState : "open"));
	};

	const renderIssuesList = () =>
		issuesList.map(issue => (
			<Issue
				key={issue.id}
				issue={issue}
				created_ClosedAt={howLongAgo[issue.id]}
				owner={owner}
				repo={repo}
			/>
		));

	const renderIssueListHeader = () => (
		<div className="issue-header-wrap">
			<div
				className={`open-issue-count${issueState !== "closed" ? " bold" : ""}`}
				onClick={() => handleIssueStateUpdate("open")}
			>
				<OpenIcon className="icon-header" />
				<span>{openCount} Open</span>
			</div>
			<div
				className={`closed-issue-count${issueState === "closed" ? " bold" : ""}`}
				onClick={() => handleIssueStateUpdate("closed")}
			>
				<ClosedIcon className="icon-header" />
				<span>{closedCount} closed</span>
			</div>
		</div>
	);

	return (
		<div className="Issues">
			{owner && repo ? (
				<>
					{issuesList && issuesList.length > 0 ? (
						<>
							<div style={{ fontSize: "x-large", color: "#0366d6" }}>
								<a
									style={{ marginRight: "0.5rem" }}
									href={`https://github.com/${owner}`}
									rel="noopener noreferrer"
								>
									{owner}
								</a>
								/
								<a
									style={{
										fontWeight: "600",
										textDecoration: "none"
									}}
									href={`https://github.com/${owner}/${repo}`}
									rel="noopener noreferrer"
								>
									{repo}
								</a>
							</div>
							<div className="issues-list">
								{renderIssueListHeader()}
								{renderIssuesList()}
							</div>
						</>
					) : isFetching ? (
						<div>Loading...</div>
					) : (
						<div>No Results Found!</div>
					)}
					{lastPage > 0 && (
						<div className="pagination">
							<PaginationComponent
								lastPage={lastPage}
								fetchSelectedPage={fetchSelectedPage}
							/>
						</div>
					)}
				</>
			) : (
				<div className="before-fetch-message">
					Enter Repository Owner name and the Repository to fetch issues.
				</div>
			)}
		</div>
	);
};

export default Issues;
