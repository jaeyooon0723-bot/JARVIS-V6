import { describe, it, expect } from 'vitest';
import { AgentLifecycleState, Goal, Plan } from '../../shared/types/agent.js';

describe('Agent Types and Invariants', () => {
  it('should construct a valid Goal object with context', () => {
    const goal: Goal = {
      id: 'goal-123',
      rawInput: '아까 작업 다시 해줘',
      inferredIntent: 'RESERVE_PREVIOUS_TASK',
      desiredEndState: 'Previous uncompleted task resumed and executed',
      context: {
        recentConversations: ['Fix build error in index.ts'],
      },
      createdAt: Date.now(),
    };

    expect(goal.id).toBe('goal-123');
    expect(goal.rawInput).toBe('아까 작업 다시 해줘');
    expect(goal.context.recentConversations).toHaveLength(1);
  });

  it('should support agent lifecycle states including OBSERVING and REPLANNING', () => {
    const validStates: AgentLifecycleState[] = [
      'IDLE',
      'LISTENING',
      'THINKING',
      'PLANNING',
      'TOOL_DISCOVERY',
      'TOOL_CREATION',
      'EXECUTING',
      'OBSERVING',
      'VERIFYING',
      'REPLANNING',
      'COMPLETED',
      'ERROR',
    ];

    expect(validStates).toContain('OBSERVING');
    expect(validStates).toContain('VERIFYING');
    expect(validStates).toContain('REPLANNING');
  });
});
