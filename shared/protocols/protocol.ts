import { Goal, Plan, ToolSpec, ExecutionResult, Observation, VerificationResult } from '../types/agent.js';

export interface CloudToLocalProtocol {
  type: 'EXECUTE_TOOL' | 'INSPECT_SYSTEM' | 'CANCEL_TASK';
  requestId: string;
  toolSpec?: ToolSpec;
  args?: Record<string, unknown>;
  timestamp: number;
}

export interface LocalToCloudProtocol {
  type: 'EXECUTION_RESULT' | 'OBSERVATION_DATA' | 'SYSTEM_STATE_UPDATE';
  requestId: string;
  result?: ExecutionResult;
  observation?: Observation;
  systemState?: Record<string, unknown>;
  timestamp: number;
}

export interface AgentResponseProtocol {
  goalId: string;
  understoodGoal: string;
  plan?: Plan;
  status: 'SUCCESS' | 'FAILURE' | 'IN_PROGRESS' | 'NEED_USER_INPUT';
  finalAnswer?: string;
  verification?: VerificationResult;
}
