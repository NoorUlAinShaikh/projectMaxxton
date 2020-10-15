import { FETCH_ISSUES, FETCH_ISSUES_CLOSED_COUNT } from "../actions/types";

const INITIAL_STATE = { issuesList: [], lastPage: 0, openCount: 0, closedCount: 0 };

export default (state = INITIAL_STATE, action) => {
	const { issues, lastPage, openCount, closedCount, issueState } = action.payload || {};
	switch (action.type) {
		case FETCH_ISSUES:
			let updatedState = {
				issuesList: [...issues],
				...(lastPage && { lastPage })
			};
			updatedState =
				openCount || closedCount
					? {
							...updatedState,
							...(issueState === "open" ? { openCount } : { closedCount })
					  }
					: updatedState;
			return { ...state, ...updatedState };
		case FETCH_ISSUES_CLOSED_COUNT:
			return { ...state, closedCount };
		default:
			return state;
	}
};
