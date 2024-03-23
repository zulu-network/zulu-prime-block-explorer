import { types } from "zksync-web3";
import { BatchState } from "../entities/batch.entity";

// state flow:
// New -> Committed -> Proven -> Executed
// todo add OfflineVerified
export const getBatchState = (batch: types.BatchDetails): BatchState => {
  if (batch.executedAt) {
    return BatchState.Executed;
  }
  if (batch.provenAt) {
    return BatchState.Proven;
  }
  if (batch.committedAt) {
    return BatchState.Committed;
  }
  return BatchState.New;
};

export const getBatchWithOfflineVerificationState = (batch: types.BatchDetailsWithOffchainVerification): BatchState => {
  if (batch.executedAt) {
    return BatchState.Executed;
  }
  if (batch.provenAt) {
    return BatchState.Proven;
  }
  if (batch.verifierSubmitAt) {
    return BatchState.VerifiedOffline;
  }
  if (batch.committedAt) {
    return BatchState.Committed;
  }
  return BatchState.New;
};
