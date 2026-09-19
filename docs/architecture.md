# JARVIS-V6 Architecture & System Specification

## 1. Goal-First Paradigm vs Fixed Commands

JARVIS-V6 is explicitly engineered as an autonomous goal-driven agent system. Unlike legacy keyword/command-based assistants, JARVIS-V6 operates on a **Goal-First Architecture**:

```
[User Natural Language Input]
            │
            ▼
[Context Collection & Memory Retrieval]
            │
            ▼
[Situation Understanding & Goal Inference]
            │
            ▼
[Dynamic Plan Generation]
            │
            ▼
[Required Capability Analysis]
            │
            ▼
[Tool Selection / Dynamic Tool Creation]
            │
            ▼
[Safety & Policy Inspection (Sandbox Boundary)]
            │
            ▼
[Execution on Local Runtime]
            │
            ▼
[Observation of Real Results]
            │
            ▼
[Goal Achievement Verification]
        /        \
   (PASSED)    (FAILED)
      │            │
      ▼            ▼
 [Completed] [Failure Root Cause Analysis]
                   │
                   ▼
            [Replanning & Retry]
```

## 2. Cloud Brain ↔ PC Local Runtime Split

- **Cloud Brain**:
  - Natural Language Reasoning & Intent Disambiguation
  - Goal Inference & Dynamic Decomposition
  - Planning Engine & Tool Registry Manager
  - Dynamic Tool Code Specification & Static Inspection
  - Result Verification Engine & Failure Analysis / Replanning
  - Persistent & Epistemic Memory

- **PC Local Runtime (Execution & Sensing)**:
  - Filesystem inspection & file operations
  - Process management & command execution
  - Browser Automation & Screen Observation
  - Clipboard state & System telemetry
  - Local Sandbox Runner with isolated security policies

## 3. Dynamic Tooling Architecture

When a required capability is absent from the existing Tool Registry:
1. Cloud Brain analyzes the required input/output schema and capability contract.
2. Generates a tool specification and executable code implementation.
3. Code undergoes static security checks and AST validation.
4. Tool is tested inside a restricted local sandbox environment.
5. Upon successful verification, the tool is dynamically registered for immediate execution.
