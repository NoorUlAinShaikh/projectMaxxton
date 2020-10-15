import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import IssuesSearch from "../IssuesSearch/IssuesSearch";
import { fetchIssues, fetchIssuesClosedCount } from "../../actions";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import "./Header.css";

const Header = () => {
	const dispatch = useDispatch();
	const { owner, repo } = useSelector(({ owner_repo: { owner, repo } }) => ({
		owner,
		repo
	}));

	useEffect(() => {
		if (owner && repo) {
			dispatch(fetchIssues());
			dispatch(fetchIssuesClosedCount());
		}
	}, [owner, repo]);

	return (
		<header className="header">
			<div className="sub-header">
				<Logo />
			</div>
			<div className="issue-search">
				<IssuesSearch />
			</div>
		</header>
	);
};

export default Header;
