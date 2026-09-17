import { Goal, UserContext, Plan, ToolSpec, ExecutionResult, Observation, VerificationResult, FailureAnalysis } from '../../shared/types/agent.js';

export interface GoalInferenceEngine {
  inferGoal(rawInput: string, context: UserContext): Promise<Goal>;
}

export interface DynamicPlanner {
  generatePlan(goal: Goal): Promise<Plan>;
}

export interface CapabilityAnalyzer {
  determineCapabilities(goal: Goal, plan: Plan): Promise<string[]>;
}

export interface ToolSelector {
  selectTool(capability: string, availableTools: ToolSpec[]): Promise<ToolSpec | null>;
}

export interface ResultVerifier {
  verify(goal: Goal, executionResult: ExecutionResult, observation: Observation): Promise<VerificationResult>;
}

export interface ReplannerEngine {
  analyzeFailure(goal: Goal, result: ExecutionResult, observation: Observation): Promise<FailureAnalysis>;
  replan(goal: Goal, analysis: FailureAnalysis): Promise<Plan>;
}
