# JARVIS-V6 Goal Verification Checklist

## 1. Goal-First Invariant Verification
- [ ] No fixed keyword-to-function matching (`if input == 'open'`).
- [ ] Goal inference parses user raw input in conjunction with conversation history and system state.
- [ ] Dynamic planning adapts steps based on available capabilities rather than fixed workflows.

## 2. Verification & Observation Criteria
- [ ] File Creation: Verify existence, permissions, and non-empty size on filesystem.
- [ ] File Modification: Verify diff and required content structure.
- [ ] Process Execution: Verify process exit code 0, standard error output, and target state.
- [ ] Server / Port Startup: Verify HTTP status code 200 on endpoint.

## 3. Security Boundary Controls
- [ ] Code execution times out if exceeding max duration.
- [ ] Forbidden system calls (e.g. destructive formatting) trigger policy denial.
- [ ] Generated code must pass static AST check prior to sandbox execution.
