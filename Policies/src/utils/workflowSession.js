// ─── Workflow session persistence ────────────────────────────────────────────
// The submission workflow (NewSubmission → Driver → Vehicle → Quote → Payment)
// passes data via React Router location.state.  A page refresh wipes that state.
// These helpers mirror the current state to sessionStorage so the flow survives
// an accidental refresh.
//
// Usage in each workflow screen:
//
//   import { useWorkflowState, clearWorkflowState } from "../../utils/workflowSession";
//
//   const state = useWorkflowState();   // returns location.state OR restored copy
//
// At the end of the flow (PolicyIssuance), call clearWorkflowState() to clean up.

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const SESSION_KEY = "policy_workflow_state";

/** Persist state object to sessionStorage. */
export const saveWorkflowState = (state) => {
  if (!state) return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  } catch (_) {
    // sessionStorage unavailable or quota exceeded — fail silently
  }
};

/** Load the last persisted workflow state. Returns null if nothing saved. */
export const loadWorkflowState = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
};

/** Remove the saved state (call at end of workflow). */
export const clearWorkflowState = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (_) {}
};

/**
 * Hook: returns location.state if present, otherwise falls back to the
 * last sessionStorage snapshot.  Also saves fresh state on every render
 * so downstream screens always have an up-to-date copy.
 */
export const useWorkflowState = () => {
  const { state: locationState } = useLocation();

  // Merge: prefer live location.state; fall back to stored snapshot
  const state = locationState || loadWorkflowState();

  // Keep the snapshot current whenever we have live data
  useEffect(() => {
    if (locationState) {
      saveWorkflowState(locationState);
    }
  }, [locationState]);

  return state;
};
