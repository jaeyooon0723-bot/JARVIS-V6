import { AgentLifecycleState, Goal, Plan, ExecutionResult, Observation, VerificationResult, FailureAnalysis } from '../types/agent.js';

export type SystemEventType =
  | 'USER_INPUT'
  | 'STATE_CHANGED'
  | 'GOAL_DETECTED'
  | 'PLANNING_STARTED'
  | 'PLAN_GENERATED'
  | 'CAPABILITY_ANALYZED'
  | 'TOOL_SELECTED'
  | 'TOOL_CREATED'
  | 'EXECUTION_STARTED'
  | 'EXECUTION_FINISHED'
  | 'OBSERVATION_RECEIVED'
  | 'VERIFICATION_STARTED'
  | 'VERIFICATION_PASSED'
  | 'VERIFICATION_FAILED'
  | 'FAILURE_ANALYZED'
  | 'REPLANNING'
  | 'TASK_COMPLETED'
  | 'TASK_FAILED'
  | 'ERROR'
  | 'VOICE_STARTED'
  | 'VOICE_ENDED';

export interface BaseEvent {
  id: string;
  type: SystemEventType;
  timestamp: number;
}

export interface UserInputEvent extends BaseEvent {
  type: 'USER_INPUT';
  text: string;
  source: 'chat' | 'voice' | 'system';
}

export interface StateChangedEvent extends BaseEvent {
  type: 'STATE_CHANGED';
  previousState: AgentLifecycleState;
  newState: AgentLifecycleState;
}

export interface GoalDetectedEvent extends BaseEvent {
  type: 'GOAL_DETECTED';
  goal: Goal;
}

export interface PlanGeneratedEvent extends BaseEvent {
  type: 'PLAN_GENERATED';
  plan: Plan;
}

export interface ToolSelectedEvent extends BaseEvent {
  type: 'TOOL_SELECTED';
  toolName: string;
  capability: string;
}

export interface ExecutionFinishedEvent extends BaseEvent {
  type: 'EXECUTION_FINISHED';
  result: ExecutionResult;
}

export interface ObservationReceivedEvent extends BaseEvent {
  type: 'OBSERVATION_RECEIVED';
  observation: Observation;
}

export interface VerificationResultEvent extends BaseEvent {
  type: 'VERIFICATION_PASSED' | 'VERIFICATION_FAILED';
  verification: VerificationResult;
}

export interface ReplanningEvent extends BaseEvent {
  type: 'REPLANNING';
  analysis: FailureAnalysis;
}

export type SystemEvent =
  | UserInputEvent
  | StateChangedEvent
  | GoalDetectedEvent
  | PlanGeneratedEvent
  | ToolSelectedEvent
  | ExecutionFinishedEvent
  | ObservationReceivedEvent
  | VerificationResultEvent
  | ReplanningEvent
  | BaseEvent;

export interface EventBus {
  publish(event: SystemEvent): void;
  subscribe(type: SystemEventType | '*', handler: (event: SystemEvent) => void): () => void;
}
