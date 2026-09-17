export type AgentLifecycleState =
  | 'IDLE'
  | 'LISTENING'
  | 'THINKING'
  | 'PLANNING'
  | 'TOOL_DISCOVERY'
  | 'TOOL_CREATION'
  | 'EXECUTING'
  | 'OBSERVING'
  | 'VERIFYING'
  | 'REPLANNING'
  | 'COMPLETED'
  | 'ERROR';

export interface UserContext {
  userId?: string;
  sessionContext?: Record<string, unknown>;
  recentConversations?: string[];
  systemState?: Record<string, unknown>;
  uiState?: Record<string, unknown>;
  availableCapabilities?: string[];
  memoryHits?: unknown[];
}

export interface Goal {
  id: string;
  rawInput: string;
  inferredIntent: string;
  desiredEndState: string;
  context: UserContext;
  subGoals?: Goal[];
  createdAt: number;
}

export interface PlanStep {
  stepId: string;
  description: string;
  requiredCapability: string;
  suggestedToolName?: string;
  args?: Record<string, unknown>;
}

export interface Plan {
  planId: string;
  goalId: string;
  steps: PlanStep[];
  reasoning: string;
  createdAt: number;
}

export interface ToolSpec {
  name: string;
  description: string;
  requiredCapabilities: string[];
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  sourceCode?: string;
  provenance: 'PREBUILT' | 'DYNAMICALLY_GENERATED';
}

export interface ExecutionResult {
  executionId: string;
  stepId: string;
  toolName: string;
  status: 'SUCCESS' | 'FAILED' | 'TIMEOUT' | 'POLICY_DENIED';
  output?: unknown;
  error?: string;
  durationMs: number;
}

export interface Observation {
  observationId: string;
  executionId: string;
  actualResult: unknown;
  environmentDiff?: Record<string, unknown>;
  observedAt: number;
}

export interface VerificationResult {
  verificationId: string;
  goalId: string;
  isGoalAchieved: boolean;
  confidenceScore: number;
  reasoning: string;
  unmetCriteria?: string[];
}

export interface FailureAnalysis {
  failureId: string;
  executionId: string;
  rootCause: string;
  failureCategory: 'TOOL_ERROR' | 'ENVIRONMENT_MISMATCH' | 'INCORRECT_PLAN' | 'POLICY_VIOLATION' | 'TIMEOUT';
  suggestedAction: 'RETRY' | 'REPLAN' | 'GENERATE_NEW_TOOL' | 'REQUEST_USER_INPUT';
}
