import github from "../api/github";
import { SET_OWNER_REPO, FETCH_ISSUES, FETCH_ISSUES_CLOSED_COUNT } from "./types";

export const setOwner_Repo = (owner = "", repo = "") => ({
	type: SET_OWNER_REPO,
	payload: { owner, repo }
});

export const fetchIssues = (page = null, issueState = "open") => async (dispatch, getState) => {
	try {
		const { owner = "", repo = "" } = getState().owner_repo;
		let lastPage;
		const openCount = "openCount",
			closedCount = "closedCount";
		if (owner && repo) {
			const response = await github.get(
				`search/issues?q=repo:${owner}/${repo}+type:issue+state:${issueState}${
					page ? `+page=${page}` : ""
				}`
			);
			let payload = {
				issues: response.data.items,
				issueState
			};
			if (!page) {
				const links = response.headers?.link;
				const lastLink = links
					? links
							.split(",")
							.filter(link => link.includes('rel="last"'))
							.join("")
					: "";
				const lastPageURL = lastLink
					? new URL(lastLink.substring(lastLink.indexOf("<") + 1, lastLink.search(">")))
					: "";
				lastPage = lastPageURL
					? parseInt(new URLSearchParams(lastPageURL.search).get("page"))
					: 0;

				payload = {
					...payload,
					lastPage,
					[issueState === "open" ? openCount : closedCount]: response.data.total_count
				};
			}
			dispatch({ type: FETCH_ISSUES, payload });
		}
	} catch (err) {
		console.log("Error from fetchIssues", err);
	}
};

export const fetchIssuesClosedCount = () => async (dispatch, getState) => {
	try {
		const { owner = "", repo = "" } = getState().owner_repo;
		if (owner && repo) {
			const response = await github.get(
				`search/issues?q=repo:${owner}/${repo}+type:issue+state:closed`
			);
			dispatch({
				type: FETCH_ISSUES_CLOSED_COUNT,
				payload: { closedCount: response.data.total_count }
			});
		}
	} catch (err) {
		console.log("error from fetchIssuesClosedCount:", err);
	}
};
