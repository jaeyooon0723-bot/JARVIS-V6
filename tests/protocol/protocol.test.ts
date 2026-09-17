import { describe, it, expect } from 'vitest';
import { CloudToLocalProtocol, LocalToCloudProtocol } from '../../shared/protocols/protocol.js';

describe('Protocol Contracts Serialization', () => {
  it('should serialize and deserialize CloudToLocal protocol payloads correctly', () => {
    const cloudMsg: CloudToLocalProtocol = {
      type: 'EXECUTE_TOOL',
      requestId: 'req-001',
      args: { path: '/tmp/test.txt' },
      timestamp: Date.now(),
    };

    const json = JSON.stringify(cloudMsg);
    const parsed = JSON.parse(json) as CloudToLocalProtocol;

    expect(parsed.type).toBe('EXECUTE_TOOL');
    expect(parsed.requestId).toBe('req-001');
    expect(parsed.args?.path).toBe('/tmp/test.txt');
  });

  it('should format LocalToCloud execution results properly', () => {
    const localMsg: LocalToCloudProtocol = {
      type: 'EXECUTION_RESULT',
      requestId: 'req-001',
      result: {
        executionId: 'exec-1',
        stepId: 'step-1',
        toolName: 'file_reader',
        status: 'SUCCESS',
        output: 'file content',
        durationMs: 42,
      },
      timestamp: Date.now(),
    };

    expect(localMsg.result?.status).toBe('SUCCESS');
    expect(localMsg.result?.output).toBe('file content');
  });
});
