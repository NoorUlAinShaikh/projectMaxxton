import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { setOwner_Repo } from "../../actions";
import "./IssuesSearch.css";

const IssuesSearch = () => {
	const dispatch = useDispatch();
	const [owner, setOwner] = useState("");
	const [repo, setRepo] = useState("");
	const [tfError, setTFError] = useState(false);

	const onFetchIssues = () => {
		if (owner && repo) {
			if (tfError) setTFError(false);
			dispatch(setOwner_Repo(owner.trim(), repo.trim()));
		} else {
			setTFError(true);
		}
	};

	return (
		<div className="IssuesSearch">
			<TextField
				required
				error={!owner && tfError ? true : false}
				className="owner-field"
				value={owner}
				onChange={e => setOwner(e.target.value)}
				label="Owner Name"
			/>
			<TextField
				className="repo-field"
				error={!repo && tfError ? true : false}
				required
				value={repo}
				onChange={e => setRepo(e.target.value)}
				label="Repository Name"
			/>
			<button className="fetch-issues-button" onClick={onFetchIssues}>
				Fetch Issues
			</button>
		</div>
	);
};

export default IssuesSearch;
